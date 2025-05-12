import type { AutumnParticle, Size } from "@vista-voyage/type";

export const createAutumnParticle = (size: Size): AutumnParticle => {
	// 様々な紅葉の色を定義 - より多くのバリエーションを追加
	const leafColors = [
		// 赤系
		`rgba(${Math.floor(Math.random() * 20 + 200)}, ${Math.floor(Math.random() * 20 + 40)}, ${Math.floor(Math.random() * 20)}, 0.85)`,
		// 橙系
		`rgba(${Math.floor(Math.random() * 20 + 220)}, ${Math.floor(Math.random() * 20 + 100)}, ${Math.floor(Math.random() * 20)}, 0.85)`,
		// 茶系
		`rgba(${Math.floor(Math.random() * 20 + 160)}, ${Math.floor(Math.random() * 20 + 80)}, ${Math.floor(Math.random() * 20 + 10)}, 0.85)`,
		// 黄系
		`rgba(${Math.floor(Math.random() * 20 + 220)}, ${Math.floor(Math.random() * 20 + 180)}, ${Math.floor(Math.random() * 30 + 20)}, 0.85)`,
	];

	// 葉の大きさにバリエーションを持たせる
	const baseSize = Math.random() * 7 + 5;

	return {
		x: Math.random() * size.width,
		y: -Math.random() * 100,
		size: baseSize,
		opacity: Math.random() * 0.6 + 0.4,
		speedY: Math.random() * 1 + 1,
		speedX: Math.random() * 4 - 2,
		rotation: Math.random() * Math.PI * 2,
		rotationSpeed:
			(Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
		color: leafColors[Math.floor(Math.random() * leafColors.length)],
		wobbleSize: Math.random() * 30 + 20,
		// 葉の質感表現のための追加パラメータ
		veinColor: `rgba(${Math.floor(Math.random() * 30 + 100)}, ${Math.floor(Math.random() * 30 + 50)}, ${Math.floor(Math.random() * 20)}, 0.6)`,
		// 葉の動きを自然にするためのパラメータ
		flutterSpeed: Math.random() * 0.02 + 0.01,
		flutterAmount: Math.random() * 1.5 + 0.5,
		// 落下時の回転を調整するパラメータ
		spinDirection: Math.random() > 0.5 ? 1 : -1,
		spinFactor: Math.random() * 0.02 + 0.01,
	};
};

export const renderAutumnParticle = (
	ctx: CanvasRenderingContext2D,
	p: AutumnParticle,
): void => {
	ctx.save();
	ctx.translate(p.x, p.y);
	ctx.rotate(p.rotation);

	renderMapleLeaf(ctx, p);

	ctx.restore();
};

// モミジの葉を描画
const renderMapleLeaf = (
	ctx: CanvasRenderingContext2D,
	p: AutumnParticle,
): void => {
	const size = p.size;

	// グラデーションを作成して立体感を出す
	const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
	const baseColor = p.color.replace("rgba(", "").replace(")", "").split(",");
	const r = Number.parseInt(baseColor[0]);
	const g = Number.parseInt(baseColor[1]);
	const b = Number.parseInt(baseColor[2]);
	const a = Number.parseFloat(baseColor[3]);

	gradient.addColorStop(0, `rgba(${r + 20}, ${g + 10}, ${b}, ${a})`);
	gradient.addColorStop(0.8, p.color);
	gradient.addColorStop(
		1,
		`rgba(${Math.max(0, r - 20)}, ${Math.max(0, g - 10)}, ${b}, ${a})`,
	);

	// モミジの葉の形状
	ctx.beginPath();

	// 中央の点から始める
	ctx.moveTo(0, 0);

	// 5つの先端を持つモミジの葉
	for (let i = 0; i < 5; i++) {
		const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
		const tipX = Math.cos(angle) * size;
		const tipY = Math.sin(angle) * size;

		// 先端へカーブを描く
		const ctrl1X = Math.cos(angle - 0.2) * size * 0.5;
		const ctrl1Y = Math.sin(angle - 0.2) * size * 0.5;
		const ctrl2X = Math.cos(angle + 0.2) * size * 0.5;
		const ctrl2Y = Math.sin(angle + 0.2) * size * 0.5;

		ctx.lineTo(ctrl1X, ctrl1Y);
		ctx.lineTo(tipX, tipY);
		ctx.lineTo(ctrl2X, ctrl2Y);
	}

	ctx.closePath();
	ctx.fillStyle = gradient;
	ctx.fill();

	// 葉脈を描画
	ctx.beginPath();
	for (let i = 0; i < 5; i++) {
		const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
		const tipX = Math.cos(angle) * size * 0.9;
		const tipY = Math.sin(angle) * size * 0.9;

		ctx.moveTo(0, 0);
		ctx.lineTo(tipX, tipY);
	}

	ctx.strokeStyle = p.veinColor;
	ctx.lineWidth = 0.5;
	ctx.stroke();
};

export const updateAutumnParticle = (
	p: AutumnParticle,
	index: number,
	size: Size,
	particles: AutumnParticle[],
	createParticle: () => AutumnParticle,
): void => {
	// 基本的な落下
	p.y += p.speedY;

	// より自然な水平移動
	p.x += Math.sin(p.rotation * 2) * 1 + p.speedX;
	p.rotation += p.rotationSpeed;

	// 葉が揺れる動き
	p.speedX = Math.sin(p.y / p.wobbleSize) * 2;

	// 空気抵抗による回転の加速/減速
	const heightFactor = Math.min(1, p.y / (size.height * 0.8));
	p.rotationSpeed += Math.sin(p.y * p.flutterSpeed) * 0.001 * p.spinDirection;

	// 落下速度も微調整
	p.speedY = Math.min(p.speedY * 1.001, 3);

	// より複雑な揺れ動き
	p.x +=
		Math.sin(p.y * p.flutterSpeed) * p.flutterAmount * Math.sin(p.rotation);

	// 画面外に出たらリセット
	if (p.y > size.height) {
		particles[index] = createParticle();
	}
};

export const renderAutumnBackground = (
	ctx: CanvasRenderingContext2D,
	size: Size,
): void => {
	// より豊かな秋の夕暮れのようなグラデーション
	const gradient = ctx.createLinearGradient(0, 0, 0, size.height);
	gradient.addColorStop(0, "#DAA06D"); // 上部：淡い黄金色
	gradient.addColorStop(0.4, "#DA7C43"); // 中上部：オレンジがかった色
	gradient.addColorStop(0.7, "#B76E79"); // 中下部：ピンクがかった色
	gradient.addColorStop(1, "#7D4A5C"); // 下部：暗い紫がかった色

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size.width, size.height);

	ctx.lineTo(size.width, size.height);
	ctx.lineTo(0, size.height);
	ctx.closePath();
	ctx.fill();
};
