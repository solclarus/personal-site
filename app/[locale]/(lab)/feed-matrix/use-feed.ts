"use client";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetchRss, refreshFeed } from "./action";
import { getAllArticles } from "./lib";
import type { Feed } from "./type";

/**
 * 複数のフィードを取得するSWRフック
 */
export function useFeeds(urls: string[]) {
	return useSWR(
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
}

/**
 * すべての記事を取得する派生フック
 */
export function useAllArticles(feeds: Feed[]) {
	return useSWR(
		feeds.length ? ["allArticles", feeds.map((f) => f.url).join(",")] : null,
		() => getAllArticles(feeds),
		{
			revalidateOnFocus: false,
		},
	);
}

/**
 * フィードを更新するためのミューテーションフック
 */
export function useRefreshFeed() {
	return useSWRMutation(
		"refresh-feed",
		async (_key: string, { arg }: { arg: string }) => {
			await refreshFeed(arg);
			return await fetchRss(arg);
		},
	);
}
