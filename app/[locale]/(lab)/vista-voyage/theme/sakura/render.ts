import type { SakuraParticle, Size } from "@vista-voyage/type";

export const createSakuraParticle = (size: Size): SakuraParticle => {
	// 桜の色を HSL で定義し、実際に使用する
	const pinkHue = Math.floor(Math.random() * 20 + 350) % 360; // 330-10の範囲でHSL色相
	const saturation = Math.floor(Math.random() * 15 + 75); // 75-90%の範囲で彩度
	const lightness = Math.floor(Math.random() * 10 + 85); // 85-95%の範囲で明度
	const alpha = 0.8;

	// HSL値からRGBA文字列に変換する関数
	const hslToRgba = (h: number, s: number, l: number, a: number): string => {
		// HSLをRGBに変換する処理
		const nl = l / 100;

		const k = (n: number) => (n + h / 30) % 12;
		const a1 = (s / 100) * Math.min(nl, 1 - nl);
		const f = (n: number) =>
			nl - a1 * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

		const r = Math.round(255 * f(0));
		const g = Math.round(255 * f(8));
		const b = Math.round(255 * f(4));

		return `rgba(${r}, ${g}, ${b}, ${a})`;
	};

	// より自然な大きさのばらつき
	const baseSize = Math.random() * 4 + 4;

	// 淡いピンク系の色を生成（HSLを使用）
	const color =
		Math.random() > 0.2
			? hslToRgba(pinkHue, saturation, lightness, alpha)
			: hslToRgba(pinkHue, saturation - 10, lightness + 5, alpha);

	return {
		x: Math.random() * size.width,
		y: -Math.random() * 100,
		size: baseSize,
		opacity: Math.random() * 0.6 + 0.4,
		speedY: Math.random() * 1 + 0.5,
		speedX: Math.random() * 2 - 1,
		rotation: Math.random() * Math.PI * 2,
		rotationSpeed:
			(Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
		color: color, // 生成したHSLベースの色を使用
		flutterSpeed: Math.random() * 0.01 + 0.005,
		flutterAmount: Math.random() * 0.5 + 0.5,
	};
};

export const renderSakuraParticle = (
	ctx: CanvasRenderingContext2D,
	p: SakuraParticle,
): void => {
	ctx.save();
	ctx.translate(p.x, p.y);
	ctx.rotate(p.rotation);

	// より自然な桜の花びらの形状
	ctx.beginPath();

	// 花びらの基本サイズを決定
	const petalLength = p.size * 1.2;
	const petalWidth = p.size * 0.7;

	// 花びらの先端部分（上部）
	ctx.moveTo(0, -petalLength);

	// 花びらの右側の曲線
	ctx.bezierCurveTo(
		petalWidth * 0.5,
		-petalLength * 0.7, // 制御点1
		petalWidth,
		-petalLength * 0.4, // 制御点2
		petalWidth * 0.8,
		0, // 終点
	);

	// 花びらの右下の曲線
	ctx.bezierCurveTo(
		petalWidth,
		petalLength * 0.4, // 制御点1
		petalWidth * 0.5,
		petalLength * 0.8, // 制御点2
		0,
		petalLength, // 終点
	);

	// 花びらの左下の曲線
	ctx.bezierCurveTo(
		-petalWidth * 0.5,
		petalLength * 0.8, // 制御点1
		-petalWidth,
		petalLength * 0.4, // 制御点2
		-petalWidth * 0.8,
		0, // 終点
	);

	// 花びらの左側の曲線
	ctx.bezierCurveTo(
		-petalWidth,
		-petalLength * 0.4, // 制御点1
		-petalWidth * 0.5,
		-petalLength * 0.7, // 制御点2
		0,
		-petalLength, // 終点（始点と同じ）
	);

	ctx.closePath();

	// グラデーション効果を追加して立体感を出す
	const gradient = ctx.createRadialGradient(
		0,
		0,
		0, // 中心点
		0,
		0,
		petalLength, // 半径
	);

	// 花びらの色を取得（元の色からRGBA値を抽出）
	const baseColor = p.color;
	const lighter = baseColor.replace("rgba(", "").replace(")", "").split(",");
	const r = Number.parseInt(lighter[0].trim());
	const g = Number.parseInt(lighter[1].trim());
	const b = Number.parseInt(lighter[2].trim());
	const a = Number.parseFloat(lighter[3].trim());

	// グラデーションの色を設定
	gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
	gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${a * 0.9})`);
	gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${a * 0.7})`);

	ctx.fillStyle = gradient;
	ctx.fill();

	// 花びらの中心線（薄い線で表現）
	ctx.beginPath();
	ctx.moveTo(0, -petalLength * 0.8);
	ctx.lineTo(0, petalLength * 0.8);
	ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
	ctx.lineWidth = 0.5;
	ctx.stroke();

	ctx.restore();
};

export const updateSakuraParticle = (
	p: SakuraParticle,
	index: number,
	size: Size,
	particles: SakuraParticle[],
	createParticle: () => SakuraParticle,
): void => {
	p.y += p.speedY;

	// より複雑な水平移動（フラッターエフェクト）
	p.x += Math.sin(p.rotation * 5) * 0.5 + p.speedX;
	p.x += Math.sin(p.y * p.flutterSpeed) * p.flutterAmount;

	// 回転速度も徐々に変化
	const rotationVariation = Math.sin(p.y * 0.01) * 0.001;
	p.rotation += p.rotationSpeed + rotationVariation;

	// 画面外に出たらリセット
	if (p.y > size.height) {
		particles[index] = createParticle();
	}
};

export const renderSakuraBackground = (
	ctx: CanvasRenderingContext2D,
	size: Size,
): void => {
	const gradient = ctx.createLinearGradient(0, 0, 0, size.height);
	gradient.addColorStop(0, "#89CFF0");
	gradient.addColorStop(1, "#C2E6FF");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size.width, size.height);
};
