import { PortfolioSchema } from "@/schema/portfolio";
import type { Portfolio } from "@/types/portfolio";
import { getLocale } from "next-intl/server";
import "server-only";

export const getPortfolio = async (slug: string): Promise<Portfolio> => {
	const locale = await getLocale();
	const portfolio = await import(`@/contents/${slug}/${locale}.mdx`);

	const { title, icon, image, href, createdAt, description } =
		portfolio.metadata;

	return {
		slug,
		title,
		icon,
		image,
		href,
		createdAt,
		description,
		content: portfolio.default,
	};
};

export const getAllPortfolios = async (): Promise<Portfolio[]> => {
	return Promise.all(PortfolioSchema.map(async (slug) => getPortfolio(slug)));
};
