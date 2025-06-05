import { Link } from "@/i18n/navigation";
import type { Portfolio } from "@/types/portfolio";
import Image from "next/image";

export function WorkItem({ portfolio }: { portfolio: Portfolio }) {
	return (
		<Link href={`/portfolio/${portfolio.slug}`} className="flex items-center">
			<div className="flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-md border">
				<Image
					src={portfolio.icon}
					alt={portfolio.title}
					width={40}
					height={40}
					unoptimized
				/>
			</div>
			<div className="ml-2 flex flex-col">
				<h3 className="font-semibold text-sm">{portfolio.title}</h3>
				<p className="line-clamp-1 text-muted-foreground text-sm">
					{portfolio.description}
				</p>
			</div>
		</Link>
	);
}
