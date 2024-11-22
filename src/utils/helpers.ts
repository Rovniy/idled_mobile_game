export function getRandomValue(array: any[]) {
	if (array.length === 0) {
		throw new Error('Array of arguments cannot be empty');
	}
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

export function isRandomChance(number: number) {
	if (number >= 1) return true

	return Math.random() < number;
}

/**
 * Преобразование полярных координат в абсолютные
 */
function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
	const angleInRadians = (angleInDegrees) * Math.PI / 180;
	return {
		x: cx + (radius * Math.cos(angleInRadians)),
		y: cy + (radius * Math.sin(angleInRadians))
	};
}

/**
 * Вычисление координат для SVG фигуры заполнения прогресса
 */
export function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
	const start = polarToCartesian(cx, cy, radius, startAngle);
	const end = polarToCartesian(cx, cy, radius, endAngle);

	const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	return [
		"M", start.x, start.y,
		"A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
	].join(" ");
}

/**
 * Плавное изменение любых значений
 */
export function animateProgress(startProgress: number, endProgress: number, duration: number, callback: Function) {
	const startTime = performance.now();
	let animationFrameId = null;

	function animate(time: number) {
		const elapsed = time - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const currentValue = startProgress + (endProgress - startProgress) * progress;

		callback(currentValue);

		if (progress < 1) {
			animationFrameId = requestAnimationFrame(animate);
		}
	}

	if (animationFrameId === 0) {
		cancelAnimationFrame(animationFrameId);
	}

	animationFrameId = requestAnimationFrame(animate);
}
