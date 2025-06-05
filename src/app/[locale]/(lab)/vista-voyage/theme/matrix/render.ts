import type { MatrixParticle, Size } from "@lab/vista-voyage/type";

const MATRIX_CHARS =
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ";

export const createMatrixParticle = (size: Size): MatrixParticle => {
	// 流れの速さにばらつきを持たせる
	const speedY = Math.random() * 3 + 2;

	// 文字列の長さにばらつきを持たせる
	const columnLength = Math.floor(Math.random() * 15 + 10);

	// 文字列を生成
	const chars = Array.from({ length: columnLength }, () =>
		MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length)),
	);

	// ランダムな遅延で開始して、すべての文字列が同時に動かないようにする
	const delay = Math.random() * 100;

	// 白い文字（ハイライト）の位置 - 先頭から順に移動
	const highlightPos = 0;

	return {
		x: Math.random() * size.width,
		y: -columnLength * (Math.random() * 10 + 10) - delay,
		size: Math.random() * 8 + 10, // 文字サイズのバリエーション
		speedY,
		opacity: Math.random() * 0.3 + 0.7, // 不透明度のバリエーション
		chars,
		highlightPos,
		changeFreq: Math.random() * 0.1 + 0.03, // 文字が変わる頻度
		glow: Math.random() > 0.7, // 30%の確率で光彩効果あり
		fade: Math.random() * 0.2 + 0.8, // 尾の部分のフェード率
	};
};

export const renderMatrixParticle = (
	ctx: CanvasRenderingContext2D,
	p: MatrixParticle,
): void => {
	ctx.font = `${p.size}px "Courier New", monospace`;

	// グロー効果を設定（該当する場合）
	if (p.glow) {
		ctx.shadowColor = "rgba(0, 255, 70, 0.8)";
		ctx.shadowBlur = 10;
	}

	for (let i = 0; i < p.chars.length; i++) {
		// 先頭の文字は白く、ハイライト位置は明るい緑、残りは徐々に暗くなる緑
		let charColor: string;
		const fadeStrength = p.fade ** i; // より急速なフェード効果

		if (i === p.highlightPos) {
			// ハイライト文字は白っぽく
			charColor = `rgba(220, 255, 220, ${p.opacity})`;
		} else if (i < p.highlightPos) {
			// ハイライト位置より上の文字は薄緑（濃さを調整）
			charColor = `rgba(40, 255, 100, ${p.opacity * fadeStrength * 0.8})`;
		} else {
			// ハイライト位置より下の文字は濃い緑で徐々に消える
			charColor = `rgba(0, 255, 70, ${p.opacity * fadeStrength * 0.6})`;
		}

		ctx.fillStyle = charColor;

		// 文字を描画（Y座標は下に向かって増える）
		ctx.fillText(p.chars[i], p.x, p.y + i * p.size);
	}

	// グロー効果をリセット
	if (p.glow) {
		ctx.shadowColor = "transparent";
		ctx.shadowBlur = 0;
	}
};

export const updateMatrixParticle = (
	p: MatrixParticle,
	index: number,
	size: Size,
	particles: MatrixParticle[],
	createParticle: () => MatrixParticle,
): void => {
	// 垂直移動
	p.y += p.speedY;

	// ハイライトの位置を更新（徐々に下に移動）
	if (Math.random() < 0.1) {
		// 時々ハイライトを下に移動
		p.highlightPos = Math.min(p.highlightPos + 1, p.chars.length - 1);
	}

	// 文字をランダムに変更（特に先頭付近と現在のハイライト位置付近）
	for (let i = 0; i < p.chars.length; i++) {
		// ハイライト位置またはその周辺の文字は変わりやすい
		const isNearHighlight = Math.abs(i - p.highlightPos) <= 1;
		const changeProb = isNearHighlight ? p.changeFreq * 2 : p.changeFreq;

		if (Math.random() < changeProb) {
			p.chars[i] = MATRIX_CHARS.charAt(
				Math.floor(Math.random() * MATRIX_CHARS.length),
			);
		}
	}

	// 画面外に完全に出たら再生成
	if (p.y - p.size > size.height) {
		particles[index] = createParticle();
	}
};

export const renderMatrixBackground = (
	ctx: CanvasRenderingContext2D,
	size: Size,
): void => {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, size.width, size.height);
};
