import { WORKS } from "@/config/work";
import { WorkItem } from "@c/work-item";

export default async function Lab() {
	return (
		<main className="flex flex-col">
			<h2 className="font-semibold text-xl">Lab</h2>
			<p>This page shows works like laboratories.</p>
			{WORKS.lab.map((work) => (
				<WorkItem key={work.id} work={work} />
			))}
		</main>
	);
}
