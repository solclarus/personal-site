import { WorkItem } from "@/components/work-item";
import { WORKS } from "@/config/work";

export default async function Lab() {
	return (
		<main className="flex flex-col">
			<h2 className="text-xl font-semibold">Lab</h2>
			<p>This page shows works like laboratories.</p>
			{WORKS.lab.map((work) => (
				<WorkItem key={work.id} work={work} />
			))}
		</main>
	);
}
