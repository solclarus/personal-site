"use client";

import { Card, CardContent } from "@/components/ui/card";
import { memo } from "react";
import type { Article } from "../type";
import { ArticleCard } from "./article-card";

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
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
