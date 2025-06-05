import type { BaseParticle } from "@lab/vista-voyage/type";

export type RainParticle = BaseParticle & {
	// 既存のプロパティ
	speedY: number; // Y方向の速度
	speedX: number; // X方向の速度

	// 新規追加プロパティ
	length: number; // 雨滴の長さ
	brightness: number; // 雨滴の明るさ（光の反射効果用）
	intensity: number; // 雨の強さのファクター（0-1）
};
