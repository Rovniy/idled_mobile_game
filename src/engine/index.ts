import {initPlayer} from './player'
import {loadEnemiesData, spawnEnemy} from './enemy'
import {initBullets} from './bullet'
import {gameLoop} from './gameLoop'
import {watch} from 'vue'
import {initDrops, loadDrops} from './drop'
import {handleCanvasClick} from './input'
import {initAudion} from './audio'
import {IBuffManager, IEngine, IGameState, IInitGameResponse} from '@/types/engine.types'
import { Ref } from 'vue'
import { ENEMY_DEBUG } from '@/database/enemies'

import backgroundImageSrc from '../assets/images/background.png'
import {settings} from "@/settings";

type TInitGames = {
	gameCanvas: Ref<HTMLCanvasElement|null>,
	gameState: IGameState,
	buff: IBuffManager
}
export async function initGame(params: TInitGames) : Promise<IInitGameResponse|null> {
	const { gameCanvas, gameState, buff } = params
	const { bullets, bulletImage, bulletImageLoaded } = await initBullets()

	if (!gameCanvas.value) return null

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
		spawnInterval: settings.engine.enemySpawnInterval,
		spawnTimeout: undefined,
		progress: {
			enemyHP: 1,
			enemyDamage: 1
		},
		puffEffects: [],
		criticalEffect: [],
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
			spawnEnemy({ engine, gameState })
		}
		engine.spawnTimeout = setTimeout(spawnEnemies, engine.spawnInterval)
	}

	/**
	 * DEBUG ENEMY SESSION
	 */
	const isDebugSpawn = debugSpawnEnemies({
		engine,
		gameState,
		must_spawn: ENEMY_DEBUG.enable,
		enemy_id: ENEMY_DEBUG.enemy_id,
		count: ENEMY_DEBUG.count
	})
	if (!isDebugSpawn) {
		spawnEnemies()
	}

	// Наблюдаем за изменением уровня
	watch(gameState.level, () => {
		engine.spawnInterval = engine.spawnInterval / settings.progress.spawn.enemyMultiplex

		if (engine.spawnInterval < settings.engine.minEnemySpawnInterval) {
			engine.spawnInterval = settings.engine.minEnemySpawnInterval // Устанавливаем минимальный интервал
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
		engine,
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

			// Очищаем дров с карты
			engine.drops = []

			// Сбрасываем интервал спавна и перезапускаем спавн врагов
			engine.spawnInterval = settings.engine.enemySpawnInterval
			clearTimeout(engine.spawnTimeout)
			spawnEnemies()
		},
		handleClick(coords : { x: number, y: number }) {
			handleCanvasClick({ coords, engine, gameState, buff })
		},
	}
}

type TDebugSpawnEnemies = {
	gameState: IGameState,
	engine: IEngine,
	must_spawn: boolean,
	enemy_id: string,
	count: number,
}
function debugSpawnEnemies(params: TDebugSpawnEnemies) {
	const {
		engine,
		gameState,
		must_spawn = false,
		enemy_id = 'boss1',
		count = 10
	} = params
	const TIMEOUT = 2_000

	if (!must_spawn) return

	const spawnTimeout = () => {
		setTimeout(() => {
			for (let i = 0; i < count; i++) {
				spawnEnemy({ engine, enemy_id, gameState })
			}
		}, TIMEOUT)
	}

	setTimeout(spawnTimeout)
	setTimeout(spawnTimeout, 4000)
	setTimeout(spawnTimeout, 8000)
	setTimeout(spawnTimeout, 12000)


	return true
}
