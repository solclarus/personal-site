import type { NavItem } from "@/types/navigation";
import { BookIcon, FlaskConicalIcon, HomeIcon, RocketIcon } from "lucide-react";

export const NAVIGATIONS: NavItem[] = [
	{
		id: "home",
		label: "Home",
		icon: HomeIcon,
		href: "/",
	},
	{
		id: "blog",
		label: "Blog",
		icon: BookIcon,
		href: "/blog",
	},
	{
		id: "lab",
		label: "Lab",
		icon: FlaskConicalIcon,
		href: "/lab",
	},
	{
		id: "portfolio",
		label: "Portfolio",
		icon: RocketIcon,
		href: "/portfolio",
	},
];
