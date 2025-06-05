import { Link } from "@/i18n/navigation";
import type { Portfolio } from "@/types/portfolio";
import Image from "next/image";

export function PortfolioItem({ portfolio }: { portfolio: Portfolio }) {
	return (
		<section>
			<hr className="-translate-x-[50%] relative left-[50%] my-4 min-w-dvw border-t border-dashed md:my-6" />
			<Link href={`/portfolio/${portfolio.slug}`}>
				<div className="relative mb-3 aspect-video overflow-hidden">
					<Image
						src={`/images/portfolio/${portfolio.slug}.jpg`}
						alt={portfolio.title}
						fill
						className="object-cover"
						unoptimized
					/>
				</div>
			</Link>
			<h3 className="font-semibold">{portfolio.title}</h3>
		</section>
	);
}
