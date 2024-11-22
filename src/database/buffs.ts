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
import iconRocket1 from '@/assets/images/buffs/rocket_1.png';
import iconTarget1 from '@/assets/images/buffs/target_1.png';
import iconTarget2 from '@/assets/images/buffs/target_2.png';
import iconArmorLight from '@/assets/images/buffs/armor_light.png';
import iconArmorMedium from '@/assets/images/buffs/armor_medium.png';
import iconArmorHeavy from '@/assets/images/buffs/armor_heavy.png';
import iconCriticalChance from '@/assets/images/buffs/crit_chance.png';
import iconCriticalPower from '@/assets/images/buffs/crit_power.png';
import iconSlowMotion from '@/assets/images/buffs/slow_motion.png';

export const BUFFS_IDS = {
	ENEMY_DETECTION_RADIUS: 'ENEMY_DETECTION_RADIUS',
	PLAYER_ARMOR_HEAVY: 'PLAYER_ARMOR_HEAVY',
	PLAYER_ARMOR_LIGHT: 'PLAYER_ARMOR_LIGHT',
	PLAYER_ARMOR_MEDIUM: 'PLAYER_ARMOR_MEDIUM',
	PLAYER_BULLET_CRITICAL_CHANCE: 'PLAYER_BULLET_CRITICAL_CHANCE',
	PLAYER_BULLET_CRITICAL_POWER: 'PLAYER_BULLET_CRITICAL_POWER',
	PLAYER_BULLET_PENETRATION: 'PLAYER_BULLET_PENETRATION',
	PLAYER_INVINCIBILITY: 'PLAYER_INVINCIBILITY',
	SHOOT_ACCURACY: 'SHOOT_ACCURACY',
	SHOOT_BULLET_SPEED: 'SHOOT_BULLET_SPEED',
	SHOOT_DAMAGE: 'SHOOT_DAMAGE',
	SHOOT_IN_CON_FORWARD: 'SHOOT_IN_CON_FORWARD',
	SHOOT_MULTIPLE_TARGETS: 'SHOOT_MULTIPLE_TARGETS',
	SHOOT_SPEED: 'SHOOT_SPEED',
	TIME_SLOW_MOTION: 'TIME_SLOW_MOTION',
}
export const BUFF_ICONS = {
	[BUFFS_IDS.ENEMY_DETECTION_RADIUS]: iconCrosshair1,
	[BUFFS_IDS.PLAYER_ARMOR_HEAVY]: iconArmorHeavy,
	[BUFFS_IDS.PLAYER_ARMOR_LIGHT]: iconArmorLight,
	[BUFFS_IDS.PLAYER_ARMOR_MEDIUM]: iconArmorMedium,
	[BUFFS_IDS.PLAYER_BULLET_CRITICAL_CHANCE]: iconCriticalChance,
	[BUFFS_IDS.PLAYER_BULLET_CRITICAL_POWER]: iconCriticalPower,
	[BUFFS_IDS.PLAYER_BULLET_PENETRATION]: iconRocket1,
	[BUFFS_IDS.PLAYER_INVINCIBILITY]: iconHearth2,
	[BUFFS_IDS.SHOOT_ACCURACY]: iconTarget2,
	[BUFFS_IDS.SHOOT_BULLET_SPEED]: iconBullet2,
	[BUFFS_IDS.SHOOT_DAMAGE]: iconBullet1,
	[BUFFS_IDS.SHOOT_IN_CON_FORWARD]: iconBullet4,
	[BUFFS_IDS.SHOOT_MULTIPLE_TARGETS]: iconTarget1,
	[BUFFS_IDS.SHOOT_SPEED]: iconAutoGun2,
	[BUFFS_IDS.TIME_SLOW_MOTION]: iconSlowMotion,
}

