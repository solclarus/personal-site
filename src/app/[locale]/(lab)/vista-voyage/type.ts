import type {
	AutumnParticle,
	BubbleParticle,
	MatrixParticle,
	RainParticle,
	SakuraParticle,
	SnowParticle,
	SpaceParticle,
} from "@lab/vista-voyage/type";

import type { LucideIcon } from "lucide-react";

export type ThemeType =
	| "rain"
	| "snow"
	| "space"
	| "bubbles"
	| "sakura"
	| "autumn"
	| "matrix";

export type Size = {
	width: number;
	height: number;
};

export type Theme = {
	icon: LucideIcon;
	label: string;
	particleCount: number;
	createParticle: (size: Size) => Particle;
	renderBackground: (ctx: CanvasRenderingContext2D, size: Size) => void;
	renderParticle: (ctx: CanvasRenderingContext2D, p: Particle) => void;
	updateParticle: (
		particle: Particle,
		index: number,
		size: Size,
		particles: Particle[],
		createParticle: () => Particle,
	) => void;
};

export type BaseParticle = {
	x: number;
	y: number;
	size: number;
	opacity: number;
};

export type Particle =
	| AutumnParticle
	| BubbleParticle
	| MatrixParticle
	| RainParticle
	| SakuraParticle
	| SnowParticle
	| SpaceParticle;

export * from "@lab/vista-voyage/theme/autumn/type";
export * from "@lab/vista-voyage/theme/bubble/type";
export * from "@lab/vista-voyage/theme/matrix/type";
export * from "@lab/vista-voyage/theme/rain/type";
export * from "@lab/vista-voyage/theme/sakura/type";
export * from "@lab/vista-voyage/theme/snow/type";
export * from "@lab/vista-voyage/theme/space/type";
