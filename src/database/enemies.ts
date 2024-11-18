import { DROP_IDS } from "@/database/drops";

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

const ENEMY_IDS = {
	RED: 'RED',
}

const ENEMY = {
	MOB_SIMPLE: enemySimpleSrc,
	MOB_BLUE: enemyBlueSrc,
	MOB_DIABLO: enemyDiabloSrc,
	MOB_EYE: enemyEyeSrc,
	MOB_FAST: enemyFastSrc,
	MOB_LIGHT: enemyLightSrc,
	MOB_ORANGE: enemyOrangeSrc,
	MOB_RED: enemyRedSrc,
	MOB_SPIDER: enemySpiderSrc,
	MOB_TREE: enemyTreeSrc,
	BOSS_BALL: enemyBallSrc,
	BOSS_SCARY: enemyScarySrc,
}

export const ENEMY_DEBUG = {
	enable: true,
	enemy_id: ENEMY_IDS.RED,
	count: 5
}

export default [
	{
		id: ENEMY_IDS.RED,
		name: "Красный враг",
		hp: 10,
		damage: 10,
		speed: 0.2,
		experience: 11,
		image: ENEMY.MOB_SIMPLE,
		drops: [
			{
				id: DROP_IDS.ARMOR_HEAVY_TEMP,
				chance: 1
			},
			{
				id: DROP_IDS.HEALTH_ELIXIR_SMALL,
				chance: 0.3
			},
			{
				id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL,
				chance: 0.5
			}
		],
		width: 50,
		height: 50,
		wobble: {
			offset: 0,
			intensity: 0.1,
			speed: 0.05
		}
	},
	{
		id: "enemy2",
		name: "Желтый враг",
		hp: 1,
		damage: 5,
		speed: 1,
		experience: 1,
		image: ENEMY.MOB_BLUE,
		drops: [
			{
				id: DROP_IDS.ARMOR_HEAVY_TEMP,
				chance: 1
			},
			{
				id: DROP_IDS.HEALTH_ELIXIR_SMALL,
				chance: 0.3
			},
			{
				id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL,
				chance: 0.2
			},
			{
				id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP,
				chance: 0.1
			}
		],
		width: 100,
		height: 100,
		wobble: {
			offset: 0,
			intensity: 0.1,
			speed: 0.05
		}
	},
	{
		id: "enemy3",
		name: "Зеленый враг",
		hp: 1,
		damage: 20,
		speed: 0.3,
		experience: 1,
		image: ENEMY.MOB_DIABLO,
		drops: [
			{
				id: DROP_IDS.ARMOR_HEAVY_TEMP,
				chance: 1
			},
			{
				id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL,
				chance: 0.5
			},
			{
				id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP,
				chance: 0.1
			}
		],
		width: 80,
		height: 80,
		wobble: {
			offset: 0,
			intensity: 0.1,
			speed: 0.05
		}
	},
	{
		id: "boss1",
		boss: true,
		name: "Big Daddy boss",
		hp: 10,
		damage: 50,
		speed: 0.3,
		experience: 200,
		image: ENEMY.BOSS_SCARY,
		drops: [
			{
				id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL,
				chance: 1
			},
			{
				id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP,
				chance: 0.1
			}
		],
		width: 100,
		height: 100,
		wobble: {
			offset: 0,
			intensity: 0.1,
			speed: 0.05
		}
	}
]

