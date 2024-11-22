// src/engine/gameLoop.js

import {shootBullet} from './shooting';
import {checkLevelUp, updateBullets, updateDrops, updateEnemies, updateFloatingTexts} from './update';
import {
	drawBullets,
	drawCriticalHitEffect,
	drawDrops,
	drawEnemies,
	drawFloatingTexts,
	drawPlayer,
	drawPuffEffect
} from './draw.js';
import {IBuffManager, IEngine, IGameState} from "@/types/engine.types";
import {BUFF_PROP} from "@/database/buffs";
import {settings} from "@/settings";

type TGameLoopParams = {
	engine: IEngine,
	gameState: IGameState,
	buff: IBuffManager
}

export function gameLoop(params: TGameLoopParams) {
	const {engine, gameState, buff} = params;

	function update() {
		if (!gameState.isPaused.value && !gameState.isGameOver.value && engine?.player) {
			// Обновляем радиус атаки игрока с учётом бафов
			engine.player.attackRadius = settings.player.attackRadius * (1 + Number(buff.selectedUpgradesValue.value[BUFF_PROP.ENEMY_DETECTION_RADIUS]));

			updateEnemies({engine, gameState, buff});
			updateBullets({engine, gameState, buff});
			checkLevelUp({gameState});
		}

		updateDrops({engine, gameState});
		updateFloatingTexts({engine});
	}

	function draw() {
		let backgroundImageLoaded = false;

		engine.backgroundImage.onload = () => {
			backgroundImageLoaded = true;
		};

		setTimeout(() => {
			if (!engine?.ctx) return

			engine.ctx.drawImage(engine.backgroundImage, -(engine.backgroundImage.width - engine.canvas.width) / 2, 0, engine.backgroundImage.width, engine.canvas.height);
		}, 1000)

		drawPlayer({engine, gameState});
		drawBullets({engine});
		drawEnemies({engine});
		drawDrops({engine});
		drawFloatingTexts({engine});
		drawPuffEffect({engine});
		drawCriticalHitEffect({engine});
	}

	// Цикл стрельбы
	function shootingLoop() {
		if (gameState.isPaused.value || gameState.isGameOver.value) return

		shootBullet({engine, buff});
	}

	function loop() {
		update();
		shootingLoop();
		draw();
		requestAnimationFrame(loop);
	}

	loop();
}
