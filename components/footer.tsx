import { appConfig } from "@/config/app";

export function Footer() {
	return (
		<footer className="py-6 border-t border-dashed relative min-w-dvw left-[50%] -translate-x-[50%]">
			<div className="flex items-center justify-center text-muted-foreground text-sm">
				<span>
					&copy; {new Date().getFullYear()} {appConfig.author}
				</span>
			</div>
		</footer>
	);
}
