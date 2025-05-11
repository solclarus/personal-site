"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { extractDomain } from "../lib";
import { useFeeds } from "../store";
import type { Feed } from "../type";
import { RemoveFeedButton } from "./remove-feed-button";

export const ArticleHeader = memo(function ArticleHeader({
	feed,
}: { feed: Feed }) {
	const { selectedUrl } = useFeeds();
	const domain = extractDomain(selectedUrl);

	return (
		<div className="mb-4 flex flex-wrap items-center justify-between gap-2">
			<div className="flex items-center gap-2">
				<h2 className="truncate font-semibold text-xl">{feed.title}</h2>
				{domain && (
					<Link
						href={`https://${domain}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 text-blue-600 text-xs hover:underline"
					>
						<ExternalLink size={12} />
						<span className="hidden sm:inline">{domain}</span>
					</Link>
				)}
			</div>
			<RemoveFeedButton />
		</div>
	);
});
