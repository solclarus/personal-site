import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Home() {
	const t = await getTranslations("HomePage");
	const locale = await getLocale();

	return (
		<main>
			<h1>{t("title")}</h1>
			<p>{locale}</p>
			<ThemeSwitcher />
		</main>
	);
}
