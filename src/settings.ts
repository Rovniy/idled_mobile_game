interface ISettings {
	player: {
		attackRadius: number,
		shootingSpeed: number,
		baseCriticalChance: number,
		baseCriticalPower: number,
		maxHP: number,
	},
	drop: {
		blinkStartBefore: number
	},
	telegram: {
		shareText: string,
		appUrl: string,
		shareUrl: string,
	},
	engine: {
		passingTime: number,
		enemySpawnInterval: number,
		minEnemySpawnInterval: number,
	},
	progress: {
		spawn: {
			enemyMultiplex: number
		},
		enemy: {
			hpMultiplex: number,
			damageMultiplex: number,
			expMultiplex: number,
			speedMultiplex: number,
		}
	},
	slug: {
		inventory: string
	}
}

export const settings: ISettings = {
	player: {
		attackRadius: 150,
		shootingSpeed: 3,
		baseCriticalChance: 0.01,
		baseCriticalPower: 0.1,
		maxHP: 100
	},
	drop: {
		blinkStartBefore: 3000
	},
	telegram: {
		shareText: `I scored {exp} points in the game! Think you can beat my record? Give it a shot and prove me wrong!`,
		appUrl: 'https://t.me/xploitgames_bot/idled_game',
		shareUrl: 'https://t.me/share/url?url=&text='
	},
	engine: {
		passingTime: 1,
		enemySpawnInterval: 4000,
		minEnemySpawnInterval: 200
	},
	progress: {
		spawn: {
			enemyMultiplex: 1.03
		},
		enemy: {
			hpMultiplex: 1.1,
			damageMultiplex: 1.2,
			expMultiplex: 1.2,
			speedMultiplex: 1.05,
		}
	},
	slug: {
		inventory: 'INVENTORY'
	}
}
