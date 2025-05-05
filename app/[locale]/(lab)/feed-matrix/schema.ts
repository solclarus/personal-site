import { z } from "zod";

// フォーム入力値の検証スキーマ
export const formSchema = z.object({
	url: z
		.string()
		.trim()
		.min(1, { message: "URLを入力してください" })
		.url({ message: "有効なURLを入力してください" })
		.refine(
			(url) => {
				try {
					new URL(url);
					return true;
				} catch {
					return false;
				}
			},
			{ message: "正しいURL形式で入力してください" },
		),
});

// フィードアイテムのZodスキーマ
export const feedItemSchema = z.object({
	title: z.string().default("タイトルなし"),
	link: z.string().default("#"),
	description: z.string().default(""),
	pubDate: z.string().default(() => new Date().toISOString()),
});

// APIレスポンスのZodスキーマ
export const apiResponseSchema = z.object({
	title: z.string().default("名前のないフィード"),
	items: z.array(feedItemSchema),
});

// フィードのZodスキーマ
export const feedSchema = z.object({
	url: z.string().url(),
	title: z.string(),
	items: z.array(feedItemSchema),
});

// エラーレスポンスのZodスキーマ
export const errorResponseSchema = z.object({
	error: z.string(),
});
