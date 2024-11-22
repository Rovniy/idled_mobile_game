import { applyDropEffect, createFloatingText } from './drop.js';
import {IBuffManager, IEngine, IGameState} from "@/types/engine.types";

type THandleCanvasClickParams = {
	coords: {
		x: number,
		y: number
	},
	engine: IEngine,
	gameState: IGameState,
	buff: IBuffManager
}
export function handleCanvasClick(params: THandleCanvasClickParams) {
	const { coords, buff, gameState, engine } = params
	const { drops } = engine
	const { x, y } = coords

	for (let i = 0; i < drops.length; i++) {
		const drop = drops[i];
		if (!drop?.x || !drop.y || !drop?.iconImage) continue;

		const dist = Math.hypot(drop.x - x, drop.y - y);
		const radius = drop.iconImage.width / 2;

		if (dist <= radius) {
			applyDropEffect({ drop, engine, gameState, buff });
			createFloatingText({ drop, engine });

			// Удаляем дроп из массива
			drops.splice(i, 1);
			break;
		}
	}
}


