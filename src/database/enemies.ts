import { DROP_IDS } from './drops'

// Enemy assets
import CopperJugger from '@/assets/images/enemies/copper_jugger.png';
import DarkHornet from '@/assets/images/enemies/dark_hornet.png';
import EmberCreeper from '@/assets/images/enemies/ember_creeper.png';
import FieryOrb from '@/assets/images/enemies/fiery_orb.png';
import FlameCrawler from '@/assets/images/enemies/flame_crawler.png';
import FlameGremlin from '@/assets/images/enemies/flame_gremlin.png';
import FrostImp from '@/assets/images/enemies/frost_imp.png';
import GooeyMaw from '@/assets/images/enemies/gooey_maw.png';
import HellRam from '@/assets/images/enemies/hell_ram.png';
import HornedBrawler from '@/assets/images/enemies/horned_brawler.png';
import MinotaurMimic from '@/assets/images/enemies/minotaur_mimic.png';
import MolkenSkull from '@/assets/images/enemies/molken_skull.png';
import MossyBeast from '@/assets/images/enemies/mossy_beast.png';
import OculaBlob from '@/assets/images/enemies/ocula_blob.png';
import OrangeWisp from '@/assets/images/enemies/orange_wisp.png';
import RadFang from '@/assets/images/enemies/rad_fang.png';
import RainbowStinger from '@/assets/images/enemies/rainbow_stinger.png';
import ShadowDemon from '@/assets/images/enemies/shadow_demon.png';
import SporaWarrior from '@/assets/images/enemies/spora_warrior.png';
import StickyBlob from '@/assets/images/enemies/sticky_blob.png';
import TentacleBlob from '@/assets/images/enemies/tentacle_bob.png';
import TinyTerror from '@/assets/images/enemies/tiny_terror.png';
import TwinkleEye from '@/assets/images/enemies/twinkle_eye.png';
import TwistedClaw from '@/assets/images/enemies/twisted_claw.png';


const ENEMY_IDS = {
	RED: 'RED',
}

const ENEMY = {
	BOSS_FROST_IMP: FrostImp,
	BOSS_GOOEY_MAW: GooeyMaw,
	BOSS_MOSSY_BEAST: MossyBeast,
	BOSS_RED_FANG: RadFang,
	BOSS_SPORE_WARRIOR: SporaWarrior,
	MOB_COPPER_JUGGER: CopperJugger,
	MOB_DARK_HORNET: DarkHornet,
	MOB_EMBER_CREEPER: EmberCreeper,
	MOB_FIERY_ORB: FieryOrb,
	MOB_FLAME_CRAWLER: FlameCrawler,
	MOB_FLAME_GREMLIN: FlameGremlin,
	MOB_HELL_RAM: HellRam,
	MOB_HORNED_BRAWLER: HornedBrawler,
	MOB_MINOTAUR_MIMIC: MinotaurMimic,
	MOB_MOLTEN_SKULL: MolkenSkull,
	MOB_OCULA_BLOB: OculaBlob,
	MOB_ORANGE_WISP: OrangeWisp,
	MOB_RAINBOW_STINGER: RainbowStinger,
	MOB_SHADOW_DEMON: ShadowDemon,
	MOB_STICKY_BLOB: StickyBlob,
	MOB_TENTACLE_BOB: TentacleBlob,
	MOB_TINY_TERROR: TinyTerror,
	MOB_TWINKLE_EYE: TwinkleEye,
	MOB_TWISTED_CLAW: TwistedClaw,
};


export const ENEMY_DEBUG = {
	enable: false,
	enemy_id: ENEMY_IDS.RED,
	count: 5
}

