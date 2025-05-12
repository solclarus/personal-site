import type { Portfolio } from "@/types/portfolio";

export const PORTFOLIOS: Portfolio[] = [
	{
		slug: "portfolio-site",
		href: "https://solclarus.me",
		title: "portfolio site",
		image: "/images/portfolio/portfolio-site.jpg",
		description: "This is portfolio site",
	},
	{
		slug: "gowanted",
		href: "https://gowanted.vercel.app",
		title: "GoWanted",
		image: "/images/portfolio/gowanted.jpg",
		description: "This app shows the Pokémon in the Pokémon GO app.",
	},
	{
		slug: "cinemento",
		href: "https://cinemento.vercel.app",
		title: "Cinemento",
		image: "/images/portfolio/cinemento.jpg",
		description: "Cinemento is a movie log",
	},
];
