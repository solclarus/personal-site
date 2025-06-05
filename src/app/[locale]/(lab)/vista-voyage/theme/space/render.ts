import type { Size, SpaceParticle } from "@lab/vista-voyage/type";

// 流れ星の出現を制御するためのグローバル状態
let lastShootingStarTime = 0;
const SHOOTING_STAR_INTERVAL = 2000; // ミリ秒単位でランダムな流れ星の間隔

// 流れ星専用の作成関数
const createShootingStarParticle = (size: Size): SpaceParticle => {
	// 画面外から流れ星が開始するように
	const startFromSide = Math.random() > 0.5;
	let x = 0;
	let y = 0;

	if (startFromSide) {
		// 左右の画面外から
		x = Math.random() > 0.5 ? -10 : size.width + 10;
		y = Math.random() * size.height * 0.7; // 上部70%から開始
	} else {
		// 上部の画面外から
		x = Math.random() * size.width;
		y = -10;
	}

	// 画面の中心方向に向かう速度
	const targetX = size.width * (0.3 + Math.random() * 0.4);
	const targetY = size.height * (0.3 + Math.random() * 0.4);

	const deltaX = targetX - x;
	const deltaY = targetY - y;
	const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

	// 速度を正規化し、希望の速さにスケール
	const speed = Math.random() * 5 + 15;
	const speedX = (deltaX / distance) * speed;
	const speedY = (deltaY / distance) * speed;
	return {
		x: x,
		y: y,
		size: Math.random() * 1 + 1,
		color: "rgba(255, 255, 255, 1)",
		opacity: 1,
		twinkleSpeed: 0,
		twinkleDirection: 0,
		currentOpacity: 1,
		type: "shooting",
		speedX: speedX,
		speedY: speedY,
		trail: Math.random() * 10 + 15,
		life: 1,
		decay: Math.random() * 0.01 + 0.005, // 寿命をより長く
		creationTime: Date.now(), // 作成時間を記録
	};
};

