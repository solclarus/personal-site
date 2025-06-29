"use client";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { OnlyUp } from "@/components/only-up";
import { RadarNav } from "@/components/radar-nav";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export function FloatingMenu() {
	return (
		<nav className="-translate-x-1/2 fixed bottom-32 left-1/2 z-10 flex gap-1 rounded-full border bg-card p-1.5 shadow-lg">
			<RadarNav />
			<ThemeSwitcher />
			<LocaleSwitcher />
			<OnlyUp />
		</nav>
	);
}
