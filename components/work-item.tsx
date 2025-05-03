import { Link } from "@/i18n/navigation";
import type { Work } from "@/types/work";
import Image from "next/image";

export function WorkItem({ work }: { work: Work }) {
	return (
		<section>
			<hr className="border-t border-dashed relative min-w-dvw left-[50%] -translate-x-[50%] my-6" />
			<Link href={work.href} target="_blank">
				<div className="relative aspect-video overflow-hidden mb-3">
					<Image
						src={work.image}
						alt={work.title}
						fill
						className="object-cover"
					/>
				</div>
			</Link>
			<h3 className="font-semibold">{work.title}</h3>
			<p className="text-sm text-muted-foreground">{work.description}</p>
		</section>
	);
}
