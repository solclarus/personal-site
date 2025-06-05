"use client";

import { ArticleCard } from "@lab/feed-matrix/components/article-card";
import type { Article } from "@lab/feed-matrix/type";
import { Card, CardContent } from "@ui/card";
import { memo } from "react";

type Props = {
	articles: Article[];
	showFeedTitle?: boolean;
	emptyMessage?: string;
};

export const ArticleList = memo(function ArticleList({
	articles,
	showFeedTitle = false,
	emptyMessage = "このフィードに記事がありません。",
}: Props) {
	if (articles.length === 0) {
		return (
			<Card>
				<CardContent>{emptyMessage}</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
			{articles.map((article) => (
				<ArticleCard
					key={`${article.feedUrl}-${article.link}`}
					article={article}
					showFeedTitle={showFeedTitle}
				/>
			))}
		</div>
	);
});
