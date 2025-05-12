import type { Content } from "newt-client-js";

export type Author = {
	fullName: string;
	slug: string;
	biography: string;
} & Content;
