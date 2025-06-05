import type { BubbleParticle, Size } from "@lab/vista-voyage/type";

export const createBubbleParticle = (size: Size): BubbleParticle => {
	// 泡のサイズバリエーションを増やす
	const bubbleSize = Math.random() * 15 + 3;

	// 透明度を高く設定して透明感を強調
	const baseOpacity = Math.random() * 0.3 + 0.1;

	// 泡の上昇速度もサイズに依存するように
	const baseSpeed = (Math.random() * 1 + 0.5) * (1 + bubbleSize / 20);

	return {
		x: Math.random() * size.width,
		y: size.height + Math.random() * 50,
		size: bubbleSize,
		opacity: baseOpacity,
		speedY: -baseSpeed, // 大きな泡ほど速く上昇
		wobbleSpeed: Math.random() * 0.02 + 0.01, // 泡の左右の揺れを制御
		wobble: Math.random() * Math.PI * 2,
		color: `rgba(173, 216, 230, ${baseOpacity})`, // 泡の色を青みがかった透明色に
		willPop: Math.random() > 0.7, // 泡が破裂するかどうか
		highlightOffsetX: Math.random() * 0.4 - 0.2, // 泡のハイライト位置をランダム化
		highlightOffsetY: Math.random() * 0.4 - 0.2, // 泡のハイライト位置をランダム化
		pulseSpeed: Math.random() * 0.02 + 0.01, // サイズの揺れ（膨張と収縮）
		pulsePhase: Math.random() * Math.PI * 2, // サイズの揺れ（膨張と収縮）
		pulseAmount: Math.random() * 0.1 + 0.05, // サイズの揺れ（膨張と収縮）
		reflectionStrength: Math.random() * 0.4 + 0.6, // 泡の反射光の強さ
		filmThickness: Math.random(), // 泡膜の厚さ（虹色の表現用）
		groupId: Math.floor(Math.random() * 5), // 気泡の集まり効果用
		groupAttraction: Math.random() * 0.01 + 0.005, // 気泡の集まり効果用
	};
};

