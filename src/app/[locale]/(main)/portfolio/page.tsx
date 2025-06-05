import { PortfolioItem } from "@/components/portfolio-item";
import { getAllPortfolios } from "@/lib/portfolio";

export default async function Portfolio() {
	const portfolios = await getAllPortfolios();

	return (
		<main className="flex flex-col">
			<h2 className="font-semibold text-xl">Portfolio</h2>
			<p>This page is my portfolio.</p>
			{portfolios.map((portfolio) => (
				<PortfolioItem key={portfolio.slug} portfolio={portfolio} />
			))}
		</main>
	);
}
