"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "@/i18n/navigation";
import { type Locale, useLocale } from "next-intl";
import Link from "next/link";
import { CircleFlagLanguage } from "react-circle-flags";

const AVAILABLE_LOCALES: { code: Locale; label: string }[] = [
	{ code: "ja", label: "日本語" },
	{ code: "en", label: "English" },
];

export function LocaleSwitcher() {
	const pathname = usePathname();
	const locale = useLocale();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="rounded-full" variant="outline" size="icon">
					<CircleFlagLanguage languageCode={locale} height={24} width={24} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="*:cursor-pointer">
				{AVAILABLE_LOCALES.map(({ code, label }) => {
					return (
						<DropdownMenuItem key={code} disabled={code === locale} asChild>
							<Link href={`/${code}${pathname}`}>
								<CircleFlagLanguage
									languageCode={code}
									height={20}
									width={20}
								/>
								{label}
							</Link>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
