import { WORKS } from "@/config/work";
import { WorkItem } from "@c/work-item";

export default async function Portfolio() {
	return (
		<main className="flex flex-col">
			<h2 className="font-semibold text-xl">Portfolio</h2>
			<p>This page is my portfolio.</p>
			{WORKS.portfolio.map((work) => (
				<WorkItem key={work.id} work={work} />
			))}
		</main>
	);
}
