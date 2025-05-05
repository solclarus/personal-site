"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useFeeds } from "../store";

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
