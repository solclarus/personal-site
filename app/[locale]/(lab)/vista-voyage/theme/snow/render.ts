import type { Size, SnowParticle } from "@vista-voyage/type";

export const createSnowParticle = (size: Size): SnowParticle => {
	// サイズのバリエーションを増やす（特に結晶形は大きめに）
	const baseSize = Math.random() * 2 + 1.5; // 雪粒は小さめ

	// 雪が落ちる速度（サイズに依存）
	const fallSpeed = Math.random() * 1 + 0.5 + (baseSize > 4 ? 0.2 : 0);

	return {
		x: Math.random() * size.width,
		y: Math.random() * size.height - size.height,
		size: baseSize,
		speedY: fallSpeed,
		speedX: Math.random() * 2 - 1,
		opacity: Math.random() * 0.4 + 0.6,
		wobble: Math.random() * Math.PI * 2,
		wobbleSpeed: Math.random() * 0.02 + 0.01,
		rotation: Math.random() * Math.PI * 2,
		rotationSpeed: Math.random() * 0.01 * (Math.random() > 0.5 ? 1 : -1),
		sway: Math.random() * 0.5 + 0.5, // 揺れの大きさ
		// 風の影響
		windEffect: Math.random() * 0.3 + 0.7,
	};
};

export const renderSnowParticle = (
	ctx: CanvasRenderingContext2D,
	p: SnowParticle,
): void => {
	// 揺れを適用した位置
	const xPos = p.x + Math.sin(p.wobble) * p.sway * 2;

	// 雪粒（丸形）の場合
	ctx.beginPath();
	ctx.arc(xPos, p.y, p.size, 0, Math.PI * 2);

	// より自然な雪の色（わずかに青みがかった白）
	ctx.fillStyle = `rgba(240, 248, 255, ${p.opacity})`;
	ctx.fill();

	// オプション：輝きを追加
	if (p.size > 2.5) {
		const glow = ctx.createRadialGradient(
			xPos,
			p.y,
			0,
			xPos,
			p.y,
			p.size * 1.5,
		);
		glow.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.3})`);
		glow.addColorStop(1, "rgba(255, 255, 255, 0)");

		ctx.globalCompositeOperation = "lighter";
		ctx.fillStyle = glow;
		ctx.beginPath();
		ctx.arc(xPos, p.y, p.size * 1.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalCompositeOperation = "source-over";
	}
};

export const updateSnowParticle = (
	p: SnowParticle,
	index: number,
	size: Size,
	particles: SnowParticle[],
	createParticle: () => SnowParticle,
): void => {
	// 基本的な落下
	p.y += p.speedY;

	// より複雑な水平方向の動き（風の効果）
	const windStrength = Math.sin(p.y * 0.01) * 0.3;
	p.x += Math.sin(p.wobble) * p.sway + windStrength * p.windEffect;
	p.wobble += p.wobbleSpeed;

	// 画面外に出たら再生成
	if (p.y > size.height) {
		particles[index] = createParticle();
	}
};

export const renderSnowBackground = (
	ctx: CanvasRenderingContext2D,
	size: Size,
): void => {
	const gradient = ctx.createLinearGradient(0, 0, 0, size.height);
	gradient.addColorStop(0, "#8DA3CF"); // 上部：明るめの青灰色（冬の空）
	gradient.addColorStop(1, "#6D7B93"); // 中部：標準的な青灰色
	// gradient.addColorStop(1, "#E0E8F5"); // 下部：明るい色（積雪の反射光）

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size.width, size.height);

	ctx.lineTo(size.width, size.height);
	ctx.lineTo(0, size.height);
	ctx.closePath();
	ctx.fill();
};
