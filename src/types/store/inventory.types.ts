export interface IState {
	inventory: IInventory
}

export interface IInventory {
	[key: string]: TInventoryItem
}

export type TInventoryItem = {
	ca?: number,
	ua?: number,
	id: string,
	c: number
}
