"use client";

import { useFormatter } from "next-intl";
import Link from "next/link";
import { memo } from "react";
import type { Article } from "../type";

type Props = {
	article: Article;
	showFeedTitle: boolean;
};

export const ArticleCard = memo(function ArticleCard({
	article,
	showFeedTitle,
}: Props) {
	// 無効なURLの場合はデフォルト値を使用
	const safeLink = article.link && article.link !== "#" ? article.link : "#";
	const format = useFormatter();

	return (
		<Link
			href={safeLink}
			target="_blank"
			rel="noopener noreferrer"
			className="p-4 border group block h-full rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
		>
			<div className="font-medium text-lg">
				{article.title || "タイトルなし"}
			</div>
			<div className="text-sm text-gray-500 mt-1">
				{showFeedTitle && article.feedTitle && (
					<div className="text-gray-600 dark:text-gray-400 font-medium">
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
