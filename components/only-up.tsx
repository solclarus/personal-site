"use client";
import { Button } from "@/components/ui/button";
import { ArrowBigUpDash } from "lucide-react";

export function OnlyUp() {
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	return (
		<Button
			className="rounded-full"
			onClick={scrollToTop}
			variant="outline"
			size="icon"
		>
			<ArrowBigUpDash />
		</Button>
	);
}
