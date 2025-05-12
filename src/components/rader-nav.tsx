"use client";

import { NAVIGATIONS } from "@/config/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@ui/tooltip";
import { RadarIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function RaderNav() {
	const pathname = usePathname();
	const locale = useLocale();
	const [isExpanded, setIsExpanded] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	useEffect(() => {
		if (!isExpanded) return;

		const handleOutsideClick = (event: MouseEvent) => {
			// メニュー外のクリックを検出
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsExpanded(false);
			}
		};

		// イベントリスナーを追加
		document.addEventListener("mousedown", handleOutsideClick);

		// クリーンアップ関数
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isExpanded]);

	const radius = 100;
	const blurSize = radius * 5;
	const borderSize = radius * 2;
	const startAngle = -150;
	const sweepAngle = 120;
	const btnCenter = 18;

	return (
		<div className="relative" ref={menuRef}>
			<AnimatePresence>
				{isExpanded && (
					<>
						<motion.div
							className="fixed inset-0 z-10"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={() => setIsExpanded(false)}
						/>
						<motion.div
							className="absolute rounded-full border backdrop-blur-sm"
							style={{
								width: blurSize,
								height: blurSize,
								left: -blurSize / 2 + btnCenter,
								top: -blurSize / 2 + btnCenter,
							}}
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							transition={{ duration: 0.15, ease: "easeOut" }}
						/>
						<motion.div
							className="absolute rounded-full border backdrop-blur-lg"
							style={{
								width: borderSize,
								height: borderSize,
								left: -borderSize / 2 + btnCenter,
								top: -borderSize / 2 + btnCenter,
							}}
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							transition={{ duration: 0.1, ease: "easeOut", delay: 0.05 }}
						/>
					</>
				)}
			</AnimatePresence>
			<Button
				className="shrink-0 cursor-pointer rounded-full"
				variant="ghost"
				size="icon"
				asChild
			>
				<motion.button
					className="flex items-center justify-center rounded-full"
					aria-label={isExpanded ? "Close menu" : "Open menu"}
					onClick={toggleExpanded}
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: 1.1 }}
					transition={{
						type: "spring",
						stiffness: 260,
						damping: 20,
					}}
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={isExpanded ? "expanded" : "collapsed"}
							animate={{
								rotate: isExpanded ? 360 : 0,
							}}
							transition={{
								duration: 8,
								repeat: isExpanded ? Number.POSITIVE_INFINITY : 0,
								ease: "linear",
								repeatType: "loop",
							}}
						>
							<RadarIcon />
						</motion.div>
					</AnimatePresence>
				</motion.button>
			</Button>

			<AnimatePresence>
				{isExpanded && (
					<motion.div
						className="absolute z-20"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						{NAVIGATIONS.map((item, index) => {
							const isActive =
								item.href === "/"
									? pathname === `/${locale}` || pathname === `/${locale}/`
									: pathname.startsWith(`/${locale}${item.href}`);

							// Calculate angle
							const angleInDegrees =
								startAngle + (sweepAngle / (NAVIGATIONS.length - 1)) * index;
							const angleInRadians = (angleInDegrees * Math.PI) / 180;

							// Calculate positions
							const x = radius * Math.cos(angleInRadians);
							const y = radius * Math.sin(angleInRadians);

							return (
								<motion.div
									key={item.href}
									className="absolute"
									style={{
										left: 0,
										bottom: 0,
									}}
									initial={{ scale: 0, x: 0, y: 0 }}
									animate={{
										scale: 1,
										x: x,
										y: y,
									}}
									exit={{
										scale: 0,
										x: 0,
										y: 0,
									}}
									transition={{
										type: "spring",
										stiffness: 350,
										damping: 25,
										delay: index * 0.05,
									}}
								>
									<TooltipProvider key={item.id}>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													size="icon"
													variant="secondary"
													className={cn(
														isActive && "ring-2 ring-primary",
														"rounded-full",
													)}
													asChild
												>
													<Link href={item.href}>
														<motion.div
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
														>
															<item.icon />
														</motion.div>
													</Link>
												</Button>
											</TooltipTrigger>
											<TooltipContent>{item.label}</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</motion.div>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
