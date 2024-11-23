import enemiesData from '../database/enemies';
import {IEnemy, IEngine, IGameState} from "@/types/engine.types";
import { AUDIO } from "./audio";
import {getRandomValue} from "@/utils/helpers";
import {settings} from "@/settings";
import {
	TSpawnBossLogic,
	TSpawnEnemy,
	THandleEnemyCritHitVfxParams,
	THandlePoofParams, THandleEnemyDeathAudioParams, TGetRandomEnemyParams, TGetRandomLootParams, THandleEnemyDropParams
} from "@/types/engine/enemy.types";

// Enemy vfx
import poofVfx1 from '@/assets/images/vfx/poof_1.png';
import poofVfx2 from '@/assets/images/vfx/poof_2.png';
import poofVfx3 from '@/assets/images/vfx/poof_3.png';
import poofVfx4 from '@/assets/images/vfx/poof_4.png';
import poofVfx5 from '@/assets/images/vfx/poof_5.png';
import poofVfx6 from '@/assets/images/vfx/poof_6.png';
import poofVfx7 from '@/assets/images/vfx/poof_7.png';
import poofVfx8 from '@/assets/images/vfx/poof_8.png';
import poofVfx9 from '@/assets/images/vfx/poof_9.png';
import poofVfx10 from '@/assets/images/vfx/poof_10.png';
import poofVfx11 from '@/assets/images/vfx/poof_11.png';
import poofVfx12 from '@/assets/images/vfx/poof_12.png';
import poofVfx13 from '@/assets/images/vfx/poof_13.png';
import poofVfx14 from '@/assets/images/vfx/poof_14.png';
import poofVfx15 from '@/assets/images/vfx/poof_15.png';
import poofVfx16 from '@/assets/images/vfx/poof_16.png';
import poofVfx17 from '@/assets/images/vfx/poof_17.png';
import poofVfx18 from '@/assets/images/vfx/poof_18.png';
import poofVfx19 from '@/assets/images/vfx/poof_19.png';
import poofVfx20 from '@/assets/images/vfx/poof_20.png';
import criticalHit from '@/assets/images/vfx/criticalHit.png';

const VFX_DEATH = [
	poofVfx1,
	poofVfx2,
	poofVfx3,
	poofVfx4,
	poofVfx5,
	poofVfx6,
	poofVfx7,
	poofVfx8,
	poofVfx9,
	poofVfx10,
	poofVfx11,
	poofVfx12,
	poofVfx13,
	poofVfx14,
	poofVfx15,
	poofVfx16,
	poofVfx17,
	poofVfx18,
	poofVfx19,
	poofVfx20,
]

export function loadEnemiesData() : IEnemy[] {
	return enemiesData.map((enemy: IEnemy) : IEnemy => {
		const img : HTMLImageElement = new Image();
		img.src = enemy.image as string ?? '';

		const loadedEnemy : IEnemy = {
			...enemy,
			image: img,
			imageLoaded: false,
		};

		img.onload = () => {
			loadedEnemy.imageLoaded = true;
		};

		return loadedEnemy;
	});
}

/**
 * Спавн врага.
 * Если передать enemy_id, то заспавнится конкретный враг
 * Если передать boss, то заспавнится произвольный Босс
 */
export function spawnEnemy(params: TSpawnEnemy) {
	const DEFAULT_SIZE = 40;
	const { engine, enemy_id, gameState, boss = false } = params
	const { enemies, canvas } = engine

	const enemyType = getEnemy({ engine, enemy_id, boss })
	const side = Math.floor(Math.random() * 4);

	let enemy : IEnemy,
		x : number,
		y : number

	if (side === 0) {
		x = Math.random() * canvas.width;
		y = 0;
	} else if (side === 1) {
		x = canvas.width;
		y = Math.random() * canvas.height;
	} else if (side === 2) {
		x = Math.random() * canvas.width;
		y = canvas.height;
	} else {
		x = 0;
		y = Math.random() * canvas.height;
	}

	if (!enemyType) return

	const enemyGrows = growEnemyByLevel(enemyType, gameState.level.value)

	enemy = {
		_id: Date.now(),
		...enemyType,
		...enemyGrows,
		x,
		y,
		maxHP: enemyGrows.hp,
		width: enemyType?.width || DEFAULT_SIZE,
		height: enemyType?.height || DEFAULT_SIZE,
	};

	enemies.push(enemy);
}

