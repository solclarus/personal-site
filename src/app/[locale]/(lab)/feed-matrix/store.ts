"use client";

import { fetchRss, refreshFeed } from "@feed-matrix/action";
import { getAllArticles } from "@feed-matrix/lib";
import type { Feed } from "@feed-matrix/type";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// ストアの状態型定義
type FeedsState = {
	urls: string[];
	selectedUrl: string;
	isLoading: boolean;
	addFeed: (url: string) => void;
	removeFeed: (url: string) => void;
	selectFeed: (url: string) => void;
	setIsLoading: (isLoading: boolean) => void;
};

// 永続化するデータのスキーマ
const persistedStateSchema = z.object({
	urls: z.array(z.string().url()),
	selectedUrl: z.string(),
});

/**
 * フィードの状態を管理するストア
 */
export const useFeedStore = create<FeedsState>()(
	persist(
		(set) => ({
			urls: [],
			selectedUrl: "all",
			isLoading: false,

			addFeed: (url) => {
				try {
					// URL形式を検証
					const validUrl = z.string().url().parse(url);

					set((state) => {
						// 重複チェック
						if (state.urls.includes(validUrl)) {
							return state;
						}

						return {
							urls: [...state.urls, validUrl],
							selectedUrl: validUrl,
						};
					});
				} catch (error) {
					console.error("無効なURL:", error);
				}
			},

			removeFeed: (url) => {
				set((state) => ({
					urls: state.urls.filter((u) => u !== url),
					selectedUrl: state.selectedUrl === url ? "all" : state.selectedUrl,
				}));
			},

			selectFeed: (url) => {
				set({
					selectedUrl: url,
				});
			},

			setIsLoading: (isLoading) => {
				set({ isLoading });
			},
		}),
		{
			name: "rss-subscriptions",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				urls: state.urls,
				selectedUrl: state.selectedUrl,
			}),
			// 永続化したデータをロードする際にバリデーション
			onRehydrateStorage: () => (state) => {
				if (state) {
					try {
						// スキーマによる検証
						const validatedState = persistedStateSchema.parse({
							urls: state.urls,
							selectedUrl: state.selectedUrl,
						});

						// 検証済みの値をセット
						state.urls = validatedState.urls;
						state.selectedUrl = validatedState.selectedUrl;
					} catch (error) {
						console.error("保存されたデータの検証エラー:", error);

						// エラーの場合は初期値にリセット
						state.urls = [];
						state.selectedUrl = "all";
					}
				}
			},
		},
	),
);

/**
 * フィードデータと操作を統合する単一のフック
 */
export function useFeeds() {
	const {
		urls,
		selectedUrl,
		isLoading: isStoreLoading,
		addFeed,
		removeFeed,
		selectFeed,
		setIsLoading,
	} = useFeedStore();

	// SWRでフィードデータを取得
	const {
		data: feeds = [],
		error,
		isLoading: isFeedsLoading,
		isValidating,
		mutate: mutateFeeds,
	} = useSWR(
		urls.length ? ["feeds", urls] : null,
		async () => {
			if (!urls.length) return [];

			// 並列でフィードを取得
			const results = await Promise.allSettled(
				urls.map((url) => fetchRss(url)),
			);

			// 成功したもののみを返す
			const feeds: Feed[] = [];

			results.forEach((result, index) => {
				if (result.status === "fulfilled") {
					feeds.push(result.value);
				} else {
					const url = urls[index];
					const error = result.reason;
					console.error(`フィード取得エラー (${url}):`, error);

					// エラーのあったフィードは空のデータを返す
					feeds.push({
						url,
						title: `読み込みエラー: ${url}`,
						items: [],
					});
				}
			});

			return feeds;
		},
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: true,
			dedupingInterval: 60000, // 1分間は同じリクエストを重複させない
		},
	);

	// 全記事を取得
	const { data: allArticles = [] } = useSWR(
		feeds.length ? ["allArticles", feeds.map((f) => f.url).join(",")] : null,
		() => getAllArticles(feeds),
		{
			revalidateOnFocus: false,
		},
	);

	// フィード更新ミューテーション
	const { trigger: reloadFeedTrigger, isMutating: isRefreshing } =
		useSWRMutation("reload-feed", async (_key: string) => {
			if (!urls.length) return [];

			const updatedFeeds = [];
			for (const url of urls) {
				try {
					await refreshFeed(url);
					const feed = await fetchRss(url);
					updatedFeeds.push(feed);
				} catch (error) {
					console.error(`フィード更新エラー (${url}):`, error);
					updatedFeeds.push({
						url,
						title: `読み込みエラー: ${url}`,
						items: [],
					});
				}
			}

			return updatedFeeds;
		});

	// フィード更新関数
	const reloadFeed = async (): Promise<boolean> => {
		try {
			setIsLoading(true);
			await reloadFeedTrigger();
			await mutateFeeds();
			return true;
		} catch (error) {
			console.error("フィード更新エラー :", error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	// 表示状態の判定
	const isAnyLoading = isStoreLoading || isFeedsLoading;
	const showSkeleton = urls.length > 0 && isAnyLoading;
	const showFeeds = feeds.length > 0 && (!showSkeleton || !isAnyLoading);
	const showWelcome = !showSkeleton && !showFeeds;

	return {
		// 状態
		urls,
		feeds,
		allArticles,
		selectedUrl,
		isLoading: isAnyLoading,
		isRefreshing,
		error,

		// UI表示状態
		showSkeleton,
		showFeeds,
		showWelcome,

		// アクション
		addFeed,
		removeFeed,
		reloadFeed,
		selectFeed,
		mutateFeeds,
	};
}
