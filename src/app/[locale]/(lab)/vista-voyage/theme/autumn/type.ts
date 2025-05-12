import type { BaseParticle } from "@vista-voyage/type";

export type AutumnParticle = BaseParticle & {
	speedX: number;
	speedY: number;
	rotation: number;
	rotationSpeed: number;
	color: string;
	wobbleSize: number;
	veinColor: string;
	flutterAmount: number;
	flutterSpeed: number;
	spinDirection: number;
	spinFactor: number;
};
