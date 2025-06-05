import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [
			remarkGfm,
			[remarkToc, { maxDepth: 2, heading: "Content" }],
		],
		rehypePlugins: [rehypePrettyCode, rehypeSlug],
	},
});

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
