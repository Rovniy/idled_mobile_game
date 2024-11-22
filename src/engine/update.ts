import { checkCollision } from './collision.js';
import {IBuffManager, IBullet, IEnemy, IEngine, IGameState} from "@/types/engine.types";
import {handleEnemyDeathAudio, handleEnemyDeathVfx, getRandomLoot, handleEnemyCritHitVfx} from "@/engine/enemy";
import { bulletFlight } from "@/engine/bullet";
import {BUFF_PROP} from "@/database/buffs";
import { settings } from "@/settings";

type TUpdateEnemiesParams = {
	engine: IEngine,
	gameState: IGameState,
	buff: IBuffManager
}
export function updateEnemies(params: TUpdateEnemiesParams) {
	const {
		engine,
		gameState,
		buff
	} = params

	engine.enemies.forEach((enemy, index) => {
		if (!engine.player || !enemy?.wobble || enemy?.y === undefined || enemy?.x === undefined) return

		// Вычисляем угол поворота к игроку
		const angle = Math.atan2(engine.player.y - enemy.y, engine.player.x - enemy.x);
		const wobbleAmount = Math.sin(enemy.wobble.offset) * enemy.wobble.intensity;
		// enemy.rotate = angle + Math.PI / 2 + wobbleAmount
		enemy.rotate = angle + (3 * Math.PI) / 2 + wobbleAmount

		enemy.wobble.offset += (enemy.wobble.speed / buff.selectedUpgradesValue.value[BUFF_PROP.TIME_SLOW_MOTION]);

		enemy.x += Math.cos(angle) * (enemy.speed / buff.selectedUpgradesValue.value[BUFF_PROP.TIME_SLOW_MOTION]);
		enemy.y += Math.sin(angle) * (enemy.speed / buff.selectedUpgradesValue.value[BUFF_PROP.TIME_SLOW_MOTION]);

		// Проверка столкновения с игроком
		if (checkCollision(engine.player, enemy)) {
			if (!buff.selectedUpgradesValue.value[BUFF_PROP.PLAYER_INVINCIBLE]) {
				// Отнимаем HP у игрока
				const finalDamage = enemy.damage * (1 / (1 + Math.log(1 + buff.selectedUpgradesValue.value[BUFF_PROP.PLAYER_ARMOR])));
				gameState.playerHP.value -= Math.floor(finalDamage);

				if (gameState.playerHP.value < 0) {
					gameState.playerHP.value = 0;
				}
			}

			// Удаляем врага после столкновения
			engine.enemies.splice(index, 1);
			handleEnemyDeathVfx({ enemy, engine })

			// Проверяем, не закончился ли HP у игрока
			if (gameState.playerHP.value <= 0 && !gameState.isGameOver.value) {
				gameState.isGameOver.value = true;
				gameState.isPaused.value = true;
			}
		}
	});
}

type TUpdateBulletsParams = {
	engine: IEngine,
	gameState: IGameState,
	buff: IBuffManager
}
export function updateBullets(params: TUpdateBulletsParams) {
	const {
		engine,
		gameState,
		buff
	} = params

	engine.bullets.forEach((bullet : IBullet, index) => {
		bullet.x += Math.cos(bullet.angle) * (bullet.speed / buff.selectedUpgradesValue.value[BUFF_PROP.TIME_SLOW_MOTION]);
		bullet.y += Math.sin(bullet.angle) * (bullet.speed / buff.selectedUpgradesValue.value[BUFF_PROP.TIME_SLOW_MOTION]);

		// Удаление пуль, выходящих за пределы экрана
		if (
			bullet.x < 0 ||
			bullet.x > window.innerWidth ||
			bullet.y < 0 ||
			bullet.y > window.innerHeight
		) {
			engine.bullets.splice(index, 1);
			return;
		}

		for (let i = 0; i < engine.enemies.length; i++) {
			const enemy = engine.enemies[i];

			bulletFlight({
				bullet,
				enemy,
				engine,
				buff,
				index,
				gameState
			})
		}
	});
}

type TCheckLevelUpParams = {
	gameState: IGameState
}
export function checkLevelUp(params: TCheckLevelUpParams) {
	const { gameState } = params

	while (gameState.experience.value >= gameState.experienceToNextLevel.value) {
		gameState.experience.value -= gameState.experienceToNextLevel.value;
		gameState.level.value += 1;
		gameState.experienceToNextLevel.value = Math.floor(gameState.experienceToNextLevel.value * 1.5);
	}
}

let lastDropUpdateTime = Date.now();
type TUpdateDropsParams = {
	engine: IEngine,
	gameState: IGameState
}
export function updateDrops(params: TUpdateDropsParams) {
	const { engine, gameState } = params

	const currentTime = Date.now();
	let deltaTime = currentTime - lastDropUpdateTime;
	lastDropUpdateTime = currentTime;

	if (gameState.isPaused.value) {
		lastDropUpdateTime = Date.now();
		return
	}

	for (let i = engine.drops.length - 1; i >= 0; i--) {
		const drop = engine.drops[i];
		if (!drop?.remainingTime) continue;

		// Уменьшаем remainingTime на deltaTime
		drop.remainingTime -= deltaTime;

		// Проверяем, не истекло ли время жизни дропа
		if (drop.remainingTime <= 0) {
			// Удаляем дроп из массива
			engine.drops.splice(i, 1);
		} else drop.isBlinking = drop.remainingTime <= settings.drop.blinkStartBefore;
	}
}

type TUpdateFloatingTextsParams = {
	engine: IEngine,
}
export function updateFloatingTexts(params: TUpdateFloatingTextsParams) {
	const { engine } = params;
	const currentTime = Date.now();

	for (let i = engine.floatingTexts.length - 1; i >= 0; i--) {
		const text = engine.floatingTexts[i];
		const elapsedTime = currentTime - text.startTime;

		if (elapsedTime >= text.lifespan) {
			// Удаляем текст из массива
			engine.floatingTexts.splice(i, 1);
		} else {
			// Обновляем положение и прозрачность
			text.y -= 0.5; // Движение вверх
			text.opacity = 1 - elapsedTime / text.lifespan; // Уменьшение прозрачности
		}
	}
}
