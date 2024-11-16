import enemiesData from '../database/enemies';
import {IEnemy, IEngine} from "@/types";
import { AUDIO } from "./audio";
import {getRandomValue} from "@/utils/helpers";

// Enemy vfx
import poofVfx1 from '@/assets/images/vfx/poof_1.png';
import poofVfx2 from '@/assets/images/vfx/poof_2.png';
import poofVfx3 from '@/assets/images/vfx/poof_3.png';
import poofVfx4 from '@/assets/images/vfx/poof_4.png';

const VFX_DEATH = [
	poofVfx1,
	poofVfx2,
	poofVfx3,
	poofVfx4,
]

export function loadEnemiesData() : IEnemy[] {
	return enemiesData.map((enemy: IEnemy) : IEnemy => {
		const img = new Image();
		img.src = enemy.image;

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
	enemy_id?: string
}
export function spawnEnemy(params: TSpawnEnemy) {
	const DEFAULT_SIZE = 40;
	const { engine, enemy_id } = params
	const { enemies, player, canvas } = engine

	const enemyType = getEnemy({ engine, enemy_id })
	const side = Math.floor(Math.random() * 4);

	let x, y;
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

	const enemy : IEnemy = {
		...enemyType,
		x,
		y,
		width: enemyType?.width || DEFAULT_SIZE,
		height: enemyType?.height || DEFAULT_SIZE,
	};

	enemies.push(enemy);
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

	return loadedEnemies[Math.floor(Math.random() * loadedEnemies.length)];

}