/**
 * Попытка спавна босса. Вызывается при изменении левела ГГ
 */
export function spawnBossLogic(params: TSpawnBossLogic) {
	const { engine, gameState} = params

	if (gameState.level.value % 10 !== 0) return

	spawnEnemy({
		engine,
		gameState,
		boss: true
	})
}

/**
 * Изменение характеристик моба в зависимости от Level ГГ
 */
function growEnemyByLevel(enemy: IEnemy, level: number) {
	const _SE = settings.progress.enemy

	return {
		hp:         scaleParams(enemy.hp,           level, _SE.hpMultiplex),
		damage:     scaleParams(enemy.damage,       level, _SE.damageMultiplex),
		experience: Math.floor(scaleParams(enemy.experience,   level, _SE.expMultiplex)),
		speed:      scaleParams(enemy.speed,        level, _SE.speedMultiplex)
	}
}

/**
 * Чем выше значение growthRate, тем сильнее будет увеличение.
 * @param baseValue
 * @param playerLevel
 * @param rate
 */
function scaleParams(baseValue: number, playerLevel: number, rate: number) {
	// Вычисляем множитель для увеличения HP на основе уровня игрока
	const multiplier = Math.pow(rate, playerLevel - 1);

	// Возвращаем увеличенное значение HP
	return +(baseValue * multiplier).toFixed(1)
}

/**
 * Добавление визуальных эффектов при смерти врага
 */
export function handleEnemyDeathVfx(params: THandlePoofParams) {
	const { enemy, engine} = params

	const image = new Image();
	image.src = getRandomValue(VFX_DEATH);

	engine.puffEffects.push({
		image,
		x: enemy.x,
		y: enemy.y,
		width: 100,
		height: 100,
		opacity: 1,
		lifetime: 30
	});
}

/**
 * Добавление визуальных эффектов при критическом попадании
 */
export function handleEnemyCritHitVfx(params: THandleEnemyCritHitVfxParams) {
	const { enemy, engine} = params

	const image = new Image();
	image.src = criticalHit;

	engine.criticalEffect.push({
		image,
		x: enemy.x,
		y: enemy.y,
		width: 60,
		height: 60,
		opacity: 1,
		lifetime: 30
	});
}

/**
 * Воспроизведение звука при смерти врага
 */
export function handleEnemyDeathAudio(params: THandleEnemyDeathAudioParams) {
	const { engine} = params

	engine.audioManager.playSound(AUDIO.ENEMY_DEATH)
}

/**
 * Выборка врага из библиотеки
 */
function getEnemy(params: TGetRandomEnemyParams) {
	const { engine, boss, enemy_id } = params
	const { loadedEnemies } = engine

	if (enemy_id) {
		return loadedEnemies.find(e => e.id === enemy_id);
	}

	if (boss) {
		const bossList = loadedEnemies.filter(e => e.boss)
		return bossList[Math.floor(Math.random() * bossList.length)];
	}

	const mobs = loadedEnemies.filter(e => !e.boss)
	return mobs[Math.floor(Math.random() * mobs.length)];
}

/**
 * Получение произвольного лута из врага
 */
export function getRandomLoot(params: TGetRandomLootParams) {
	const { enemy, engine } = params

	const lootTable = enemy.drops;
	const sortedLootTable = lootTable.sort((a, b) => a.chance - b.chance);

	for (const drop of sortedLootTable) {
		const dropChance = Math.random();

		if (dropChance <= drop.chance) {
			return engine.allDrops.find(d => d.id === drop.id);
		}
	}

	return null; // Если ничего не выпало
}

/**
 * Создание дропа из врага
 */
export function handleEnemyDrop(params: THandleEnemyDropParams) {
	const { enemy, engine} = params
	if (!enemy?.drops || enemy.drops.length === 0) return;

	const drop = getRandomLoot({ enemy, engine })
	if (!drop || !drop?.duration) return;

	engine.drops.push({
		id: drop.id,
		x: enemy.x,
		y: enemy.y,
		iconImage: drop.iconImage,
		effect: drop.effect,
		remainingTime: drop.duration * 1000, // Оставшееся время в миллисекундах
		isBlinking: false, // Флаг мигания
		pickupText: drop.pickupText,
	});
}
