import type { BaseParticle } from "@lab/vista-voyage/type";

export type SakuraParticle = BaseParticle & {
	speedX: number;
	speedY: number;
	rotation: number;
	rotationSpeed: number;
	flutterAmount: number;
	flutterSpeed: number;
	color: string;
};
