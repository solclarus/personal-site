"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFeeds } from "../store";
import { ArticleHeader } from "./article-header";
import { ArticleList } from "./article-list";

export function FeedContent() {
	const { feeds, selectedUrl, allArticles, selectFeed } = useFeeds();

	return (
		<Tabs defaultValue="all" value={selectedUrl} onValueChange={selectFeed}>
			{feeds.length > 0 && (
				<TabsList className="mb-4 overflow-x-auto flex w-full">
					<TabsTrigger value="all">すべての記事</TabsTrigger>
					{feeds.map((feed) => (
						<TabsTrigger key={feed.url} value={feed.url}>
							{feed.title}
						</TabsTrigger>
					))}
				</TabsList>
			)}

			<TabsContent value="all">
				<ArticleList
					articles={allArticles}
					showFeedTitle={true}
					emptyMessage="まだ記事がありません。フィードを追加するか更新してください。"
				/>
			</TabsContent>

			{feeds.map((feed) => (
				<TabsContent key={feed.url} value={feed.url}>
					<ArticleHeader feed={feed} />
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
	);
}
