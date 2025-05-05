"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw, Trash2 } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { extractDomain } from "../lib";
import type { Feed } from "../type";

type Props = {
	feed: Feed;
	loading: boolean;
	onRefresh: (url: string) => Promise<boolean>;
	onRemove: (url: string) => void;
};

export const FeedHeader = memo(function FeedHeader({
	feed,
	loading,
	onRefresh,
	onRemove,
}: Props) {
	const handleRefresh = async () => {
		if (loading) return;

		try {
			await onRefresh(feed.url);
		} catch (error) {
			console.error("フィード更新エラー:", error);
		}
	};

	// サイトドメインを取得
	const domain = extractDomain(feed.url);

	return (
		<div className="flex justify-between items-center mb-4 flex-wrap gap-2">
			<div className="flex items-center gap-2">
				<h2 className="text-xl font-semibold truncate">{feed.title}</h2>
				{domain && (
					<Link
						href={`https://${domain}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-xs flex items-center gap-1 text-blue-600 hover:underline"
					>
						<ExternalLink size={12} />
						<span className="hidden sm:inline">{domain}</span>
					</Link>
				)}
			</div>
			<div className="flex gap-2">
				<Button
					variant="outline"
					size="icon"
					onClick={handleRefresh}
					disabled={loading}
				>
					<RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
				</Button>
				<Button
					variant="destructive"
					size="icon"
					onClick={() => onRemove(feed.url)}
					disabled={loading}
				>
					<Trash2 className="size-4" />
				</Button>
			</div>
		</div>
	);
});
