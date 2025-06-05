"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const MotionMoon = motion(Moon);
const MotionSun = motion(Sun);

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isThemeChanging, setIsThemeChanging] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setIsThemeChanging(true);
		const currentTheme = theme === "dark" ? "light" : "dark";
		setTheme(currentTheme);
	};

	if (!mounted) {
		return null;
	}

	const variant = isThemeChanging
		? {
				initial: { opacity: 0, scale: 0.2, rotate: -360 },
				animate: { opacity: 1, scale: 1, rotate: 0 },
				exit: { opacity: 0, scale: 0.2, rotate: 360 },
				transition: { duration: 1, ease: "easeInOut" },
			}
		: {};

	return (
		<Button
			onClick={toggleTheme}
			variant="ghost"
			size="icon"
			className="shrink-0 cursor-pointer rounded-full"
		>
			<AnimatePresence mode="wait">
				{theme === "light" ? (
					<MotionSun {...variant} color="orange" />
				) : (
					<MotionMoon {...variant} color="yellow" />
				)}
			</AnimatePresence>
		</Button>
	);
}
