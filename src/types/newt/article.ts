import type { Author, Tag } from "@/types/newt";
import type { Content } from "newt-client-js";

export type Article = {
	title: string;
	slug: string;
	body: string;
	author: Author;
	tags: Tag[];
} & Content;
