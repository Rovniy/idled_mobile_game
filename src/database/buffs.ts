import { RARE } from './rare'

import iconAutoGun1 from '@/assets/images/buffs/auto_gun_1.png';
import iconAutoGun2 from '@/assets/images/buffs/auto_gun_2.png';
import iconBoom1 from '@/assets/images/buffs/boom_1.png';
import iconBullet1 from '@/assets/images/buffs/bullet_1.png';
import iconBullet2 from '@/assets/images/buffs/bullet_2.png';
import iconBullet3 from '@/assets/images/buffs/bullet_3.png';
import iconBullet4 from '@/assets/images/buffs/bullet_4.png';
import iconBush from '@/assets/images/buffs/bush.png';
import iconCannon1 from '@/assets/images/buffs/cannon_1.png';
import iconCannon2 from '@/assets/images/buffs/cannon_2.png';
import iconCrosshair1 from '@/assets/images/buffs/crosshair_1.png';
import iconCrosshair2 from '@/assets/images/buffs/crosshair_2.png';
import iconCube from '@/assets/images/buffs/cube.png';
import iconCubeExplosive from '@/assets/images/buffs/cube_explosive.png';
import iconDamage from '@/assets/images/buffs/damage_icon.svg';
import iconExplosive from '@/assets/images/buffs/explosive.png';
import iconGrenade1 from '@/assets/images/buffs/grenade_1.png';
import iconGrenade2 from '@/assets/images/buffs/grenade_2.png';
import iconHearth1 from '@/assets/images/buffs/hearth_1.png';
import iconHearth2 from '@/assets/images/buffs/hearth_2.png';
import iconHexagonFlame from '@/assets/images/buffs/hexagon_flame.png';
import iconHexagonIce from '@/assets/images/buffs/hexagon_ice.png';
import iconIceCrystal from '@/assets/images/buffs/ice_crystal.png';
import iconIceCube from '@/assets/images/buffs/ice_cube.png';
import iconIcePilons from '@/assets/images/buffs/ice_pilons.png';
import iconRocket11 from '@/assets/images/buffs/rocket_1.png';
import iconTarget1 from '@/assets/images/buffs/target_1.png';
import iconTarget2 from '@/assets/images/buffs/target_2.png';

export const BUFFS_IDS = {
	SHOOT_SPEED: 'SHOOT_SPEED',
	SHOOT_DAMAGE: 'SHOOT_DAMAGE',
	SHOOT_ACCURACY: 'SHOOT_ACCURACY',
	SHOOT_MULTIPLE_TARGETS: 'SHOOT_MULTIPLE_TARGETS',
	ENEMY_DETECTION_RADIUS: 'ENEMY_DETECTION_RADIUS',
	SHOOT_IN_CON_FORWARD: 'SHOT_IN_CON_FORWARD',
	SHOOT_BULLET_SPEED: 'SHOT_BULLET_SPEED',
	PLAYER_INVINCIBILITY: 'PLAYER_INVINCIBILITY',
}
export const BUFF_ICONS = {
	[BUFFS_IDS.SHOOT_SPEED]: iconAutoGun2,
	[BUFFS_IDS.SHOOT_DAMAGE]: iconBullet1,
	[BUFFS_IDS.SHOOT_MULTIPLE_TARGETS]: iconTarget1,
	[BUFFS_IDS.ENEMY_DETECTION_RADIUS]: iconCrosshair1,
	[BUFFS_IDS.SHOOT_IN_CON_FORWARD]: iconBullet4,
	[BUFFS_IDS.SHOOT_BULLET_SPEED]: iconBullet2,
	[BUFFS_IDS.SHOOT_ACCURACY]: iconTarget2,
	[BUFFS_IDS.PLAYER_INVINCIBILITY]: iconHearth2,
}

