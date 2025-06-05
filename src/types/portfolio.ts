import type { FC } from "react";

export type Metadata = {
	slug: string;
	title: string;
	href: string;
	createdAt: string;
	description: string;
};

export type Portfolio = Metadata & {
	content: FC;
};
