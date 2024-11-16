export const DROP_IDS = {
	HEALTH_ELIXIR_SMALL: 'HEALTH_ELIXIR_SMALL',
	EXPERIENCE_ELIXIR_SMALL: 'EXPERIENCE_ELIXIR_SMALL',
	INVINCIBILITY_BUFF_SMALL_TEMP: 'INVINCIBILITY_BUFF_SMALL_TEMP',
}

export const DROP_EFFECT = {
	PLAYER_INCREASE_HP: 'PLAYER_INCREASE_HP',
	PLAYER_ADD_EXP: 'PLAYER_ADD_EXP',
	PLAYER_DO_INVINCIBILITY: 'PLAYER_DO_INVINCIBILITY',
}

export default [
	{
		id: DROP_IDS.HEALTH_ELIXIR_SMALL,
		name: "Эликсир здоровья",
		description: "Восстанавливает 20 HP",
		icon: DROP_IDS.HEALTH_ELIXIR_SMALL,
		duration: 10,
		effect: {
			type: DROP_EFFECT.PLAYER_INCREASE_HP,
			value: 20
		},
		pickupText: "+20 HP"
	},
	{
		id: DROP_IDS.EXPERIENCE_ELIXIR_SMALL,
		name: "Эликсир опыта",
		description: "Дает 50 опыта",
		icon: DROP_IDS.EXPERIENCE_ELIXIR_SMALL,
		duration: 15,
		effect: {
			type: DROP_EFFECT.PLAYER_ADD_EXP,
			value: 50
		},
		pickupText: "+50 EXP"
	},
	{
		id: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP,
		name: "Бафф неуязвимости",
		description: "Делает вас неуязвимым на 5 секунд",
		icon: DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP,
		duration: 8,
		effect: {
			type: DROP_EFFECT.PLAYER_DO_INVINCIBILITY,
			value: true,
			duration: 5
		},
		pickupText: "Неуязвимость!"
	}
]
