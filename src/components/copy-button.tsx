"use client";

import { cn } from "@/lib/utils";
import { Button } from "@ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	className: string;
	text: string;
};

export default function CopyButton({ className, text }: Props) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);

			setTimeout(() => {
				setIsCopied(false);
			}, 3000);
		} catch (error) {
			toast.error("クリップボードへのコピーに失敗しました。");
		}
	};

	return (
		<Button
			onClick={handleCopy}
			size="icon"
			variant={"ghost"}
			className={cn("size-7 cursor-pointer", className)}
		>
			<AnimatePresence mode="wait">
				{isCopied ? (
					<motion.div
						key="check"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{ duration: 0.1 }}
						className="absolute inset-0 flex items-center justify-center"
					>
						<CheckIcon size={14} className="text-green-500" />
					</motion.div>
				) : (
					<motion.div
						key="copy"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{ duration: 0.1 }}
						className="absolute inset-0 flex items-center justify-center"
					>
						<CopyIcon size={14} />
					</motion.div>
				)}
			</AnimatePresence>
			<span className="sr-only">{isCopied ? "コピーしました" : "コピー"}</span>
		</Button>
	);
}
