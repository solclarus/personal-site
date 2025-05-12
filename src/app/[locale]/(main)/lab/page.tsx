import { LabItem } from "@/components/lab-item";
import { LABS } from "@/config/lab";

export default async function Lab() {
	return (
		<main className="flex flex-col">
			<h2 className="font-semibold text-xl">Lab</h2>
			<p>This page shows works like laboratories.</p>
			{LABS.map((lab) => (
				<LabItem key={lab.slug} lab={lab} />
			))}
		</main>
	);
}
