"use client";

import type { Article, Feed } from "@feed-matrix/type";

export function getAllArticles(feeds: Feed[]): Article[] {
	if (!feeds.length) return [];

	return feeds
		.flatMap((feed) =>
			feed.items.map((feedItem) => ({
				...feedItem,
				feedTitle: feed.title,
				feedUrl: feed.url,
			})),
		)
		.sort(
			(a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
		);
}

export function extractDomain(url: string) {
	try {
		const data = new URL(url);
		return data.hostname;
	} catch {
		return null;
	}
}
