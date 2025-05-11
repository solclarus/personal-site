import { Link } from "@/i18n/navigation";
import type { Work } from "@/types/work";
import Image from "next/image";

export function WorkItem({ work }: { work: Work }) {
	return (
		<section>
			<hr className="-translate-x-[50%] relative left-[50%] my-4 min-w-dvw border-t border-dashed md:my-6" />
			<Link href={work.href} target="_blank">
				<div className="relative mb-3 aspect-video overflow-hidden">
					<Image
						src={work.image}
						alt={work.title}
						fill
						className="object-cover"
						unoptimized
					/>
				</div>
			</Link>
			<h3 className="font-semibold">{work.title}</h3>
			<p className="text-muted-foreground text-sm">{work.description}</p>
		</section>
	);
}
