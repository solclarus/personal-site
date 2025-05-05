"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { memo } from "react";

export const WelcomeBoard = memo(function WelcomeBoard() {
	return (
		<Card className="animate-fadeIn">
			<CardHeader className="pb-2">
				<CardTitle>RSSリーダーへようこそ</CardTitle>
				<CardDescription>
					開始するには、最初のRSSフィードを追加してください
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="mb-3">
					上の入力フィールドにRSSフィードのURLを入力し、「フィード追加」をクリックして開始します。
				</p>
				<p className="mt-2 text-muted-foreground">フィードの例:</p>
				<ul className="list-disc pl-5 mt-1 text-muted-foreground space-y-1">
					<li>
						<a
							href="https://news.yahoo.co.jp/rss/topics/top-picks.xml"
							className="hover:underline text-blue-600"
							target="_blank"
							rel="noopener noreferrer"
						>
							Yahoo!ニュース - 主要トピックス
						</a>
					</li>
					<li>
						<a
							href="https://news.google.com/rss"
							className="hover:underline text-blue-600"
							target="_blank"
							rel="noopener noreferrer"
						>
							Google ニュース
						</a>
					</li>
					<li>
						<a
							href="https://www.nhk.or.jp/rss/news/cat0.xml"
							className="hover:underline text-blue-600"
							target="_blank"
							rel="noopener noreferrer"
						>
							NHK ニュース
						</a>
					</li>
				</ul>
			</CardContent>
		</Card>
	);
});
