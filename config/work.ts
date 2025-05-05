import type { Work } from "@/types/work";

export const WORKS: Record<string, Work[]> = {
	lab: [
		{
			id: "mac-terminal",
			href: "/mac-terminal",
			title: "Mac Terminal",
			image: "/images/lab/mac-terminal.jpg",
			description: "Cinemento is a movie log",
		},
		{
			id: "vista-voyage",
			href: "/vista-voyage",
			title: "Vista Voyage",
			image: "/images/lab/vista-voyage.jpg",
			description: "Cinemento is a movie log",
		},
		{
			id: "feed-matrix",
			href: "/feed-matrix",
			title: "FeedMatrix",
			image: "/images/lab/feed-matrix.jpg",
			description: "FeedMatrix is a simple RSS reader",
		},
	],
	portfolio: [
		{
			id: "my-site",
			href: "https://solclarus.me",
			title: "My site",
			image: "/images/portfolio/my-site.jpg",
			description: "This is my site",
		},
		{
			id: "gowanted",
			href: "https://gowanted.vercel.app",
			title: "GoWanted",
			image: "/images/portfolio/gowanted.jpg",
			description: "This app shows the Pokémon in the Pokémon GO app.",
		},
		{
			id: "cinemento",
			href: "https://cinemento.vercel.app",
			title: "Cinemento",
			image: "/images/portfolio/cinemento.jpg",
			description: "Cinemento is a movie log",
		},
	],
};
