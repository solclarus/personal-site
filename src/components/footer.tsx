import { config } from "@/config/site";

export function Footer() {
	return (
		<footer className="-translate-x-[50%] relative left-[50%] min-w-dvw border-t border-dashed py-6">
			<div className="flex items-center justify-center text-muted-foreground text-sm">
				<span>
					&copy; {new Date().getFullYear()} {config.author}
				</span>
			</div>
		</footer>
	);
}
