import type { RainParticle, Size } from "@lab/vista-voyage/type";

export const createRainParticle = (size: Size): RainParticle => {
	// 雨の強さを場所によって変えるためのファクター
	const intensityFactor = Math.random();

	// 雨滴の長さを強さに応じて変化
	const dropLength = Math.random() * 10 + (intensityFactor > 0.7 ? 15 : 5);

	// 雨滴の速さも強さに応じて変化
	const speed = Math.random() * 10 + 15 + (intensityFactor > 0.7 ? 5 : 0);

	return {
		x: Math.random() * size.width,
		y: Math.random() * size.height - size.height,
		size: Math.random() * 1 + 0.8,
		speedY: speed, // 水しぶきは上に跳ねる
		speedX: -speed * 0.1, // 雨は斜めに、しぶきはランダム
		opacity: Math.random() * 0.3 + 0.3,
		length: dropLength,
		// 雨粒の明るさ（雷や街灯の光の反射用）
		brightness: Math.random() * 0.5 + 0.5,
		// 雨の強さのファクター
		intensity: intensityFactor,
	};
};

export const renderRainParticle = (
	ctx: CanvasRenderingContext2D,
	p: RainParticle,
): void => {
	// 雨滴の場合
	// 雨がより明るく見える効果（光の反射）
	const glowEffect = p.brightness > 0.8 && p.intensity > 0.7;

	// 雨の傾きを速度から計算

	ctx.save();
	ctx.translate(p.x, p.y);

	// グラデーションで雨滴の先端を細くする
	const gradient = ctx.createLinearGradient(0, 0, 0, p.length);
	gradient.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.5})`);
	gradient.addColorStop(0.3, `rgba(255, 255, 255, ${p.opacity})`);
	gradient.addColorStop(1, `rgba(200, 220, 255, ${p.opacity * 0.7})`);

	ctx.fillStyle = gradient;

	// 雨滴の形状（先端を細く）
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(p.size / 2, 0);
	ctx.lineTo(p.size / 4, p.length);
	ctx.lineTo(-p.size / 4, p.length);
	ctx.lineTo(-p.size / 2, 0);
	ctx.closePath();
	ctx.fill();

	// 明るい雨滴には光彩効果を追加
	if (glowEffect) {
		ctx.globalCompositeOperation = "lighter";
		ctx.fillStyle = `rgba(200, 230, 255, ${p.opacity * 0.4})`;
		ctx.beginPath();
		ctx.ellipse(0, p.length / 2, p.size * 1.5, p.length / 2, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalCompositeOperation = "source-over";
	}

	ctx.restore();
};

export const updateRainParticle = (
	p: RainParticle,
	index: number,
	size: Size,
	particles: RainParticle[],
	createParticle: () => RainParticle,
): void => {
	// 位置の更新
	p.y += p.speedY;
	p.x += p.speedX;

	// 	// 画面外に出たら再生成
	if (p.x < -20 || p.x > size.width + 20 || p.y < -20 || p.y > size.height) {
		particles[index] = createParticle();
	}
};

export const renderRainBackground = (
	ctx: CanvasRenderingContext2D,
	size: Size,
): void => {
	// 雨の日の暗い都市の背景
	const gradient = ctx.createLinearGradient(0, 0, 0, size.height);
	gradient.addColorStop(0, "#1A1E2E"); // 上部：より暗い色
	gradient.addColorStop(0.5, "#1E213A"); // 中部：標準色
	gradient.addColorStop(1, "#141822"); // 下部：濃い色

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size.width, size.height);
};
