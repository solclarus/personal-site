import { getArticleBySlug, getArticles } from "@/lib/newt";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
	const articles = await getArticles();
	return articles.map((article) => ({
		slug: article.slug,
	}));
}
export const dynamicParams = false;

export async function generateMetadata({
	params,
}: {
	params: Params;
}): Promise<Metadata> {
	const { slug } = await params;
	const article = await getArticleBySlug(slug);

	return {
		title: article?.title,
		description: "投稿詳細ページです",
	};
}

export default async function Article({ params }: { params: Params }) {
	const { slug } = await params;
	const article = await getArticleBySlug(slug);
	if (!article) return;

	return (
		<main>
			<h1>{article.title}</h1>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
			<div dangerouslySetInnerHTML={{ __html: article.body }} />
		</main>
	);
}
