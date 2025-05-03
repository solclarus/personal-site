import { BlogItem } from "@/components/blog-item";
import { getArticles } from "@/lib/newt";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Newt・Next.jsブログ",
	description: "NewtとNext.jsを利用したブログです",
};

export default async function Blog() {
	const articles = await getArticles();

	return (
		<main>
			<ul>
				{articles.map((article) => {
					return <BlogItem key={article._id} article={article} />;
				})}
			</ul>
		</main>
	);
}
