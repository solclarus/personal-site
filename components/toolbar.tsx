"use client";

import { cn } from "@/lib/utils";
import {
	Bell,
	Download,
	Edit2,
	Filter,
	Lock,
	type LucideIcon,
	Settings,
	Share2,
	Sun,
	User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

interface ToolbarItem {
	id: string;
	title: string;
	icon: LucideIcon;
	type?: never;
}

interface ToolbarProps {
	className?: string;
	activeColor?: string;
	onSearch?: (value: string) => void;
}

const buttonVariants = {
	initial: {
		gap: 0,
		paddingLeft: ".5rem",
		paddingRight: ".5rem",
	},
	animate: (isSelected: boolean) => ({
		gap: isSelected ? ".5rem" : 0,
		paddingLeft: isSelected ? "1rem" : ".5rem",
		paddingRight: isSelected ? "1rem" : ".5rem",
	}),
};

const spanVariants = {
	initial: { width: 0, opacity: 0 },
	animate: { width: "auto", opacity: 1 },
	exit: { width: 0, opacity: 0 },
};

const notificationVariants = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: -10 },
	exit: { opacity: 0, y: -20 },
};

const lineVariants = {
	initial: { scaleX: 0, x: "-50%" },
	animate: {
		scaleX: 1,
		x: "0%",
		transition: { duration: 0.2, ease: "easeOut" },
	},
	exit: {
		scaleX: 0,
		x: "50%",
		transition: { duration: 0.2, ease: "easeIn" },
	},
};

const transition = { type: "spring", bounce: 0, duration: 0.4 };

export function Toolbar({
	className,
	activeColor = "text-primary",
	onSearch,
}: ToolbarProps) {
	const [selected, setSelected] = React.useState<string | null>("filter");
	const [isToggled, setIsToggled] = React.useState(false);
	const [activeNotification, setActiveNotification] = React.useState<
		string | null
	>(null);
	const outsideClickRef = React.useRef(null);

	const toolbarItems: ToolbarItem[] = [
		{ id: "filter", title: "Filter", icon: Filter },
		{ id: "settings", title: "Settings", icon: Settings },
		{ id: "download", title: "Download", icon: Download },
		{ id: "share", title: "Share", icon: Share2 },
		{ id: "notifications", title: "Notifications", icon: Bell },
		{ id: "profile", title: "Profile", icon: User },
		{ id: "theme", title: "Theme", icon: Sun },
	];

	const handleItemClick = (itemId: string) => {
		setSelected(selected === itemId ? null : itemId);
		setActiveNotification(itemId);
		setTimeout(() => setActiveNotification(null), 1500);
	};

	return (
		<div className="space-y-2">
			<div
				ref={outsideClickRef}
				className={cn(
					"relative flex items-center gap-3 p-2",
					"bg-background",
					"rounded-xl border",
					"transition-all duration-200",
					className,
				)}
			>
				<AnimatePresence>
					{activeNotification && (
						<motion.div
							variants={notificationVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={{ duration: 0.3 }}
							className="-top-8 -translate-x-1/2 absolute left-1/2 z-50 transform"
						>
							<div className="rounded-full bg-primary px-3 py-1 text-primary-foreground text-xs">
								{
									toolbarItems.find((item) => item.id === activeNotification)
										?.title
								}{" "}
								clicked!
							</div>
							<motion.div
								variants={lineVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="-bottom-1 absolute left-1/2 h-[2px] w-full origin-left bg-primary"
							/>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="flex items-center gap-2">
					{toolbarItems.map((item) => (
						<motion.button
							key={item.id}
							variants={buttonVariants}
							initial={false}
							animate="animate"
							custom={selected === item.id}
							onClick={() => handleItemClick(item.id)}
							transition={transition}
							className={cn(
								"relative flex items-center rounded-none px-3 py-2",
								"font-medium text-sm transition-colors duration-300",
								selected === item.id
									? "rounded-lg bg-[#1F9CFE] text-white"
									: "text-muted-foreground hover:bg-muted hover:text-foreground",
							)}
						>
							<item.icon
								size={16}
								className={cn(selected === item.id && "text-white")}
							/>
							<AnimatePresence initial={false}>
								{selected === item.id && (
									<motion.span
										variants={spanVariants}
										initial="initial"
										animate="animate"
										exit="exit"
										transition={transition}
										className="overflow-hidden"
									>
										{item.title}
									</motion.span>
								)}
							</AnimatePresence>
						</motion.button>
					))}

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => setIsToggled(!isToggled)}
						className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary px-4 py-2 text-primary-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/90 hover:shadow-md active:border-primary/50"
					>
						{isToggled ? (
							<Edit2 className="h-3.5 w-3.5" />
						) : (
							<Lock className="h-3.5 w-3.5" />
						)}
						<span className="font-medium text-sm">
							{isToggled ? "On" : "Off"}
						</span>
					</motion.button>
				</div>
			</div>
		</div>
	);
}

export default Toolbar;
