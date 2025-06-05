"use client";

import type React from "react";

import { THEMES } from "@lab/vista-voyage/config";
import type { Size, ThemeType } from "@lab/vista-voyage/type";
import type { Particle } from "@lab/vista-voyage/type";
import { useEffect, useRef, useState } from "react";

export function useAnimation(
	canvasRef: React.RefObject<HTMLCanvasElement | null>,
	themeType: ThemeType,
	size: Size,
) {
	const animationRef = useRef<number | null>(null);
	const particlesRef = useRef<Particle[]>([]);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		if (!canvasRef.current || !size.width || !size.height) return;

		// Cancel any existing animation
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
		}

		// Set canvas size
		const canvas = canvasRef.current;
		canvas.width = size.width;
		canvas.height = size.height;

		// Create particles
		const particleCount = THEMES[themeType].particleCount;
		particlesRef.current = Array.from({ length: particleCount }, () =>
			THEMES[themeType].createParticle(size),
		);

		setIsInitialized(true);

		animate();

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [themeType, size, canvasRef]);

	// Animation loop
	const animate = () => {
		if (!canvasRef.current || !isInitialized) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, size.width, size.height);
		THEMES[themeType].renderBackground(ctx, size);
		particlesRef.current.forEach((particle, index) => {
			THEMES[themeType].renderParticle(ctx, particle);
			THEMES[themeType].updateParticle(
				particle,
				index,
				size,
				particlesRef.current,
				() => THEMES[themeType].createParticle(size),
			);
		});

		animationRef.current = requestAnimationFrame(animate);
	};

	return {
		particlesRef,
	};
}
