// src/engine/draw.js

import {IEnemy, IEngine, IFloatingText, IGameState} from "@/types";

type TDrawPlayer = {
	engine: IEngine,
	gameState: IGameState,
}
export function drawPlayer(params: TDrawPlayer) {
	const { engine, gameState } = params;
	const { ctx, player } = engine;

	if (!ctx) return
	if (!player) return

	// Отрисовка радиуса атаки
	ctx.strokeStyle = 'green';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(player.x, player.y, player.attackRadius, 0, Math.PI * 2);
	ctx.stroke();

	// Проверяем, загружено ли изображение
	if (player.imageLoaded) {
		// Отрисовка игрока с поворотом
		ctx.save();
		ctx.translate(player.x, player.y);
		ctx.rotate(player.angle + Math.PI / 2);

		ctx.drawImage(
			player.image,
			-player.width / 2,
			-player.height / 2,
			player.width,
			player.height
		);

		ctx.restore();
	} else {
		// Если изображение ещё не загружено, рисуем круг в качестве заглушки
		ctx.fillStyle = player.color;
		ctx.beginPath();
		ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
		ctx.fill();
	}
}

type TDrawEnemies = {
	engine: IEngine,
}
export function drawEnemies(params: TDrawEnemies) {
	const { engine } = params;
	const { ctx, enemies, player } = engine;

	if (!ctx) return
	if (!player) return

	enemies.forEach((enemy: IEnemy) => {
		// Проверяем, загружено ли изображение врага
		if (!enemy.imageLoaded ||
			!enemy?.width ||
			!enemy?.height ||
			enemy.x === undefined ||
			enemy.y === undefined ||
			enemy.rotate === undefined ||
			enemy.image === undefined ||
			typeof enemy?.wobble?.offset === "undefined" ||
			!enemy?.wobble?.intensity ||
			!enemy?.wobble?.speed
		) return;

		ctx.save();
		ctx.translate(enemy.x, enemy.y);
		ctx.rotate(enemy.rotate);

		ctx.drawImage(
			enemy.image as CanvasImageSource,
			-enemy.width / 2,
			-enemy.height / 2,
			enemy.width,
			enemy.height
		);

		ctx.restore();
	});
}

type TDrawBulletsParams = {
	engine: IEngine,
}
export function drawBullets(params: TDrawBulletsParams) {
	const { engine } = params;
	const { ctx, bullets, bulletImage } = engine;

	if (!ctx) return

	bullets.forEach((bullet) => {
		ctx.save();
		ctx.translate(bullet.x, bullet.y);
		ctx.rotate(bullet.angle + Math.PI / 2);

		ctx.drawImage(
			bulletImage,
			-bullet.width / 2,
			-bullet.height / 2,
			bullet.width,
			bullet.height
		);

		ctx.restore();
	});
}

type TDrawDropsParams = {
	engine: IEngine,
}
export function drawDrops(params: TDrawDropsParams) {
	const DEFAULT_SIZE = 50
	const { engine } = params;
	const { ctx, drops } = engine;
	if (!ctx) return

	drops.forEach((drop) => {
		if (!drop?.remainingTime || !drop?.iconImage) return

		if (drop.iconImage.complete) {
			let shouldDraw = true;

			if (drop.isBlinking) {
				// Реализуем мигание
				const blinkInterval = 500; // Интервал мигания в миллисекундах
				const timeSinceBlinkStart = drop.remainingTime % blinkInterval;

				if (timeSinceBlinkStart > blinkInterval / 2) {
					shouldDraw = false; // Не рисуем дроп в этот промежуток времени
				}
			}

			if (shouldDraw && drop.x !== undefined && drop.y !== undefined) {
				ctx.drawImage(
					drop.iconImage,
					drop.x - DEFAULT_SIZE / 2,
					drop.y - DEFAULT_SIZE / 2,
					DEFAULT_SIZE,
					DEFAULT_SIZE
				);
			}
		}
	});
}

type TDrawFloatingTextsParams = {
	engine: IEngine,
}
export function drawFloatingTexts(params: TDrawFloatingTextsParams) {
	const { engine } = params;
	const { ctx, floatingTexts } = engine;

	if (!ctx) return

	floatingTexts.forEach((text : IFloatingText) => {
		ctx.save();
		ctx.globalAlpha = text?.opacity;
		ctx.fillStyle = '#F64904'; // Можно настроить цвет текста
		ctx.font = '700 30px/30px \'Baloo 2\'';
		ctx.font
		ctx.textAlign = 'center';
		ctx.fillText(text.text, text.x, text.y);
		ctx.restore();
	});
}

type TDrawPuffEffect = {
	engine: IEngine,
}
export function drawPuffEffect(params: TDrawPuffEffect) {
	const { engine } = params;
	const { puffEffects, ctx } = engine;

	if (!ctx) return
	if (puffEffects.length === 0) return

	puffEffects.forEach((puff, index) => {
		if (puff?.width === undefined || puff?.height === undefined) return

		ctx.save();
		ctx.globalAlpha = puff.opacity;
		ctx.translate(puff.x, puff.y);
		ctx.drawImage(puff.image, -puff.width / 2, -puff.height / 2, puff.width, puff.height);
		ctx.restore();

		//Обновление параметров эффекта "пуф"
		puff.opacity -= 0.03;
		puff.lifetime--;

		// Удаление эффекта после окончания времени жизни
		if (puff.lifetime <= 0) {
			puffEffects.splice(index, 1);
		}
	});

}
