import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import type { Article } from "@/types/newt/article";
import { useFormatter } from "next-intl";

export const BlogItem = ({ article }: { article: Article }) => {
	const format = useFormatter();
	const date = new Date(article._sys.createdAt);

	return (
		<section>
			<hr className="border-t border-dashed relative min-w-dvw left-[50%] -translate-x-[50%] my-6" />
			<h2 className="text-lg font-bold truncate">
				<Link href={`/blog/${article.slug}`}>{article.title}</Link>
			</h2>
			<time className="text-sm text-muted-foreground">
				{format.dateTime(date, {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</time>
			<div className="space-x-1">
				{article.tags.map((tag) => {
					return <Badge key={tag._id}>{tag.name}</Badge>;
				})}
			</div>
		</section>
	);
};
