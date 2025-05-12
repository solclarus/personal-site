import { getLocale } from "next-intl/server";

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function PortfolioDetail({ params }: Props) {
	const { slug } = await params;
	const locale = await getLocale();
	console.log(slug, locale);
	const { default: Post } = await import(`@/contents/${slug}/${locale}.mdx`);

	return <Post />;
}
