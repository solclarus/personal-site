"use client";

import { useFeeds } from "@lab/feed-matrix/store";
import { Button } from "@ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

export const RemoveFeedButton = () => {
	const { selectedUrl, isLoading, removeFeed } = useFeeds();

	const handleRemoveFeed = (url: string) => {
		try {
			removeFeed(url);
			toast.success("フィードを削除しました");
		} catch (error) {
			toast.error("フィード削除中にエラーが発生しました");
		}
	};

	return (
		<Button
			variant="destructive"
			size="icon"
			onClick={() => handleRemoveFeed(selectedUrl)}
			disabled={isLoading}
		>
			<TrashIcon className="size-4" />
		</Button>
	);
};
