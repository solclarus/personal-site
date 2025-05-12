"use server";

import { apiResponseSchema, feedSchema } from "@feed-matrix/schema";
import type { ApiResponse, Feed, FeedItem } from "@feed-matrix/type";
import { XMLParser } from "fast-xml-parser";
import { revalidateTag } from "next/cache";
import { z } from "zod";

// より厳密なXMLノードの型定義
type XMLTextNode = { "#text": string };
type XMLObjectNode = Record<string, unknown>;
type XMLNode = string | XMLTextNode | XMLObjectNode | null | undefined;

// より厳密なリンクノードの型定義
type XMLLinkAttribute = { "@_href": string };
type XMLLinkObject = XMLLinkAttribute | Record<string, unknown>;
type LinkNode =
	| string
	| XMLLinkObject
	| Array<string | XMLLinkObject>
	| null
	| undefined;

// RSSアイテム型
interface RssItem {
	title?: XMLNode;
	link?: LinkNode;
	description?: XMLNode;
	content?: XMLNode;
	date?: string;
	pubDate?: string;
}

// Atomエントリー型
interface AtomEntry {
	title?: XMLNode;
	link?: LinkNode;
	content?: XMLNode;
	summary?: XMLNode;
	published?: string;
	updated?: string;
}

// パース結果の型
interface ParseResult {
	rss?: {
		channel?: {
			title?: XMLNode;
			item?: RssItem[] | RssItem;
		};
	};
	feed?: {
		title?: XMLNode;
		entry?: AtomEntry[] | AtomEntry;
	};
}

/**
 * テキストコンテンツを抽出する
 * @param node XMLノード
 * @returns 抽出されたテキスト
 */
function extractTextContent(node: XMLNode): string {
	if (!node) return "";
	if (typeof node === "string") return node;

	// "#text" プロパティを持つオブジェクトの場合
	const objNode = node as Record<string, unknown>;
	if (objNode["#text"]) return String(objNode["#text"]);

	if (typeof node === "object") {
		try {
			return JSON.stringify(node);
		} catch {
			return "コンテンツを取得できませんでした";
		}
	}

	return String(node);
}

/**
 * リンクを抽出する
 * @param link リンクノード
 * @returns 抽出されたURL
 */
function extractLink(link: LinkNode): string {
	if (!link) return "#";
	if (typeof link === "string") return link;

	// "@_href"属性を持つオブジェクトの場合
	if (typeof link === "object" && !Array.isArray(link) && "@_href" in link) {
		return String(link["@_href"]);
	}

	// 配列の場合は最初の要素をチェック
	if (Array.isArray(link) && link.length > 0) {
		const firstLink = link[0];
		if (typeof firstLink === "string") return firstLink;
		if (typeof firstLink === "object" && firstLink && "@_href" in firstLink) {
			return String(firstLink["@_href"]);
		}
	}

	return "#";
}

/**
 * XMLをパースしてフィード情報を抽出
 * @param xml XMLテキスト
 * @returns パース済みのAPIレスポンス
 */
async function parseRssFeed(xml: string): Promise<ApiResponse> {
	const parser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: "@_",
		textNodeName: "#text",
		isArray: (name) => ["item", "entry"].includes(name), // item と entry は常に配列として扱う
	});

	try {
		// XMLをパース
		const result = parser.parse(xml) as ParseResult;

		// RSS or Atom形式を検出
		const channel = result.rss?.channel || result.feed;

		if (!channel) {
			throw new Error("サポートされていないフィード形式です");
		}

		// フィードタイトルを抽出
		const feedTitle = extractTextContent(channel.title) || "名前のないフィード";

		// フィードアイテムを格納する配列
		const items: FeedItem[] = [];

		// RSSフォーマットの場合
		if ("item" in channel && channel.item) {
			const rssItems = Array.isArray(channel.item)
				? channel.item
				: [channel.item];

			for (const item of rssItems) {
				items.push({
					title: extractTextContent(item.title) || "タイトルなし",
					link: extractLink(item.link),
					description:
						extractTextContent(item.description || item.content) || "",
					pubDate: item.pubDate || item.date || new Date().toISOString(),
				});
			}
		}
		// Atomフォーマットの場合
		else if ("entry" in channel && channel.entry) {
			const atomEntries = Array.isArray(channel.entry)
				? channel.entry
				: [channel.entry];

			for (const entry of atomEntries) {
				items.push({
					title: extractTextContent(entry.title) || "タイトルなし",
					link: extractLink(entry.link),
					description: extractTextContent(entry.content || entry.summary) || "",
					pubDate: entry.published || entry.updated || new Date().toISOString(),
				});
			}
		}

		// zodスキーマによるバリデーション
		const validatedResponse = apiResponseSchema.parse({
			title: feedTitle,
			items: items,
		});

		return validatedResponse;
	} catch (error) {
		console.error("XMLパースエラー:", error);
		throw new Error(
			"フィードの解析に失敗しました。有効なRSS/Atomフィードか確認してください。",
		);
	}
}

