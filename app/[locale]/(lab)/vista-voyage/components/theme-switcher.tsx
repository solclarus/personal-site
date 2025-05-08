"use client";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
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
	sakura: "text-pink-500",
	autumn: "text-amber-400",
	matrix: "text-green-400",
};

export function ThemeSwitcher({ themeType, setThemeType }: Props) {
	return (
		<div className="flex gap-4 flex-wrap items-center justify-center">
			{(Object.keys(THEMES) as ThemeType[]).map((type) => {
				const Icon = THEMES[type].icon;
				const isActive = themeType === type;

				return (
					<TooltipProvider key={type}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size={"icon"}
									variant={"outline"}
									disabled={themeType === type}
									onClick={() => setThemeType(type)}
									className={cn(
										"cursor-pointer transition-all",
										isActive
											? `${THEME_COLORS[type]} ring-2 ring-white ring-opacity-50 scale-110`
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
