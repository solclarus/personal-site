"use client";

import type { Article } from "@lab/feed-matrix/type";
import { useFormatter } from "next-intl";
import Link from "next/link";
import { memo } from "react";

type Props = {
	article: Article;
	showFeedTitle: boolean;
};

export const ArticleCard = memo(function ArticleCard({
	article,
	showFeedTitle,
}: Props) {
	const format = useFormatter();

	return (
		<Link
			href={article.link}
			target="_blank"
			rel="noopener noreferrer"
			className="group block h-full rounded-lg border p-4 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
		>
			<div className="font-medium text-lg">{article.title}</div>
			<div className="mt-1 text-gray-500 text-sm">
				{showFeedTitle && article.feedTitle && (
					<div className="font-medium text-gray-600 dark:text-gray-400">
						{article.feedTitle}
					</div>
				)}
				<div className="text-gray-500">
					{format.dateTime(new Date(article.pubDate), {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
			</div>
		</Link>
	);
});
