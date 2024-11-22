export interface IState {
	inventory: IInventory
}

export interface IInventory {
	[key: string]: TInventoryItem
}

export type TInventoryItem = {
	created_at?: number,
	updated_at?: number,
	id: string,
	count: number
}
