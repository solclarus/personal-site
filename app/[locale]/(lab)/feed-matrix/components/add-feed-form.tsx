"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { fetchRss } from "../action";
import { formSchema } from "../schema";
import { useFeeds } from "../store";
import type { FormValues } from "../type";

export function AddFeedForm() {
	const { urls, addFeed } = useFeeds();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (values: FormValues) => {
		try {
			await fetchRss(values.url);
			if (urls.includes(values.url)) {
				toast.info("このフィードはすでに追加されています");
				return;
			}
			addFeed(values.url);
			toast.success("フィードを追加しました");
		} catch (error) {
			const message = error instanceof Error ? error.message : "不明なエラー";
			toast.error(`フィード追加エラー: ${message}`);
		} finally {
			form.reset();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-1 gap-2"
			>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem className="flex-1 space-y-0">
							<FormControl>
								<Input
									placeholder="https://example.com/rss"
									type="url"
									disabled={form.formState.isSubmitting}
									{...field}
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					size={"icon"}
					disabled={!form.formState.isValid || form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? (
						<RefreshCw className="size-4 animate-spin" />
					) : (
						<PlusCircle className="size-4" />
					)}
				</Button>
			</form>
		</Form>
	);
}
