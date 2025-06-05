import type { BaseParticle } from "@lab/vista-voyage/type";

export type SnowParticle = BaseParticle & {
	speedX: number;
	speedY: number;
	wobble: number;
	wobbleSpeed: number;
	rotation: number;
	rotationSpeed: number;
	sway: number; // 揺れの大きさ
	// 風の影響
	windEffect: number;
};
