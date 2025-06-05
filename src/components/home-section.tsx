import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { LucideIcon } from "lucide-react";

type Props = {
	children: React.ReactNode;
	className: string;
	icon: LucideIcon;
	label: string;
};

export function HomeSection({ children, className, icon, label }: Props) {
	const Icon = icon;

	return (
		<>
			<hr className="-translate-x-[50%] relative left-[50%] my-6 min-w-dvw border-t border-dashed" />
			<section>
				<div className="mb-6 flex items-center">
					<div className="flex size-8 items-center justify-center rounded-lg border bg-muted/50">
						<Icon className={cn("size-4", className)} />
					</div>
					<h2 className="ml-3 font-bold">{label}</h2>
				</div>
				{children}
			</section>
		</>
	);
}
