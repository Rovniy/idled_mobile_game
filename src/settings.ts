interface ISettings {
	player: {
		attackRadius: number,
		shootingSpeed: number
	},
	drop: {
		blinkStartBefore: number
	},
	telegram: {
		shareText: string,
		appUrl: string,
		shareUrl: string,
	}
}

export const settings : ISettings = {
	player: {
		attackRadius: 150,
		shootingSpeed: 3
	},
	drop: {
		blinkStartBefore: 3000
	},
	telegram: {
		shareText: `I scored {exp} points in the game! Think you can beat my record? Give it a shot and prove me wrong!`,
		appUrl: 'https://t.me/xploitgames_bot/idled_game',
		shareUrl: 'https://t.me/share/url?url=&text='
	}
}
