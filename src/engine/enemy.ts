import enemiesData from '../database/enemies';
import {IEnemy, IEngine, IGameState} from "@/types";
import { AUDIO } from "./audio";
import {getRandomValue} from "@/utils/helpers";

// Enemy vfx
import poofVfx1 from '@/assets/images/vfx/poof_1.png';
import poofVfx2 from '@/assets/images/vfx/poof_2.png';
import poofVfx3 from '@/assets/images/vfx/poof_3.png';
import poofVfx4 from '@/assets/images/vfx/poof_4.png';
import {settings} from "@/settings";

const VFX_DEATH = [
	poofVfx1,
	poofVfx2,
	poofVfx3,
	poofVfx4,
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

type TSpawnEnemy = {
	engine: IEngine,
	gameState: IGameState,
	enemy_id?: string
}
export function spawnEnemy(params: TSpawnEnemy) {
	const DEFAULT_SIZE = 40;
	const { engine, enemy_id, gameState } = params
	const { enemies, canvas } = engine

	const enemyType = getEnemy({ engine, enemy_id })
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
		...enemyType,
		...enemyGrows,
		x,
		y,
		width: enemyType?.width || DEFAULT_SIZE,
		height: enemyType?.height || DEFAULT_SIZE,
	};

	enemies.push(enemy);
}

/**
 * Изменение характеристик моба в зависимости от Level ГГ
 */
function growEnemyByLevel(enemy: IEnemy, level: number) {
	const _SE = settings.progress.enemy

	return {
		hp:         scaleParams(enemy.hp,           level, _SE.hpMultiplex),
		damage:     scaleParams(enemy.damage,       level, _SE.damageMultiplex),
		experience: scaleParams(enemy.experience,   level, _SE.expMultiplex),
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
	return Math.round(baseValue * multiplier);
}


type THandlePoofParams = {
	enemy: any,
	engine: IEngine
}
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


type THandleEnemyDeathAudioParams = {
	engine: IEngine
}
export function handleEnemyDeathAudio(params: THandleEnemyDeathAudioParams) {
	const { engine} = params

	engine.audioManager.playSound(AUDIO.ENEMY_DEATH)
}


type TGetRandomEnemyParams = {
	engine: IEngine,
	boss?: boolean,
	enemy_id?: string
}
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
