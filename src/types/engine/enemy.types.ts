import {IEnemy, IEngine, IGameState} from "@/types/engine.types";
import {spawnBossLogic} from "@/engine/enemy";

export type TSpawnEnemy = {
	engine: IEngine,
	gameState: IGameState,
	enemy_id?: string,
	boss?: boolean
}

export type TSpawnBossLogic = {
	engine: IEngine,
	gameState: IGameState
}

export type THandleEnemyCritHitVfxParams = {
	enemy: any,
	engine: IEngine
}

export type THandlePoofParams = {
	enemy: any,
	engine: IEngine
}

export type THandleEnemyDeathAudioParams = {
	engine: IEngine
}

export type TGetRandomEnemyParams = {
	engine: IEngine,
	boss?: boolean,
	enemy_id?: string
}

export type TGetRandomLootParams = {
	enemy: IEnemy,
	engine: IEngine
}

export type THandleEnemyDropParams = {
	enemy: any,
	engine: IEngine
}
