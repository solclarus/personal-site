"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		const currentTheme = theme === "dark" ? "light" : "dark";
		setTheme(currentTheme);
	};

	if (!mounted) {
		return null;
	}

	return (
		<Button
			onClick={toggleTheme}
			variant="outline"
			size="icon"
			className="shrink-0 rounded-full"
		>
			{theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
		</Button>
	);
}
