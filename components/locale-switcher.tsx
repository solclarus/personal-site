"use client";

import { usePathname } from "@/i18n/navigation";
import { Button } from "@c/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@c/ui/dropdown-menu";
import { AnimatePresence, motion } from "motion/react";
import { type Locale, useLocale } from "next-intl";
import Link from "next/link";
import { CircleFlagLanguage } from "react-circle-flags";

const AVAILABLE_LOCALES: { code: Locale; label: string }[] = [
	{ code: "ja", label: "日本語" },
	{ code: "en", label: "English" },
];

const MotionCircleFlag = motion(CircleFlagLanguage);

export function LocaleSwitcher() {
	const pathname = usePathname();
	const locale = useLocale();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="shrink-0 cursor-pointer rounded-full"
					variant="ghost"
					size="icon"
				>
					<AnimatePresence mode="wait">
						<MotionCircleFlag
							languageCode={locale}
							height={24}
							width={24}
							initial={{ opacity: 0, scale: 0.2, rotate: -360 }}
							animate={{ opacity: 1, scale: 1, rotate: 0 }}
							exit={{ opacity: 0, scale: 0.2, rotate: 360 }}
							transition={{ duration: 1, ease: "easeInOut" }}
						/>
					</AnimatePresence>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="*:cursor-pointer">
				{AVAILABLE_LOCALES.map(({ code, label }) => {
					const isActive = code === locale;

					return (
						<DropdownMenuItem key={code} disabled={isActive} asChild>
							<Link href={`/${code}${pathname}`}>
								<motion.div
									className={"flex w-full items-center gap-2"}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<CircleFlagLanguage
										languageCode={code}
										height={20}
										width={20}
									/>
									{label}
								</motion.div>
							</Link>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
