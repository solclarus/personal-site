import { Link } from "@/i18n/navigation";
import type { Lab } from "@/types/lab";
import Image from "next/image";

export function LabItem({ lab }: { lab: Lab }) {
	return (
		<section>
			<hr className="-translate-x-[50%] relative left-[50%] my-4 min-w-dvw border-t border-dashed md:my-6" />
			<Link href={`/${lab.slug}`}>
				<div className="relative mb-3 aspect-video overflow-hidden">
					<Image
						src={lab.image}
						alt={lab.title}
						fill
						className="object-cover"
						unoptimized
					/>
				</div>
			</Link>
			<h3 className="font-semibold">{lab.title}</h3>
			<p className="text-muted-foreground text-sm">{lab.description}</p>
		</section>
	);
}
