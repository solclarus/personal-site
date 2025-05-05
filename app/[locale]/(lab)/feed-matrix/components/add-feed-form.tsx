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
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { formSchema } from "../schema";
import { useFeedStore } from "../store";
import type { FormValues } from "../type";
import { useFeeds } from "../use-feed";

export function AddFeedForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const { subscribedUrls, addSubscription, setIsLoading } = useFeedStore();
	const { mutate: mutateFeeds, isLoading } = useFeeds(subscribedUrls);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (values: FormValues) => {
		try {
			setIsLoading(true);

			if (subscribedUrls.includes(values.url)) {
				toast.info("このフィードはすでに購読しています");
				return true;
			}

			addSubscription(values.url);
			toast.success("フィードを追加しました");

			await mutateFeeds();

			form.reset();
			setTimeout(() => {
				formRef.current?.querySelector("input")?.focus();
			}, 100);
		} catch (error) {
			const message = error instanceof Error ? error.message : "不明なエラー";
			toast.error(`フィード追加エラー: ${message}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				ref={formRef}
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex gap-2 mb-6"
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
									disabled={isLoading}
									{...field}
									className="w-full"
								/>
							</FormControl>
							<FormMessage className="absolute mt-1 text-xs" />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					size={"icon"}
					disabled={
						isLoading || !form.formState.isValid || form.formState.isSubmitting
					}
				>
					{isLoading ? (
						<RefreshCw className="size-4 animate-spin" />
					) : (
						<PlusCircle className="size-4" />
					)}
				</Button>
			</form>
		</Form>
	);
}