export const BUFF_PROP = {
	ENEMY_DETECTION_RADIUS: 'ENEMY_DETECTION_RADIUS', // Скорость полета пуль
	ENEMY_FREEZE_MOVEMENT: 'ENEMY_FREEZE_MOVEMENT', // Урон от выстрела
	ENEMY_POISON: 'ENEMY_POISON', // Количество атакуемых целей
	PLAYER_ARMOR: 'PLAYER_ARMOR', // Радиус обнаружения врагов
	PLAYER_BULLET_CRITICAL_CHANCE: 'PLAYER_BULLET_CRITICAL_CHANCE', // Скорость полета пули
	PLAYER_BULLET_CRITICAL_POWER: 'PLAYER_BULLET_CRITICAL_POWER', // Стрельба в конусе перед собой
	PLAYER_BULLET_PENETRATION: 'PLAYER_BULLET_PENETRATION', // Стрельба во все стороны
	PLAYER_DODGE_CHANCE: 'PLAYER_DODGE_CHANCE', // Точность стрельбы
	PLAYER_DOUBLE_EXPERIENCE: 'PLAYER_DOUBLE_EXPERIENCE', // Неуязвимость игрока
	PLAYER_FIRE_SHIELD: 'PLAYER_FIRE_SHIELD', // Броня игрока
	PLAYER_INVINCIBLE: 'PLAYER_INVINCIBLE', // шанс пули не исчезнуть и пройти через врага
	PLAYER_LIFE_STEAL: 'PLAYER_LIFE_STEAL',
	PLAYER_RESURRECTION: 'PLAYER_RESURRECTION',
	SHOOT_ACCURACY: 'SHOOT_ACCURACY', // Замедление времени
	SHOOT_AROUND_PLAYER: 'SHOOT_AROUND_PLAYER', // Замедление задетых врагов
	SHOOT_BULLET_SPEED: 'SHOOT_BULLET_SPEED', // Регулярное восстановление здоровья игрока
	SHOOT_DAMAGE: 'SHOOT_DAMAGE', // Шанс уклониться от атаки врага
	SHOOT_IN_CON_FORWARD: 'SHOOT_IN_CON_FORWARD', // Игрок восстанавливает здоровье, нанося урон врагам
	SHOOT_SPEED: 'SHOOT_SPEED', // Огонь, наносящий урон врагам рядом с игроком
	SHOOT_TARGETS: 'SHOOT_TARGETS', // Враги получают урон от яда в течение времени
	TIME_SLOW_MOTION: 'TIME_SLOW_MOTION', // Возможность один раз воскреснуть после смерти
}
export const BUFF_PROP_ICONS = {
	[BUFF_PROP.ENEMY_DETECTION_RADIUS]: iconCrosshair1,
	[BUFF_PROP.PLAYER_ARMOR]: iconArmorLight,
	[BUFF_PROP.PLAYER_BULLET_CRITICAL_CHANCE]: iconCriticalChance,
	[BUFF_PROP.PLAYER_BULLET_CRITICAL_POWER]: iconCriticalPower,
	[BUFF_PROP.PLAYER_BULLET_PENETRATION]: iconRocket1,
	[BUFF_PROP.PLAYER_INVINCIBLE]: iconHearth2,
	[BUFF_PROP.SHOOT_ACCURACY]: iconTarget2,
	[BUFF_PROP.SHOOT_BULLET_SPEED]: iconBullet2,
	[BUFF_PROP.SHOOT_DAMAGE]: iconBullet1,
	[BUFF_PROP.SHOOT_IN_CON_FORWARD]: iconBullet4,
	[BUFF_PROP.SHOOT_SPEED]: iconAutoGun2,
	[BUFF_PROP.SHOOT_TARGETS]: iconTarget1,
	[BUFF_PROP.TIME_SLOW_MOTION]: iconSlowMotion,
}
export const BUFF_PROP_TEXT = {
	[BUFF_PROP.ENEMY_DETECTION_RADIUS]: 'Detect radius',
	[BUFF_PROP.PLAYER_ARMOR]: 'Armor',
	[BUFF_PROP.PLAYER_BULLET_CRITICAL_CHANCE]: 'Critical chance',
	[BUFF_PROP.PLAYER_BULLET_CRITICAL_POWER]: 'Critical hit power',
	[BUFF_PROP.PLAYER_BULLET_PENETRATION]: 'Bullet penetration',
	[BUFF_PROP.PLAYER_INVINCIBLE]: 'Player invincible',
	[BUFF_PROP.SHOOT_ACCURACY]: 'Accuracy',
	[BUFF_PROP.SHOOT_BULLET_SPEED]: 'Bullet speed',
	[BUFF_PROP.SHOOT_DAMAGE]: 'Damage deal',
	[BUFF_PROP.SHOOT_IN_CON_FORWARD]: 'Shoot in con',
	[BUFF_PROP.SHOOT_SPEED]: 'Shoot speed',
	[BUFF_PROP.SHOOT_TARGETS]: 'Targets count',
	[BUFF_PROP.TIME_SLOW_MOTION]: 'Passing of time',
}

