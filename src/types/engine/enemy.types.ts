import {IEngine, IGameState} from "@/types/engine.types";
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
