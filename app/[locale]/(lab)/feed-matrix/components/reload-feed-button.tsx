"use client";

import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";
import { useFeeds } from "../store";

export const ReloadFeedButton = () => {
	const { urls, isLoading, reloadFeed } = useFeeds();

	const handleRefreshFeed = () => {
		try {
			reloadFeed();
			toast.success("フィードを更新しました");
		} catch (error) {
			toast.error("フィード更新中にエラーが発生しました");
		}
	};

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={() => handleRefreshFeed()}
			disabled={isLoading || urls.length === 0}
		>
			<RefreshCwIcon className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
		</Button>
	);
};