/**
 * RSSフィードを取得する
 * @param url フィードのURL
 * @returns 取得したフィード情報
 */
export async function fetchRss(url: string): Promise<Feed> {
	if (!url) {
		throw new Error("URLが指定されていません");
	}

	try {
		// 入力URLをzodで検証
		const validUrl = z.string().url().parse(url);

		// HTTP/HTTPSスキーマ検証
		if (!validUrl.startsWith("http://") && !validUrl.startsWith("https://")) {
			throw new Error("URLはHTTPまたはHTTPSで始まる必要があります");
		}

		// RSS/Atomフィードを取得
		const response = await fetch(validUrl, {
			headers: {
				"User-Agent": "RSS Reader/1.0",
				Accept:
					"application/rss+xml, application/atom+xml, application/xml, text/xml",
			},
			next: {
				tags: [`rss-${validUrl}`], // キャッシュタグ
				revalidate: 300, // 5分キャッシュ
			},
		});

		if (!response.ok) {
			throw new Error(
				`フィードの取得に失敗しました (${response.status}): ${response.statusText}`,
			);
		}

		// コンテンツタイプの確認
		const contentType = response.headers.get("content-type") || "";
		if (
			!contentType.includes("xml") &&
			!contentType.includes("rss") &&
			!contentType.includes("atom") &&
			!contentType.includes("text/plain") &&
			!contentType.includes("application/octet-stream")
		) {
			throw new Error(
				`このURLはRSSフィードではないようです (Content-Type: ${contentType})`,
			);
		}

		// XMLテキストを取得
		const xml = await response.text();

		// XMLパース前に空文字チェック
		if (!xml.trim()) {
			throw new Error("空のレスポンスを受信しました");
		}

		// XMLをパースしてフィード情報を取得
		const result = await parseRssFeed(xml);

		// フィードデータをzodで検証
		const validatedFeed = feedSchema.parse({
			url: validUrl,
			title: result.title,
			items: result.items,
		});

		return validatedFeed;
	} catch (error) {
		console.error(`RSS取得エラー (${url})`);

		// より詳細なエラーメッセージ
		if (error instanceof z.ZodError) {
			throw new Error(`URLの形式が無効です: ${error.errors[0]?.message || ""}`);
		}

		if (error instanceof Error) {
			throw error;
		}

		throw new Error("フィードの取得中に予期しないエラーが発生しました");
	}
}

/**
 * フィードの再検証をトリガーする
 * @param url フィードのURL
 */
export async function refreshFeed(url: string): Promise<void> {
	if (!url) {
		throw new Error("再検証するURLが指定されていません");
	}

	try {
		// URLの形式を検証
		const validUrl = z.string().url().parse(url);

		// 特定のフィードのキャッシュを再検証
		revalidateTag(`rss-${validUrl}`);
	} catch (error) {
		console.error("フィード更新エラー:", error);

		if (error instanceof z.ZodError) {
			throw new Error(`無効なURL形式です: ${error.errors[0]?.message || ""}`);
		}
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("フィードの更新中にエラーが発生しました");
	}
}
