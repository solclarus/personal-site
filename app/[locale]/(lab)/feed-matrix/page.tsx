"use client";
import { Toaster } from "sonner";
import { FeedContent } from "./components/feed-content";

export default function FeedMatrix() {
	return (
		<div className="py-8 px-4">
			<Toaster position="top-center" richColors />
			<FeedContent />
		</div>
	);
}
