"use client";
import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// ストアの状態型定義
interface FeedsState {
	subscribedUrls: string[];
	selectedFeedUrl: string;
	isLoading: boolean;

	addSubscription: (url: string) => void;
	removeSubscription: (url: string) => void;
	selectFeed: (url: string) => void;
	setIsLoading: (isLoading: boolean) => void;
}

// 永続化するデータのスキーマ
const persistedStateSchema = z.object({
	subscribedUrls: z.array(z.string().url()),
	selectedFeedUrl: z.string(),
});

export const useFeedStore = create<FeedsState>()(
	persist(
		(set) => ({
			subscribedUrls: [],
			selectedFeedUrl: "all",
			isLoading: false,

			// 購読追加
			addSubscription: (url) => {
				try {
					// URL形式を検証
					const validUrl = z.string().url().parse(url);

					set((state) => {
						// 重複チェック
						if (state.subscribedUrls.includes(validUrl)) {
							return state;
						}

						return {
							subscribedUrls: [...state.subscribedUrls, validUrl],
							isAddingFeed: false,
						};
					});
				} catch (error) {
					console.error("無効なURL:", error);
				}
			},

			// 購読削除
			removeSubscription: (url) => {
				set((state) => ({
					subscribedUrls: state.subscribedUrls.filter((u) => u !== url),
					selectedFeedUrl:
						state.selectedFeedUrl === url ? "all" : state.selectedFeedUrl,
				}));
			},

			// フィード選択
			selectFeed: (url) => {
				set({
					selectedFeedUrl: url,
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
				subscribedUrls: state.subscribedUrls,
				selectedFeedUrl: state.selectedFeedUrl,
			}),
			// 永続化したデータをロードする際にバリデーション
			onRehydrateStorage: () => (state) => {
				if (state) {
					try {
						// スキーマによる検証
						const validatedState = persistedStateSchema.parse({
							subscribedUrls: state.subscribedUrls,
							selectedFeedUrl: state.selectedFeedUrl,
						});

						// 検証済みの値をセット
						state.subscribedUrls = validatedState.subscribedUrls;
						state.selectedFeedUrl = validatedState.selectedFeedUrl;
					} catch (error) {
						console.error("保存されたデータの検証エラー:", error);

						// エラーの場合は初期値にリセット
						state.subscribedUrls = [];
						state.selectedFeedUrl = "all";
					}
				}
			},
		},
	),
);
