"use client";

import { ThemeSwitcher } from "@lab/vista-voyage/components/theme-switcher";
import type { Size, ThemeType } from "@lab/vista-voyage/type";
import { useAnimation } from "@lab/vista-voyage/use-animation";
import { useEffect, useRef, useState } from "react";

const AnimatedBackground = () => {
	const [themeType, setThemeType] = useState<ThemeType>("rain");
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [size, setSize] = useState<Size>({
		width: 0,
		height: 0,
	});

	useAnimation(canvasRef, themeType, size);

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div
			className="relative h-screen w-full overflow-hidden"
			aria-live="polite"
		>
			<div className="absolute inset-0">
				<canvas
					ref={canvasRef}
					className="absolute top-0 left-0 h-full w-full"
				/>
			</div>

			<div className="absolute inset-0 flex items-center justify-center">
				<div className="flex h-4/5 w-4/5 max-w-xl flex-col items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-black/30 p-6 shadow-lg backdrop-blur-none">
					<ThemeSwitcher themeType={themeType} setThemeType={setThemeType} />
				</div>
			</div>
		</div>
	);
};

export default AnimatedBackground;