export const createSpaceParticle = (size: Size): SpaceParticle => {
	const now = Date.now();

	// 流れ星の出現確率を時間経過とともに調整
	const canCreateShootingStar =
		now - lastShootingStarTime > SHOOTING_STAR_INTERVAL;
	const createShootingStar = canCreateShootingStar && Math.random() > 0.98; // 2%の確率

	if (createShootingStar) {
		lastShootingStarTime = now;
		return createShootingStarParticle(size);
	}
	// パーティクルのタイプを決定（星、惑星、流れ星）
	const typeRoll = Math.random();
	const particleType = typeRoll > 0.99 ? "shooting" : "star"; // 98% の確率で星

	// タイプに応じたサイズ
	let particleSize = 0;
	if (particleType === "star") {
		particleSize = Math.random() * 1.5 + 0.5;
	} else {
		// shooting
		particleSize = Math.random() * 1 + 1;
	}

	// 星の色（青、白、黄、オレンジ、赤）
	let particleColor = "";
	if (particleType === "star") {
		const colorRoll = Math.random();
		if (colorRoll > 0.8) {
			// 青っぽい星
			particleColor = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, 1)`;
		} else if (colorRoll > 0.6) {
			// 赤っぽい星
			particleColor = `rgba(255, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 50 + 50)}, 1)`;
		} else if (colorRoll > 0.4) {
			// 黄色っぽい星
			particleColor = `rgba(255, ${Math.floor(Math.random() * 30 + 225)}, ${Math.floor(Math.random() * 100 + 100)}, 1)`;
		} else {
			// 白い星
			particleColor = "rgba(255, 255, 255, 1)";
		}
	} else {
		// shooting
		// 流れ星は白っぽい
		particleColor = "rgba(255, 255, 255, 1)";
	}

	// 共通プロパティ
	const baseParticle: SpaceParticle = {
		x: Math.random() * size.width,
		y: Math.random() * size.height,
		size: particleSize,
		color: particleColor,
		opacity: Math.random() * 0.8 + 0.2,
		twinkleSpeed: Math.random() * 0.03 + 0.01,
		twinkleDirection: 1,
		currentOpacity: Math.random() * 0.8 + 0.2,
		type: particleType,
	};

	// パーティクルタイプ別の追加プロパティ
	if (particleType === "shooting") {
		return {
			...baseParticle,
			speedX: (Math.random() * 5 + 10) * (Math.random() > 0.5 ? 1 : -1),
			speedY: (Math.random() * 5 + 10) * (Math.random() > 0.5 ? 1 : -1),
			trail: Math.random() * 10 + 10,
			life: 1,
			decay: Math.random() * 0.02 + 0.01,
		};
	}
	// star
	return {
		...baseParticle,
		flare: Math.random() > 0.9, // 10%の確率で閃光あり
		flareSize: Math.random() * 1 + 1,
		flareAngle: Math.random() * Math.PI * 2,
		flareSpeed: Math.random() * 0.1 + 0.05,
	};
};

export const renderSpaceParticle = (
	ctx: CanvasRenderingContext2D,
	p: SpaceParticle,
): void => {
	if (p.type === "star") {
		// 星の基本描画
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
		const color = p.color.replace("1)", `${p.currentOpacity})`);
		ctx.fillStyle = color;
		ctx.fill();

		// 大きな星にはグロー効果
		if (p.size > 1.2) {
			const currentCompositeOperation = ctx.globalCompositeOperation;
			ctx.globalCompositeOperation = "lighter";

			const baseColor = p.color.replace("rgba(", "").replace("1)", "");
			ctx.fillStyle = `rgba(${baseColor}${p.currentOpacity * 0.3})`;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
			ctx.fill();

			ctx.globalCompositeOperation = currentCompositeOperation;
		}

		// フレア（閃光）効果
		if (
			p.flare &&
			p.flareAngle !== undefined &&
			p.flareSize !== undefined &&
			p.flareSpeed !== undefined
		) {
			const currentCompositeOperation = ctx.globalCompositeOperation;
			ctx.globalCompositeOperation = "lighter";

			// 放射状の線
			const rays = 4;
			ctx.strokeStyle = `rgba(255, 255, 255, ${p.currentOpacity * 0.6})`;
			ctx.lineWidth = p.size / 4;

			for (let i = 0; i < rays; i++) {
				const angle = p.flareAngle + ((Math.PI * 2) / rays) * i;
				const length = p.flareSize * (1 + Math.sin(p.flareAngle * 2) * 0.3);

				ctx.beginPath();
				ctx.moveTo(p.x, p.y);
				ctx.lineTo(
					p.x + Math.cos(angle) * length * p.size * 2,
					p.y + Math.sin(angle) * length * p.size * 2,
				);
				ctx.stroke();
			}

			ctx.globalCompositeOperation = currentCompositeOperation;
		}
	} else if (
		p.type === "shooting" &&
		p.speedX !== undefined &&
		p.speedY !== undefined &&
		p.trail !== undefined &&
		p.life !== undefined
	) {
		// 流れ星の尾を描画
		const currentCompositeOperation = ctx.globalCompositeOperation;
		ctx.globalCompositeOperation = "lighter";

		// 尾の描画
		ctx.beginPath();
		ctx.moveTo(p.x, p.y);
		ctx.lineTo(
			p.x - (p.speedX * p.trail) / 10,
			p.y - (p.speedY * p.trail) / 10,
		);
		ctx.strokeStyle = `rgba(255, 255, 255, ${p.life * 0.7})`;
		ctx.lineWidth = p.size;
		ctx.stroke();

		// 流れ星の先端
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
		ctx.fill();

		ctx.globalCompositeOperation = currentCompositeOperation;
	}
};

export const updateSpaceParticle = (
	p: SpaceParticle,
	index: number,
	size: Size,
	particles: SpaceParticle[],
	createParticle: () => SpaceParticle,
): void => {
	if (p.type === "star") {
		// 星のきらめき
		p.currentOpacity += p.twinkleSpeed * p.twinkleDirection;

		if (p.currentOpacity > 1) {
			p.currentOpacity = 1;
			p.twinkleDirection = -1;
		} else if (p.currentOpacity < 0.2) {
			p.currentOpacity = 0.2;
			p.twinkleDirection = 1;
		}

		// フレアの回転（ある場合）
		if (p.flare && p.flareAngle !== undefined && p.flareSpeed !== undefined) {
			p.flareAngle += p.flareSpeed;
		}
		const now = Date.now();
		if (
			now - lastShootingStarTime > SHOOTING_STAR_INTERVAL &&
			Math.random() > 0.9997
		) {
			particles[index] = createShootingStarParticle(size);
			lastShootingStarTime = now;
		}
	} else if (
		p.type === "shooting" &&
		p.speedX !== undefined &&
		p.speedY !== undefined &&
		p.trail !== undefined &&
		p.life !== undefined &&
		p.decay !== undefined
	) {
		// 流れ星の移動
		p.x += p.speedX;
		p.y += p.speedY;

		// 寿命を減らす
		p.life -= p.decay;

		// 画面外に出るか寿命が尽きたら新しい粒子を作成
		if (
			p.x < -p.trail ||
			p.x > size.width + p.trail ||
			p.y < -p.trail ||
			p.y > size.height + p.trail ||
			p.life <= 0
		) {
			particles[index] = createParticle();
		}
	}
};

export const renderSpaceBackground = (
	ctx: CanvasRenderingContext2D,
	size: Size,
): void => {
	// 宇宙の背景グラデーション
	const bgGradient = ctx.createLinearGradient(0, 0, 0, size.height);
	bgGradient.addColorStop(0, "#090222");
	bgGradient.addColorStop(0.5, "#220022");
	bgGradient.addColorStop(1, "#100030");

	ctx.fillStyle = bgGradient;
	ctx.fillRect(0, 0, size.width, size.height);

	// 中心の明るい部分（銀河核など）
	const centralGlow = ctx.createRadialGradient(
		size.width / 2,
		size.height / 2,
		0,
		size.width / 2,
		size.height / 2,
		size.width / 1.5,
	);
	centralGlow.addColorStop(0, "rgba(40, 40, 80, 0.2)");
	centralGlow.addColorStop(0.5, "rgba(30, 30, 60, 0.1)");
	centralGlow.addColorStop(1, "rgba(0, 0, 20, 0)");

	ctx.fillStyle = centralGlow;
	ctx.fillRect(0, 0, size.width, size.height);

	// 星雲の表現
	const currentCompositeOperation = ctx.globalCompositeOperation;
	ctx.globalCompositeOperation = "lighter";

	// 星雲を描画
	const nebulaCenterX = size.width * 0.7;
	const nebulaCenterY = size.height * 0.3;
	const nebulaRadius = size.width * 0.25;

	const nebulaGlow = ctx.createRadialGradient(
		nebulaCenterX,
		nebulaCenterY,
		0,
		nebulaCenterX,
		nebulaCenterY,
		nebulaRadius,
	);

	nebulaGlow.addColorStop(0, "rgba(50, 10, 80, 0.05)");
	nebulaGlow.addColorStop(0.5, "rgba(30, 20, 100, 0.03)");
	nebulaGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

	ctx.fillStyle = nebulaGlow;
	ctx.beginPath();
	ctx.ellipse(
		nebulaCenterX,
		nebulaCenterY,
		nebulaRadius,
		nebulaRadius * 0.6,
		Math.PI / 4,
		0,
		Math.PI * 2,
	);
	ctx.fill();

	// 光の帯（銀河の腕）
	const bandGradient = ctx.createLinearGradient(0, size.height, size.width, 0);
	bandGradient.addColorStop(0, "rgba(50, 50, 100, 0)");
	bandGradient.addColorStop(0.5, "rgba(70, 70, 120, 0.03)");
	bandGradient.addColorStop(1, "rgba(50, 50, 100, 0)");

	ctx.fillStyle = bandGradient;
	ctx.beginPath();

	// 曲線で光の帯を描く
	ctx.moveTo(0, size.height);
	ctx.quadraticCurveTo(size.width / 2, size.height / 2, size.width, 0);

	// 光の帯の幅
	ctx.lineWidth = size.width * 0.2;
	ctx.strokeStyle = bandGradient;
	ctx.stroke();

	ctx.globalCompositeOperation = currentCompositeOperation;
};
