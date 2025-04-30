"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { LucideIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
	href: string;
	icon: ReactNode;
};

export function FloatingMenuItem({ href, icon }: Props) {
	const pathname = usePathname();
	const locale = useLocale();
	const IconSlot = Slot as LucideIcon;

	const isActive =
		href === "/"
			? pathname === `/${locale}` || pathname === `/${locale}/`
			: pathname.startsWith(`/${locale}${href}`);

	return (
		<Button
			asChild
			className={cn(
				"rounded-full",
				isActive && "border-2 border-accent text-amber-400",
			)}
			variant="outline"
			size="icon"
		>
			<Link href={href}>
				<IconSlot>{icon}</IconSlot>
			</Link>
		</Button>
	);
}
