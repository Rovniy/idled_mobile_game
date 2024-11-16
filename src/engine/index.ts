import {initPlayer} from './player'
import {loadEnemiesData, spawnEnemy} from './enemy'
import {initBullets} from './bullet'
import {gameLoop} from './gameLoop'
import {watch} from 'vue'
import {initDrops, loadDrops} from './drop'
import {handleCanvasClick} from './input'
import {initAudion} from './audio'
import {IBuffManager, IEngine, IGameState, IInitGame} from '@/types'
import { Ref } from 'vue'

import backgroundImageSrc from '../assets/images/background.png'

type TInitGames = {
	gameCanvas: Ref<HTMLCanvasElement>,
	gameState: IGameState,
	buff: IBuffManager
}
export async function initGame(params: TInitGames) : IInitGame {
	const { gameCanvas, gameState, buff } = params
	const { bullets, bulletImage, bulletImageLoaded } = await initBullets()

	const engine : IEngine = {
		ctx: null,
		player: null,
		canvas: gameCanvas.value,
		floatingTexts: [],
		backgroundImage: new Image(),
		allDrops: loadDrops(),
		drops: initDrops(),
		enemies: [],
		bullets,
		bulletImage,
		bulletImageLoaded,
		loadedEnemies: loadEnemiesData(),
		spawnInterval: 1000,
		spawnTimeout: undefined,
		puffEffects: [],
		audioManager: initAudion()
	}
	engine.ctx = engine.canvas.getContext('2d')

	// Изменение размера Canvas
	function resizeCanvas() {
		engine.canvas.width = window.innerWidth
		engine.canvas.height = window.innerHeight
	}
	resizeCanvas()
	window.addEventListener('resize', resizeCanvas)

	engine.player = initPlayer(engine.canvas)
	engine.backgroundImage.src = backgroundImageSrc

	function spawnEnemies() {
		if (!gameState.isPaused.value && !gameState.isGameOver.value) {
			spawnEnemy({ engine })
		}
		engine.spawnTimeout = setTimeout(spawnEnemies, engine.spawnInterval)
	}
	spawnEnemies()

	// Наблюдаем за изменением уровня
	watch(gameState.level, () => {
		// Уменьшаем интервал спавна на 5% с каждым уровнем
		engine.spawnInterval = engine.spawnInterval * 0.95 // Уменьшаем на 5%
		if (engine.spawnInterval < 200) {
			engine.spawnInterval = 200 // Устанавливаем минимальный интервал
		}
	})

	// Запускаем игровой цикл
	gameLoop({
		engine,
		gameState,
		buff
	})

	// Возвращаем объект с функцией resetGame
	return {
		resetGame() {
			// Очищаем врагов и пули
			engine.enemies.length = 0
			bullets.length = 0

			// Сбрасываем позицию игрока
			if (engine.player) {
				engine.player.x = engine.canvas.width / 2
				engine.player.y = engine.canvas.height / 2
			}

			gameState.playerHP.value = 100

			// Сбрасываем интервал спавна и перезапускаем спавн врагов
			engine.spawnInterval = 1000
			clearTimeout(engine.spawnTimeout)
			spawnEnemies()
		},
		handleClick(coords : { x: number, y: number }) {
			handleCanvasClick({ coords, engine, gameState, buff })
		},
	}
}
