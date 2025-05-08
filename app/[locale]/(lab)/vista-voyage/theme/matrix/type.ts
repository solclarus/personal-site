import type { BaseParticle } from "@vista-voyage/type";

export type MatrixParticle = BaseParticle & {
	speedY: number;
	chars: string[];
	highlightPos: number;
	changeFreq: number;
	glow: boolean;
	fade: number;
};
