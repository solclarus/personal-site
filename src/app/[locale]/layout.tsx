import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { config } from "@/config/site";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: config.title,
	description: config.description,
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html
			className={cn(GeistSans.variable, GeistMono.variable)}
			lang={locale}
			suppressHydrationWarning
		>
			<head />
			<body>
				<NextIntlClientProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
