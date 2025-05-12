import type { BaseParticle } from "@vista-voyage/type";

export type BubbleParticle = BaseParticle & {
	speedY: number;
	wobbleSpeed: number;
	wobble: number;
	color: string;
	// 新規追加プロパティ
	highlightOffsetX: number; // ハイライトのX位置のオフセット
	highlightOffsetY: number; // ハイライトのY位置のオフセット
	pulseSpeed: number; // 泡の脈動速度
	pulsePhase: number; // 脈動のフェーズ（現在の状態）
	pulseAmount: number; // 脈動の大きさ
	reflectionStrength: number; // 光の反射の強さ
	filmThickness: number; // 泡膜の厚さ（色合いに影響）
	willPop: boolean; // 泡が破裂するかどうか
	groupId: number; // 泡のグループID（集団行動用）
	groupAttraction: number; // グループ内での引力の強さ
};
