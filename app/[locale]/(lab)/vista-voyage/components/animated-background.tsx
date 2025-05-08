"use client";

import { ThemeSwitcher } from "@vista-voyage/components/theme-switcher";
import type { Size, ThemeType } from "@vista-voyage/type";
import { useAnimation } from "@vista-voyage/use-animation";
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
					className="absolute top-0 left-0 w-full h-full"
				/>
			</div>

			<div className="absolute inset-0 flex items-center justify-center">
				<div className="max-w-xl w-4/5 h-4/5 bg-white/10 backdrop-blur-none rounded-xl border border-white/20 shadow-lg p-6 overflow-hidden flex flex-col items-center justify-center">
					<ThemeSwitcher themeType={themeType} setThemeType={setThemeType} />
				</div>
			</div>
		</div>
	);
};

export default AnimatedBackground;
