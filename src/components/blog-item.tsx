import { Link } from "@/i18n/navigation";
import type { Article } from "@/types/newt";
import { Badge } from "@ui/badge";
import { useFormatter } from "next-intl";

export const BlogItem = ({ article }: { article: Article }) => {
	const format = useFormatter();
	const date = new Date(article._sys.createdAt);

	return (
		<section>
			<hr className="-translate-x-[50%] relative left-[50%] my-6 min-w-dvw border-t border-dashed" />
			<h2 className="truncate font-bold text-lg">
				<Link href={`/blog/${article.slug}`}>{article.title}</Link>
			</h2>
			<time className="text-muted-foreground text-sm">
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
