import { checkCollision } from './collision.js';
import {IBuffManager, IBullet, IEngine, IGameState} from "@/types";
import {handleEnemyDeathAudio, handleEnemyDeathVfx} from "@/engine/enemy";

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
		if (!engine.player) return

		const angle = Math.atan2(engine.player.y - enemy.y, engine.player.x - enemy.x);
		enemy.x += Math.cos(angle) * enemy.speed;
		enemy.y += Math.sin(angle) * enemy.speed;

		// Проверка столкновения с игроком
		if (checkCollision(engine.player, enemy)) {
			if (!buff.isInvincible.value) {
				// Отнимаем HP у игрока
				gameState.playerHP.value -= enemy.damage;
			}
			// Удаляем врага после столкновения
			engine.enemies.splice(index, 1);

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
		bullet.x += Math.cos(bullet.angle) * bullet.speed;
		bullet.y += Math.sin(bullet.angle) * bullet.speed;

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

		// Если у снаряда есть конкретная цель
		if (bullet.target) {
			const enemy = bullet.target;
			if (enemy && checkCollision(bullet, enemy)) {
				enemy.hp -= 1 + buff.damageIncrease.value;
				engine.bullets.splice(index, 1);

				if (enemy.hp <= 0) {
					gameState.experience.value += enemy.experience;
					engine.enemies.splice(engine.enemies.indexOf(enemy), 1);

					// Обрабатываем выпадение дропа
					handleEnemyDrop({ enemy, engine });
					handleEnemyDeathVfx({ enemy, engine })
					handleEnemyDeathAudio({ engine })
				}
			}
		} else {
			// Если у снаряда нет конкретной цели, проверяем столкновение со всеми врагами
			for (let i = 0; i < engine.enemies.length; i++) {
				const enemy = engine.enemies[i];
				if (checkCollision(bullet, enemy)) {
					enemy.hp -= 1 + buff.damageIncrease.value;
					engine.bullets.splice(index, 1);

					if (enemy.hp <= 0) {
						gameState.experience.value += enemy.experience;
						engine.enemies.splice(i, 1);
						i--;

						// Обрабатываем выпадение дропа
						handleEnemyDrop({ enemy, engine });
						handleEnemyDeathVfx({ enemy, engine })
						handleEnemyDeathAudio({ engine })
					}
					break; // Выходим из цикла после первого столкновения
				}
			}
		}
	});
}


type THandleEnemyDropParams = {
	enemy: any,
	engine: IEngine
}
function handleEnemyDrop(params: THandleEnemyDropParams) {
	const { enemy, engine} = params
	if (!enemy?.drops || enemy.drops.length === 0) return;

	const { drops, allDrops } = engine

	for (const dropInfo of enemy.drops) {
		const chance = Math.random();

		if (chance <= dropInfo.chance) {
			const dropData = allDrops.find((drop) => drop.id === dropInfo.id);
			if (!dropData || !dropData?.duration) break

			drops.push({
				id: dropData.id,
				x: enemy.x,
				y: enemy.y,
				iconImage: dropData.iconImage,
				effect: dropData.effect,
				remainingTime: dropData.duration * 1000, // Оставшееся время в миллисекундах
				isBlinking: false, // Флаг мигания
				pickupText: dropData.pickupText,
			});

			break
		}
	}
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
		} else if (drop.remainingTime <= 3000) {
			// Если до исчезновения осталось меньше или равно 3 секундам, начинаем мигание
			drop.isBlinking = true;
		} else {
			drop.isBlinking = false;
		}
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
