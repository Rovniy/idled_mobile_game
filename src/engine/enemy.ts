// src/engine/enemy.js

import enemiesData from '../database/enemies';
import {IEnemy, IEngine} from "@/types";
import { AUDIO } from "./audio";
import {getRandomValue} from "@/utils/helpers";

// Enemy assets
import enemyBallSrc from '@/assets/images/enemies/enemy_ball.png';
import enemyBlueSrc from '@/assets/images/enemies/enemy_blue.png';
import enemyDiabloSrc from '@/assets/images/enemies/enemy_diablo.png';
import enemyEyeSrc from '@/assets/images/enemies/enemy_eye.png';
import enemyFastSrc from '@/assets/images/enemies/enemy_fast.png';
import enemyLightSrc from '@/assets/images/enemies/enemy_light.png';
import enemyOrangeSrc from '@/assets/images/enemies/enemy_orange.png';
import enemyRedSrc from '@/assets/images/enemies/enemy_red.png';
import enemyScarySrc from '@/assets/images/enemies/enemy_scary.png';
import enemySimpleSrc from '@/assets/images/enemies/enemy_simple.png';
import enemySpiderSrc from '@/assets/images/enemies/enemy_spider.png';
import enemyTreeSrc from '@/assets/images/enemies/enemy_tree.png';

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

const IMAGE_MAP = {
	'enemy_ball': enemyBallSrc,
	'enemy_blue': enemyBlueSrc,
	'enemy_diablo': enemyDiabloSrc,
	'enemy_eye': enemyEyeSrc,
	'enemy_fast': enemyFastSrc,
	'enemy_light': enemyLightSrc,
	'enemy_orange': enemyOrangeSrc,
	'enemy_red': enemyRedSrc,
	'enemy_scary': enemyScarySrc,
	'enemy_simple': enemySimpleSrc,
	'enemy_spider': enemySpiderSrc,
	'enemy_tree': enemyTreeSrc,
}

export function loadEnemiesData() : IEnemy[] {
	return enemiesData.map((enemy: IEnemy) : IEnemy => {
		const img = new Image();
		img.src = IMAGE_MAP[enemy.image];

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
	engine: IEngine
}
export function spawnEnemy(params: TSpawnEnemy) {
	const DEFAULT_SIZE = 40;
	const { engine } = params
	const { enemies, player, canvas, loadedEnemies } = engine

	// Выбираем случайный тип врага
	const enemyType = loadedEnemies[Math.floor(Math.random() * loadedEnemies.length)];

	// Вычисляем позицию появления врага
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
