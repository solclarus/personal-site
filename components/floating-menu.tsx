import { FloatingMenuItem } from "@/components/floating-menu-item";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { OnlyUp } from "@/components/only-up";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Separator } from "@/components/ui/separator";
import { FlaskConical, Home, Rocket } from "lucide-react";

export function FloatingMenu() {
	return (
		<nav className="fixed bottom-16 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border bg-card p-2 shadow-lg md:bottom-20">
			<FloatingMenuItem href={"/"} icon={<Home />} />
			<FloatingMenuItem href={"/portfolio"} icon={<Rocket />} />
			<FloatingMenuItem href={"/lab"} icon={<FlaskConical />} />
			<Separator orientation="vertical" className="mx-1 h-5 w-px self-center" />
			<ThemeSwitcher />
			<LocaleSwitcher />
			<OnlyUp />
		</nav>
	);
}