export const BUFF_PROP = {
	SHOOT_SPEED: 'SHOOT_SPEED',
	SHOOT_DAMAGE: 'SHOOT_DAMAGE',
	SHOOT_TARGETS: 'SHOOT_TARGETS',
	ENEMY_DETECTION_RADIUS: 'ENEMY_DETECTION_RADIUS',
	SHOOT_BULLET_SPEED: 'SHOOT_BULLET_SPEED',
	SHOOT_IN_CON_FORWARD: 'SHOOT_IN_CON_FORWARD',
	SHOOT_ACCURACY: 'SHOOT_ACCURACY',
	PLAYER_INVINCIBLE: 'PLAYER_INVINCIBLE',
}
export const BUFF_PROP_ICONS = {
	[BUFF_PROP.SHOOT_SPEED]: iconAutoGun2,
	[BUFF_PROP.SHOOT_DAMAGE]: iconBullet1,
	[BUFF_PROP.SHOOT_TARGETS]: iconTarget1,
	[BUFF_PROP.ENEMY_DETECTION_RADIUS]: iconCrosshair1,
	[BUFF_PROP.SHOOT_IN_CON_FORWARD]: iconBullet4,
	[BUFF_PROP.SHOOT_BULLET_SPEED]: iconBullet2,
	[BUFF_PROP.SHOOT_ACCURACY]: iconTarget2,
	[BUFF_PROP.PLAYER_INVINCIBLE]: iconHearth2,
}

export default [
	{
		id: BUFFS_IDS.SHOOT_SPEED,
		name: "Увеличить скорость стрельбы",
		description: "Увеличивает скорость стрельбы на 1.",
		icon: BUFF_ICONS[BUFFS_IDS.SHOOT_SPEED],
		rarity: RARE.UNCOMMON,
		effect: {
			type: BUFF_PROP.SHOOT_SPEED,
			value: 1
		}
	},
	{
		id: BUFFS_IDS.SHOOT_DAMAGE,
		name: "Увеличить урон",
		description: "Увеличивает урон на 5.",
		icon: BUFF_ICONS[BUFFS_IDS.SHOOT_DAMAGE],
		rarity: RARE.COMMON,
		effect: {
			type: BUFF_PROP.SHOOT_DAMAGE,
			value: 5
		}
	},
	{
		id: BUFFS_IDS.SHOOT_ACCURACY,
		name: "Повышение точности",
		description: "Увеличивает точность стрельбы на 10%.",
		icon: BUFF_ICONS[BUFFS_IDS.SHOOT_ACCURACY],
		rarity: RARE.COMMON,
		effect: {
			type: BUFF_PROP.SHOOT_ACCURACY,
			value: 0.1
		}
	},
	{
		id: BUFFS_IDS.SHOOT_MULTIPLE_TARGETS,
		name: "Добавить цель",
		description: "Добавляет 1 новую цель для стрельбы.",
		icon: BUFF_ICONS[BUFFS_IDS.SHOOT_MULTIPLE_TARGETS],
		rarity: RARE.COMMON,
		duration: 10,
		effect: {
			type: BUFF_PROP.SHOOT_TARGETS,
			value: 1
		}
	},
	{
		id: BUFFS_IDS.ENEMY_DETECTION_RADIUS,
		name: "Увеличить радиус атаки",
		description: "Увеличивает радиус атаки на 20%.",
		icon: BUFF_ICONS[BUFFS_IDS.ENEMY_DETECTION_RADIUS],
		rarity: RARE.RARE,
		effect: {
			type: BUFF_PROP.ENEMY_DETECTION_RADIUS,
			value: 0.2
		}
	},
	{
		id: BUFFS_IDS.SHOOT_IN_CON_FORWARD,
		name: "Конусный выстрел",
		description: "Позволяет стрелять сразу 3 снарядами конусом перед собой.",
		icon: BUFF_ICONS[BUFFS_IDS.SHOOT_IN_CON_FORWARD],
		rarity: RARE.RARE,
		duration: 10,
		effect: {
			type: BUFF_PROP.SHOOT_IN_CON_FORWARD,
			value: 1
		}
	},
	{
		id: BUFFS_IDS.SHOOT_BULLET_SPEED,
		name: "Увеличить скорость снарядов",
		description: "Увеличивает скорость снарядов на 1.",
		icon: BUFF_ICONS[BUFFS_IDS.SHOOT_BULLET_SPEED],
		rarity: RARE.COMMON,
		effect: {
			type: BUFF_PROP.SHOOT_BULLET_SPEED,
			value: 1
		}
	},
	{
		id: BUFFS_IDS.PLAYER_INVINCIBILITY,
		name: "Неуязвимость",
		description: "Делает вас неуязвимым на 5 секунд.",
		icon: BUFF_ICONS[BUFFS_IDS.PLAYER_INVINCIBILITY],
		rarity: RARE.LEGENDARY,
		duration: 8,
		effect: {
			type: BUFF_PROP.PLAYER_INVINCIBLE,
			value: true
		}
	}
]
