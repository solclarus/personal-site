import type { BaseParticle } from "@vista-voyage/type";

export type SpaceParticle = BaseParticle & {
	color: string;
	twinkleSpeed: number;
	twinkleDirection: number;
	currentOpacity: number;
	type: "star" | "shooting";

	// 星タイプの追加プロパティ
	flare?: boolean;
	flareSize?: number;
	flareAngle?: number;
	flareSpeed?: number;

	// 流れ星タイプの追加プロパティ
	speedX?: number;
	speedY?: number;
	trail?: number;
	life?: number;
	decay?: number;

	creationTime?: number; // 作成時間を記録
};
