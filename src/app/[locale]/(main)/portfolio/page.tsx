import { PortfolioItem } from "@/components/portfolio-item";
import { PORTFOLIOS } from "@/config/portfolio";

export default async function Portfolio() {
	return (
		<main className="flex flex-col">
			<h2 className="font-semibold text-xl">Portfolio</h2>
			<p>This page is my portfolio.</p>
			{PORTFOLIOS.map((portfolio) => (
				<PortfolioItem key={portfolio.slug} portfolio={portfolio} />
			))}
		</main>
	);
}
