"use client";

import { cn } from "@/lib/utils";
import { Button } from "@c/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@c/ui/tooltip";
import { THEMES } from "@vista-voyage/config";
import type { ThemeType } from "@vista-voyage/type";

type Props = {
	themeType: ThemeType;
	setThemeType: (type: ThemeType) => void;
};

const THEME_COLORS: Record<ThemeType, string> = {
	rain: "text-blue-300",
	snow: "text-slate-100",
	space: "text-purple-300",
	bubbles: "text-cyan-500",
	sakura: "text-pink-300",
	autumn: "text-amber-400",
	matrix: "text-green-400",
};

export function ThemeSwitcher({ themeType, setThemeType }: Props) {
	return (
		<div className="flex flex-wrap items-center justify-center gap-4">
			{(Object.keys(THEMES) as ThemeType[]).map((type) => {
				const Icon = THEMES[type].icon;
				const isActive = themeType === type;

				return (
					<TooltipProvider key={type}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size={"icon"}
									variant={"ghost"}
									disabled={themeType === type}
									onClick={() => setThemeType(type)}
									className={cn(
										"cursor-pointer transition-all",
										isActive
											? `${THEME_COLORS[type]} scale-110 ring-2 ring-white ring-opacity-50`
											: THEME_COLORS[type],
									)}
								>
									<Icon />
								</Button>
							</TooltipTrigger>
							<TooltipContent>{THEMES[type].label}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			})}
		</div>
	);
}
