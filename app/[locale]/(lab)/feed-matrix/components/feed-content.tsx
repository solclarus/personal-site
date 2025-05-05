"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useFeedStore } from "../store";
import { useAllArticles, useFeeds, useRefreshFeed } from "../use-feed";
import { AddFeedForm } from "./add-feed-form";
import { ArticleList } from "./article-list";
import { FeedHeader } from "./feed-header";

export function FeedContent() {
	const {
		subscribedUrls,
		selectedFeedUrl,
		isLoading,
		removeSubscription,
		selectFeed,
	} = useFeedStore();

	// SWRでフィードデータを取得
	const {
		data: feeds = [],
		error,
		mutate: mutateFeeds,
	} = useFeeds(subscribedUrls);

	// 全記事を取得
	const { data: allArticles = [] } = useAllArticles(feeds);

	// フィード更新ミューテーション
	const { trigger: refreshFeedMutation, isMutating: isRefreshing } =
		useRefreshFeed();

	// エラー処理
	if (error) {
		console.error("フィード読み込みエラー:", error);
	}

	// フィード削除ハンドラー
	const handleRemoveFeed = (url: string) => {
		try {
			removeSubscription(url);
			toast.success("フィードを削除しました");
		} catch (error) {
			toast.error("フィード削除中にエラーが発生しました");
		}
	};

	// フィード更新ハンドラー
	const handleRefreshFeed = async (url: string): Promise<boolean> => {
		try {
			await refreshFeedMutation(url);
			await mutateFeeds();
			toast.success("フィードを更新しました");
			return true;
		} catch (error) {
			const message = error instanceof Error ? error.message : "不明なエラー";
			toast.error(`フィード更新エラー: ${message}`);
			return false;
		}
	};

	// タブ変更ハンドラー
	const handleTabChange = (value: string) => {
		selectFeed(value);
	};

	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">FeedMatrix</h1>

			<AddFeedForm />

			{feeds.length > 0 ? (
				<Tabs
					defaultValue="all"
					value={selectedFeedUrl}
					onValueChange={handleTabChange}
				>
					<TabsList className="mb-4 overflow-x-auto flex w-full">
						<TabsTrigger value="all">すべての記事</TabsTrigger>
						{feeds.map((feed) => (
							<TabsTrigger key={feed.url} value={feed.url}>
								{feed.title}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value="all">
						<ArticleList
							articles={allArticles}
							showFeedTitle={true}
							emptyMessage="まだ記事がありません。フィードを追加するか更新してください。"
						/>
					</TabsContent>

					{feeds.map((feed) => (
						<TabsContent key={feed.url} value={feed.url}>
							<FeedHeader
								feed={feed}
								onRefresh={handleRefreshFeed}
								onRemove={handleRemoveFeed}
								loading={
									isLoading || (selectedFeedUrl === feed.url && isRefreshing)
								}
							/>
							<ArticleList
								articles={feed.items.map((item) => ({
									...item,
									feedTitle: feed.title,
									feedUrl: feed.url,
								}))}
								emptyMessage="このフィードに記事がありません。更新を試してください。"
							/>
						</TabsContent>
					))}
				</Tabs>
			) : (
				<div className="space-y-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<Skeleton key={i} className="h-24 w-full" />
					))}
				</div>
			)}
		</div>
	);
}