export default [
	{
		id: BUFFS_IDS.TIME_SLOW_MOTION,
		name: "Temporal Slowdown",
		description: "Slows down time, giving you more control in intense situations.",
		icon: BUFF_ICONS[BUFFS_IDS.TIME_SLOW_MOTION],
		rarity: RARE.ARCANA,
		effect: {
			type: BUFF_PROP.TIME_SLOW_MOTION,
			value: 0.5
		}
	},
	{
		id: BUFFS_IDS.PLAYER_BULLET_CRITICAL_CHANCE,
		name: "Critical Strike Chance",
		description: "Increases the chance for your bullets to deal critical damage.",
		icon: BUFF_ICONS[BUFFS_IDS.PLAYER_BULLET_CRITICAL_CHANCE],
		rarity: RARE.LEGENDARY,
		effect: {
			type: BUFF_PROP.PLAYER_BULLET_CRITICAL_CHANCE,
			value: 0.05
		}
	},
	{
		id: BUFFS_IDS.PLAYER_BULLET_CRITICAL_POWER,
		name: "Critical Damage Boost",
		description: "Enhances the damage dealt by critical hits.",
		icon: BUFF_ICONS[BUFFS_IDS.PLAYER_BULLET_CRITICAL_POWER],
		rarity: RARE.RARE,
		effect: {
			type: BUFF_PROP.PLAYER_BULLET_CRITICAL_POWER,
			value: 0.1
		}
	},
	{
		id: BUFFS_IDS.PLAYER_BULLET_PENETRATION,
		name: "Bullet Penetration",
		description: "Grants your bullets a chance to pierce through enemies.",
		icon: BUFF_ICONS[BUFFS_IDS.PLAYER_BULLET_PENETRATION],
		rarity: RARE.RARE,
		effect: {
			type: BUFF_PROP.PLAYER_BULLET_PENETRATION,
			value: 1
		}
	},
	{
		id: BUFFS_IDS.SHOOT_SPEED,
		name: "Rapid Fire",
		description: "Boosts your shooting speed, allowing you to fire faster.",
		icon: BUFF_ICONS[BUFFS_IDS.SHOOT_SPEED],
		rarity: RARE.UNCOMMON,
		effect: {
			type: BUFF_PROP.SHOOT_SPEED,
			value: 0.2
		}
	},
	{
		id: BUFFS_IDS.PLAYER_ARMOR_LIGHT,
		name: "Armor - Light",
		description: "Provides minimal protection, increasing your armor slightly.",
		icon: BUFF_ICONS[BUFFS_IDS.PLAYER_ARMOR_LIGHT],
		rarity: RARE.COMMON,
		effect: {
			type: BUFF_PROP.PLAYER_ARMOR,
			value: 1
		}
	},
	{
		id: BUFFS_IDS.PLAYER_ARMOR_MEDIUM,
		name: "Armor - Medium",
		description: "Offers moderate protection, increasing your armor significantly.",
		icon: BUFF_ICONS[BUFFS_IDS.PLAYER_ARMOR_MEDIUM],
		rarity: RARE.UNCOMMON,
		effect: {
			type: BUFF_PROP.PLAYER_ARMOR,
			value: 2
		}
	},
	{
		id: BUFFS_IDS.PLAYER_ARMOR_HEAVY,
		name: "Armor - Heavy",
		description: "Maximum protection, heavily boosts your armor.",
		icon: BUFF_ICONS[BUFFS_IDS.PLAYER_ARMOR_HEAVY],
		rarity: RARE.LEGENDARY,
		effect: {
			type: BUFF_PROP.PLAYER_ARMOR,
			value: 5
		}
	},
	{
		id: BUFFS_IDS.SHOOT_DAMAGE,
		name: "Damage Boost",
		description: "Enhances your firepower by increasing bullet damage.",
		icon: BUFF_ICONS[BUFFS_IDS.SHOOT_DAMAGE],
		rarity: RARE.COMMON,
		effect: {
			type: BUFF_PROP.SHOOT_DAMAGE,
			value: 1
		}
	},
	{
		id: BUFFS_IDS.SHOOT_ACCURACY,
		name: "Precision Shot",
		description: "Improves shooting accuracy, increasing hit probability.",
		icon: BUFF_ICONS[BUFFS_IDS.SHOOT_ACCURACY],
		rarity: RARE.COMMON,
		effect: {
			type: BUFF_PROP.SHOOT_ACCURACY,
			value: 0.1
		}
	},
	{
		id: BUFFS_IDS.SHOOT_MULTIPLE_TARGETS,
		name: "Multi-Targeting",
		description: "Allows you to shoot at an additional target simultaneously.",
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
		name: "Extended Detection",
		description: "Increases your attack range, allowing you to target distant enemies.",
		icon: BUFF_ICONS[BUFFS_IDS.ENEMY_DETECTION_RADIUS],
		rarity: RARE.RARE,
		effect: {
			type: BUFF_PROP.ENEMY_DETECTION_RADIUS,
			value: 0.2
		}
	},
	{
		id: BUFFS_IDS.SHOOT_IN_CON_FORWARD,
		name: "Cone Shot",
		description: "Fires three projectiles in a cone-shaped spread in front of you.",
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
		name: "Projectile Speed",
		description: "Increases the speed of your bullets, improving their impact time.",
		icon: BUFF_ICONS[BUFFS_IDS.SHOOT_BULLET_SPEED],
		rarity: RARE.COMMON,
		effect: {
			type: BUFF_PROP.SHOOT_BULLET_SPEED,
			value: 1
		}
	},
	{
		id: BUFFS_IDS.PLAYER_INVINCIBILITY,
		name: "Invincibility",
		description: "Grants temporary immunity to all damage for a short time.",
		icon: BUFF_ICONS[BUFFS_IDS.PLAYER_INVINCIBILITY],
		rarity: RARE.LEGENDARY,
		duration: 8,
		effect: {
			type: BUFF_PROP.PLAYER_INVINCIBLE,
			value: 1
		}
	}
]

