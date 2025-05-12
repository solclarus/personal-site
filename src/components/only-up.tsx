"use client";

import { Button } from "@ui/button";
import { ArrowBigUpDash } from "lucide-react";
import { motion } from "motion/react";

export function OnlyUp() {
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	return (
		<Button
			className="cursor-pointer rounded-full"
			onClick={scrollToTop}
			variant="ghost"
			size="icon"
			asChild
		>
			<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
				<ArrowBigUpDash />
			</motion.div>
		</Button>
	);
}
