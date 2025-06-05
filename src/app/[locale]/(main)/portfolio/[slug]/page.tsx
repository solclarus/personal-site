import { getPortfolio } from "@/lib/portfolio";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function PortfolioDetail({ params }: Props) {
	const { slug } = await params;
	const portfolio = await getPortfolio(slug);

	if (!portfolio) return <div>Not found</div>;

	return (
		<div>
			<Image
				src={`/images/portfolio/${portfolio.slug}.jpg`}
				alt={portfolio.title}
				width={900}
				height={600}
				className="w-full object-cover"
				unoptimized
			/>
			<header className="space-y-4">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="mb-2 font-bold text-4xl md:text-5xl">
							{portfolio.title}
						</h1>
						<div className="mb-3 flex items-center gap-2 text-muted-foreground">
							<CalendarIcon className="h-4 w-4" />
							<p>{format(new Date(portfolio.createdAt), "yyyy年M月d日")}</p>
						</div>
					</div>
				</div>
			</header>
			<portfolio.content />
		</div>
	);
}