export default [
	{
		id: 'MOB_FLAME_GREMLIN',
		name: 'Flame Gremlin',
		hp: 6,
		damage: 5,
		speed: 0.6,
		experience: 12,
		image: ENEMY.MOB_FLAME_GREMLIN,
		drops: [
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.06 },
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.1 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.19 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.14 }
		],
		width: 60,
		height: 60,
		wobble: {offset: 0.1, intensity: 0.15, speed: 0.08}
	}, {
		id: 'MOB_OCULA_BLOB',
		name: 'Ocula Blob',
		hp: 4,
		damage: 3,
		speed: 0.5,
		experience: 9,
		image: ENEMY.MOB_OCULA_BLOB,
		drops: [
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.15 },
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.09 }
		],
		width: 50,
		height: 50,
		wobble: {offset: 0.05, intensity: 0.1, speed: 0.05}
	}, {
		id: 'MOB_HORNED_BRAWLER',
		name: 'Horned Brawler',
		hp: 7,
		damage: 6,
		speed: 0.7,
		experience: 13,
		image: ENEMY.MOB_HORNED_BRAWLER,
		drops: [
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.17 },
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.16 }
		],
		width: 70,
		height: 70,
		wobble: {offset: 0.15, intensity: 0.2, speed: 0.07}
	}, {
		id: 'BOSS_MOSSY_BEAST',
		boss: true,
		name: 'Mossy Beast',
		hp: 30,
		damage: 80,
		speed: 0.1,
		experience: 500,
		image: ENEMY.BOSS_MOSSY_BEAST,
		drops: [
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.08 },
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.1 },
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.15 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.09 }
		],
		width: 150,
		height: 150,
		wobble: {offset: 0.2, intensity: 0.15, speed: 0.06}
	}, {
		id: 'MOB_EMBER_CREEPER',
		name: 'Ember Creeper',
		hp: 5,
		damage: 5,
		speed: 0.8,
		experience: 10,
		image: ENEMY.MOB_EMBER_CREEPER,
		drops: [
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.19 },
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.2 },
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.05 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.09 }
		],
		width: 60,
		height: 60,
		wobble: {offset: 0.1, intensity: 0.2, speed: 0.08}
	}, {
		id: 'MOB_DARK_HORNET',
		name: 'Dark Hornet',
		hp: 7,
		damage: 7,
		speed: 0.5,
		experience: 15,
		image: ENEMY.MOB_DARK_HORNET,
		drops: [
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.17 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.07 },
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.16 },
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.09 }
		],
		width: 60,
		height: 60,
		wobble: {offset: 0.1, intensity: 0.25, speed: 0.04}
	}, {
		id: 'BOSS_FROST_IMP',
		boss: true,
		name: 'Frost Imp',
		hp: 25,
		damage: 60,
		speed: 0.15,
		experience: 500,
		image: ENEMY.BOSS_FROST_IMP,
		drops: [
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.18 }
		],
		width: 150,
		height: 150,
		wobble: {offset: 0.05, intensity: 0.1, speed: 0.03}
	}, {
		id: 'MOB_SHADOW_DEMON',
		name: 'Shadow Demon',
		hp: 8,
		damage: 8,
		speed: 0.4,
		experience: 17,
		image: ENEMY.MOB_SHADOW_DEMON,
		drops: [
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.11 },
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.08 },
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.14 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.05 }
		],
		width: 40,
		height: 40,
		wobble: {offset: 0.2, intensity: 0.3, speed: 0.05}
	}, {
		id: 'MOB_TENTACLE_BOB',
		name: 'Tentacle Bob',
		hp: 4,
		damage: 3,
		speed: 0.7,
		experience: 9,
		image: ENEMY.MOB_TENTACLE_BOB,
		drops: [
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.12 },
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.18 }
		],
		width: 60,
		height: 60,
		wobble: {offset: 0.05, intensity: 0.15, speed: 0.06}
	}, {
		id: 'MOB_RAINBOW_STINGER',
		name: 'Rainbow Stinger',
		hp: 5,
		damage: 4,
		speed: 0.8,
		experience: 10,
		image: ENEMY.MOB_RAINBOW_STINGER,
		drops: [
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.13 }
		],
		width: 50,
		height: 50,
		wobble: {offset: 0.1, intensity: 0.2, speed: 0.08}
	}, {
		id: 'MOB_TWISTED_CLAW',
		name: 'Twisted Claw',
		hp: 6,
		damage: 5,
		speed: 0.7,
		experience: 12,
		image: ENEMY.MOB_TWISTED_CLAW,
		drops: [
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.13 }
		],
		width: 50,
		height: 50,
		wobble: {offset: 0.1, intensity: 0.2, speed: 0.07}
	}, {
		id: 'MOB_TINY_TERROR',
		name: 'Tiny Terror',
		hp: 5,
		damage: 5,
		speed: 0.5,
		experience: 11,
		image: ENEMY.MOB_TINY_TERROR,
		drops: [
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.17 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.09 }
		],
		width: 30,
		height: 30,
		wobble: {offset: 0.15, intensity: 0.25, speed: 0.09}
	}, {
		id: 'BOSS_GOOEY_MAW',
		boss: true,
		name: 'Gooey Maw',
		hp: 30,
		damage: 70,
		speed: 0.2,
		experience: 500,
		image: ENEMY.BOSS_GOOEY_MAW,
		drops: [
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.17 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.14 },
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.09 }
		],
		width: 150,
		height: 150,
		wobble: {offset: 0.2, intensity: 0.2, speed: 0.04}
	}, {
		id: 'MOB_HELL_RAM',
		name: 'Hell Ram',
		hp: 9,
		damage: 7,
		speed: 0.5,
		experience: 16,
		image: ENEMY.MOB_HELL_RAM,
		drops: [
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.12 },
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.16 },
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.17 },
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.11 }
		],
		width: 60,
		height: 60,
		wobble: {offset: 0.1, intensity: 0.3, speed: 0.05}
	}, {
		id: 'MOB_FLAME_CRAWLER',
		name: 'Flame Crawler',
		hp: 1,
		damage: 6,
		speed: 0.7,
		experience: 11,
		image: ENEMY.MOB_FLAME_CRAWLER,
		drops: [
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.19 },
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.16 }
		],
		width: 30,
		height: 30,
		wobble: {offset: 0.1, intensity: 0.25, speed: 0.08}
	}, {
		id: 'BOSS_SPORE_WARRIOR',
		boss: true,
		name: 'Spora Warrior',
		hp: 30,
		damage: 75,
		speed: 0.25,
		experience: 500,
		image: ENEMY.BOSS_SPORE_WARRIOR,
		drops: [
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.13 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.07 }
		],
		width: 150,
		height: 150,
		wobble: {offset: 0.1, intensity: 0.1, speed: 0.06}
	}, {
		id: 'MOB_MINOTAUR_MIMIC',
		name: 'Minotaur Mimic',
		hp: 9,
		damage: 8,
		speed: 0.4,
		experience: 18,
		image: ENEMY.MOB_MINOTAUR_MIMIC,
		drops: [
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.16 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.14 },
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.2 }
		],
		width: 70,
		height: 70,
		wobble: {offset: 0.15, intensity: 0.2, speed: 0.05}
	}, {
		id: 'MOB_ORANGE_WISP',
		name: 'Blue Wisp',
		hp: 3,
		damage: 4,
		speed: 0.8,
		experience: 7,
		image: ENEMY.MOB_ORANGE_WISP,
		drops: [
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.13 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.12 },
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.1 },
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.11 }
		],
		width: 60,
		height: 60,
		wobble: {offset: 0.05, intensity: 0.1, speed: 0.07}
	}, {
		id: 'BOSS_RED_FANG',
		boss: true,
		name: 'Red Fang',
		hp: 30,
		damage: 75,
		speed: 0.15,
		experience: 500,
		image: ENEMY.BOSS_RED_FANG,
		drops: [
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.19 },
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.13 },
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.19 },
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.1 }
		],
		width: 150,
		height: 150,
		wobble: {offset: 0.1, intensity: 0.15, speed: 0.06}
	}, {
		id: 'MOB_COPPER_JUGGER',
		name: 'Copper Jugger',
		hp: 7,
		damage: 6,
		speed: 0.4,
		experience: 14,
		image: ENEMY.MOB_COPPER_JUGGER,
		drops: [
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.15 }
		],
		width: 40,
		height: 40,
		wobble: {offset: 0.2, intensity: 0.2, speed: 0.04}
	}, {
		id: 'MOB_FIERY_ORB',
		name: 'Fiery Orb',
		hp: 3,
		damage: 7,
		speed: 1.0,
		experience: 10,
		image: ENEMY.MOB_FIERY_ORB,
		drops: [
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.2 },
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.06 }
		],
		width: 30,
		height: 30,
		wobble: {offset: 0.1, intensity: 0.3, speed: 0.09}
	}, {
		id: 'MOB_MOLTEN_SKULL',
		name: 'Molten Skull',
		hp: 4,
		damage: 6,
		speed: 0.6,
		experience: 11,
		image: ENEMY.MOB_MOLTEN_SKULL,
		drops: [
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.16 },
			{ id: DROP_IDS.HEALTH_ELIXIR_SMALL, chance: 0.09 }
		],
		width: 70,
		height: 70,
		wobble: {offset: 0.15, intensity: 0.2, speed: 0.07}
	}, {
		id: 'MOB_STICKY_BLOB',
		name: 'Sticky Blob',
		hp: 8,
		damage: 4,
		speed: 0.3,
		experience: 13,
		image: ENEMY.MOB_STICKY_BLOB,
		drops: [
			{ id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL, chance: 0.13 },
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.16 },
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.16 },
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.06 }
		],
		width: 50,
		height: 50,
		wobble: {offset: 0.2, intensity: 0.15, speed: 0.04}
	}, {
		id: 'MOB_TWINKLE_EYE',
		name: 'Twinkle Eye',
		hp: 5,
		damage: 3,
		speed: 0.8,
		experience: 9,
		image: ENEMY.MOB_TWINKLE_EYE,
		drops: [
			{ id: DROP_IDS.ARMOR_HEAVY_TEMP, chance: 0.17 },
			{ id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP, chance: 0.05 }
		],
		width: 70,
		height: 70,
		wobble: {offset: 0.05, intensity: 0.1, speed: 0.06}
	}
]