export const renderBubbleParticle = (
	ctx: CanvasRenderingContext2D,
	p: BubbleParticle,
): void => {
	// 現在の泡のサイズ（脈動効果を適用）
	const currentSize = p.size * (1 + Math.sin(p.pulsePhase) * p.pulseAmount);

	// 泡の位置（揺れを適用）
	const bubbleX = p.x + Math.sin(p.wobble) * 2;
	const bubbleY = p.y;

	// 基本の泡の形を描画
	ctx.beginPath();
	ctx.arc(bubbleX, bubbleY, currentSize, 0, Math.PI * 2);

	// 泡の内部グラデーション - より複雑で透明感のあるグラデーション
	const bubble = ctx.createRadialGradient(
		// ハイライトの位置をオフセットして自然な光の反射を表現
		bubbleX + p.highlightOffsetX * currentSize,
		bubbleY + p.highlightOffsetY * currentSize,
		currentSize / 8,
		bubbleX,
		bubbleY,
		currentSize,
	);

	// 泡の膜の厚さによって色合いを微妙に変える（虹色効果）
	const hue = (210 + p.filmThickness * 30) % 360; // 青~青緑の範囲

	// グラデーションのカラーストップを増やして複雑な見た目に
	bubble.addColorStop(0, `rgba(255, 255, 255, ${0.9 * p.reflectionStrength})`); // 中心のハイライト
	bubble.addColorStop(0.1, `hsla(${hue}, 80%, 80%, ${0.3 * p.opacity})`); // 薄い色味
	bubble.addColorStop(0.75, `hsla(${hue - 20}, 90%, 70%, ${0.2 * p.opacity})`); // 泡の膜
	bubble.addColorStop(0.9, `hsla(${hue + 20}, 100%, 90%, ${0.4 * p.opacity})`); // 縁の光
	bubble.addColorStop(1, `rgba(255, 255, 255, ${0.1 * p.opacity})`); // 外側の反射

	ctx.fillStyle = bubble;
	ctx.fill();

	// 泡の縁を薄く描画
	ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * p.opacity})`;
	ctx.lineWidth = 0.5;
	ctx.stroke();

	// 泡の表面反射（小さな光の点）
	ctx.beginPath();
	const reflectionSize = currentSize * 0.15;
	const reflectionX =
		bubbleX - currentSize * 0.3 + p.highlightOffsetX * currentSize * 2;
	const reflectionY =
		bubbleY - currentSize * 0.3 + p.highlightOffsetY * currentSize * 2;

	ctx.arc(reflectionX, reflectionY, reflectionSize, 0, Math.PI * 2);
	const reflection = ctx.createRadialGradient(
		reflectionX,
		reflectionY,
		0,
		reflectionX,
		reflectionY,
		reflectionSize,
	);
	reflection.addColorStop(
		0,
		`rgba(255, 255, 255, ${0.9 * p.reflectionStrength})`,
	);
	reflection.addColorStop(1, "rgba(255, 255, 255, 0)");

	ctx.fillStyle = reflection;
	ctx.fill();

	// 二つ目の小さな反射
	ctx.beginPath();
	const reflection2Size = currentSize * 0.08;
	const reflection2X = bubbleX + currentSize * 0.2;
	const reflection2Y = bubbleY - currentSize * 0.2;

	ctx.arc(reflection2X, reflection2Y, reflection2Size, 0, Math.PI * 2);
	const reflection2 = ctx.createRadialGradient(
		reflection2X,
		reflection2Y,
		0,
		reflection2X,
		reflection2Y,
		reflection2Size,
	);
	reflection2.addColorStop(
		0,
		`rgba(255, 255, 255, ${0.7 * p.reflectionStrength})`,
	);
	reflection2.addColorStop(1, "rgba(255, 255, 255, 0)");

	ctx.fillStyle = reflection2;
	ctx.fill();
};

export const updateBubbleParticle = (
	p: BubbleParticle,
	index: number,
	size: Size,
	particles: BubbleParticle[],
	createParticle: () => BubbleParticle,
): void => {
	// 基本的な上昇
	p.y += p.speedY;

	// 左右の揺れ
	p.x += Math.sin(p.wobble) * 1;
	p.wobble += p.wobbleSpeed;

	// 脈動効果（膨張と収縮）
	p.pulsePhase += p.pulseSpeed;

	// 泡の上昇に伴う減速（水圧の減少）
	const depthFactor = 1 - (size.height - p.y) / size.height;
	p.speedY *= 0.998 + depthFactor * 0.004;

	// 微妙な泡のサイズ変化（水圧による膨張）
	// 実際のサイズは描画時に計算

	// 泡同士の相互作用（集まりを形成）
	for (let i = 0; i < particles.length; i++) {
		if (i !== index && particles[i].groupId === p.groupId) {
			const other = particles[i];
			const dx = p.x - other.x;
			const dy = p.y - other.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < 100) {
				// 近くの同じグループの泡に引かれる
				p.x -= (dx / distance) * p.groupAttraction;
				p.y -= (dy / distance) * p.groupAttraction;
			}
		}
	}

	// 画面上部まで上昇したら、または一定確率で泡が破裂
	if (
		p.y + p.size < 0 ||
		(p.willPop && p.y < size.height * 0.2 && Math.random() < 0.01)
	) {
		particles[index] = createParticle();
	}
};
export const renderBubbleBackground = (
	ctx: CanvasRenderingContext2D,
	size: Size,
): void => {
	// 基本的な背景グラデーション（変更なし）
	const gradient = ctx.createLinearGradient(0, 0, 0, size.height);
	gradient.addColorStop(0, "#0D4F8B"); // 上部：明るめの青
	gradient.addColorStop(0.3, "#1E5799"); // 上中部：標準的な青
	gradient.addColorStop(0.7, "#154277"); // 下中部：やや濃い青
	gradient.addColorStop(1, "#002952"); // 下部：暗い青

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size.width, size.height);

	// 光の筋の改善部分 - 固定位置にして安定させる
	const numRays = 3; // 少なくして目立ちすぎないように

	// 透明度を下げてより微妙に
	ctx.globalAlpha = 0.05;
	ctx.fillStyle = "rgba(255, 255, 255, 0.05)";

	// 光の筋の位置を乱数ではなく均等に配置し、毎フレーム同じ位置に表示
	for (let i = 0; i < numRays; i++) {
		// 画面幅を均等に分割して配置
		const x = (size.width / (numRays + 1)) * (i + 1);

		// 各光線の幅を一定に
		const rayWidth = size.width / 25;
		const topWidth = rayWidth * 0.5; // 上部は細く
		const bottomWidth = rayWidth * 1.5; // 下部は広く

		// ベジェ曲線で滑らかな形状に
		ctx.beginPath();
		ctx.moveTo(x - topWidth / 2, 0);
		ctx.lineTo(x + topWidth / 2, 0);

		// 下部に向かって緩やかに広がる曲線
		ctx.quadraticCurveTo(
			x + bottomWidth / 3,
			size.height / 2,
			x + bottomWidth,
			size.height,
		);
		ctx.quadraticCurveTo(x, size.height * 0.95, x - bottomWidth, size.height);
		ctx.quadraticCurveTo(
			x - bottomWidth / 3,
			size.height / 2,
			x - topWidth / 2,
			0,
		);

		ctx.closePath();
		ctx.fill();
	}

	// グローバルアルファを元に戻す
	ctx.globalAlpha = 1.0;

	ctx.fillRect(0, 0, size.width, size.height);
};
