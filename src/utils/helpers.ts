import {IEnemy, IEngine} from "@/types";

export function getRandomValue(array: any[]) {
	if (array.length === 0) {
		throw new Error('Array of arguments cannot be empty');
	}
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}


type TGetRandomLootParams = {
	enemy: IEnemy,
	engine: IEngine
}
export function getRandomLoot(params: TGetRandomLootParams) {
	const { enemy, engine } = params

	const lootTable = enemy.drops;
	const sortedLootTable = lootTable.sort((a, b) => a.chance - b.chance);

	for (const drop of sortedLootTable) {
		const dropChance = Math.random();

		if (dropChance <= drop.chance) {

			console.log('engine.drops', drop.id, engine.allDrops);

			return engine.allDrops.find(d => d.id === drop.id);
		}
	}

	return null; // Если ничего не выпало
}
