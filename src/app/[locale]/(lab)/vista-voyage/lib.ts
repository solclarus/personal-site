import { THEMES } from "@lab/vista-voyage/config";
import type { Particle, Size, ThemeType } from "@lab/vista-voyage/type";

export const drawAndUpdateParticles = (
	ctx: CanvasRenderingContext2D,
	themeType: ThemeType,
	particles: Particle[],
	size: Size,
): void => {
	particles.forEach((particle, index) => {
		THEMES[themeType].renderParticle(ctx, particle);
		THEMES[themeType].updateParticle(particle, index, size, particles, () =>
			THEMES[themeType].createParticle(size),
		);
	});
};
