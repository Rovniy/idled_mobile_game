import { DROP_IDS } from "@/database/drops";

export default [
	{
		id: "enemy1",
		name: "Красный враг",
		hp: 1,
		damage: 10,
		speed: 2,
		experience: 11,
		image: "enemy_ball",
		drops: [
			{
				id: DROP_IDS.HEALTH_ELIXIR_SMALL,
				chance: 0.3
			},
			{
				id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL,
				chance: 1
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
		image: "enemy_blue",
		drops: [
			{
				id: DROP_IDS.HEALTH_ELIXIR_SMALL,
				chance: 0.3
			},
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
	},
	{
		id: "enemy3",
		name: "Зеленый враг",
		hp: 1,
		damage: 20,
		speed: 0.3,
		experience: 1,
		image: "enemy_diablo",
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
		width: 80,
		height: 80,
		wobble: {
			offset: 0,
			intensity: 0.1,
			speed: 0.05
		}
	}
]

