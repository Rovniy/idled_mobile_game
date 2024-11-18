import {BUFF_PROP, BUFFS_IDS} from "@/database/buffs";

import HpIcon from "@/assets/images/drops/hp.png";
import ExperienceIcon from "@/assets/images/drops/experience.png";
import MeteorIcon from "@/assets/images/drops/meteor.png";
import ArmorIcon from "@/assets/images/drops/armor.png";
import SlowMotionIcon from "@/assets/images/drops/slow_motion.png";

export const DROP_IDS = {
	HEALTH_ELIXIR_SMALL: 'HEALTH_ELIXIR_SMALL',
	EXPERIENCE_ELIXIR_SMALL: 'EXPERIENCE_ELIXIR_SMALL',
	ARMOR_HEAVY_TEMP: 'ARMOR_HEAVY_TEMP',
	INVINCIBILITY_BUFF_SMALL_TEMP: 'INVINCIBILITY_BUFF_SMALL_TEMP',
	TIME_SLOW_MOTION: 'TIME_SLOW_MOTION',
}
export const DROP_EFFECT = {
	PLAYER_INCREASE_HP: 'PLAYER_INCREASE_HP',
	PLAYER_ADD_EXP: 'PLAYER_ADD_EXP',
	PLAYER_ADD_ARMOR: 'PLAYER_ADD_ARMOR',
	PLAYER_DO_INVINCIBILITY: 'PLAYER_DO_INVINCIBILITY',
	TIME_SLOW_MOTION: 'TIME_SLOW_MOTION',
}
const DROP_ICON = {
	[DROP_IDS.HEALTH_ELIXIR_SMALL]: HpIcon,
	[DROP_IDS.EXPERIENCE_ELIXIR_SMALL]: ExperienceIcon,
	[DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP]: MeteorIcon,
	[DROP_IDS.ARMOR_HEAVY_TEMP]: ArmorIcon,
	[DROP_IDS.TIME_SLOW_MOTION]: SlowMotionIcon,
}

export default [
	{
		id: DROP_IDS.TIME_SLOW_MOTION,
		name: "Slow motion",
		description: "Slows down the passage of time",
		icon: DROP_ICON[DROP_IDS.TIME_SLOW_MOTION],
		duration: 5,
		effect: {
			type: DROP_EFFECT.TIME_SLOW_MOTION,
			buff: BUFFS_IDS.TIME_SLOW_MOTION,
			value: 2,
			duration: 5
		},
		pickupText: "Slow motion!"
	},
	{
		id: DROP_IDS.HEALTH_ELIXIR_SMALL,
		name: "HP Potion",
		description: "Restore 20 HP",
		icon: DROP_ICON[DROP_IDS.HEALTH_ELIXIR_SMALL],
		duration: 10,
		effect: {
			type: DROP_EFFECT.PLAYER_INCREASE_HP,
			value: 20
		},
		pickupText: "+20 HP"
	},
	{
		id: DROP_IDS.ARMOR_HEAVY_TEMP,
		name: "Heavy armor",
		description: "Add 5 armor for 10 seconds",
		icon: DROP_ICON[DROP_IDS.ARMOR_HEAVY_TEMP],
		duration: 10,
		effect: {
			type: BUFF_PROP.PLAYER_ARMOR,
			buff: BUFFS_IDS.PLAYER_ARMOR_HEAVY,
			value: 5,
			duration: 10
		},
		pickupText: "+5 Armor for 10 sec."
	},
	{
		id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL,
		name: "Experience elixir",
		description: "Increase experience by 50",
		icon:  DROP_ICON[DROP_IDS.EXPERIENCE_ELIXIR_SMALL],
		duration: 10,
		effect: {
			type: DROP_EFFECT.PLAYER_ADD_EXP,
			value: 50
		},
		pickupText: "+50 Exp"
	},
	{
		id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP,
		name: "Invincibility",
		description: "Gain Invincibility for 5 seconds",
		icon: DROP_ICON[DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP],
		duration: 10,
		effect: {
			type: BUFF_PROP.PLAYER_INVINCIBLE,
			buff: BUFFS_IDS.PLAYER_INVINCIBILITY,
			value: 1,
			duration: 5
		},
		pickupText: "Invincibility!"
	}
]
