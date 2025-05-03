import { WorkItem } from "@/components/work-item";
import { WORKS } from "@/config/work";

export default async function Portfolio() {
	return (
		<main className="flex flex-col">
			<h2 className="text-xl font-semibold">Portfolio</h2>
			<p>This page is my portfolio.</p>
			{WORKS.portfolio.map((work) => (
				<WorkItem key={work.id} work={work} />
			))}
		</main>
	);
}
