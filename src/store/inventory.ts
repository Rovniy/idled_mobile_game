import {defineStore} from 'pinia'
import {useTelegram} from "@/composable/telegram";
import {settings} from "@/settings";
import {IInventory, IState, TInventoryItem} from "@/types/store/inventory.types";
import {TItemListItem} from "@/types/ui/ScreenItemList.types";

export const useInventoryStore = defineStore('inventory', {
	state: (): IState => ({
		inventory: {}
	}),
	getters: {
		getInventory(): IInventory {
			return this.inventory
		},
		inventoryArray(): TInventoryItem[] {
			return Object.values(this.inventory)
		}
	},
	actions: {
		/**
		 * Создание пустого инвентаря
		 */
		async initInventory() {
			const storage = useTelegram().storage
			const exist = await storage.getItem(settings.slug.inventory)

			if (exist) return this.getContents()

			await storage.setItem(settings.slug.inventory, {})

			return this.getContents()
		},
		/**
		 * Добавление предмета в инвентарь
		 * Может использоваться при покупке
		 * @param item_id
		 * @param count
		 */
		async add(item_id: string, count: number = 1): Promise<TInventoryItem> {
			let payload: TInventoryItem | null = null
			const storage = useTelegram().storage

			if (this.inventory[item_id]) {
				this.inventory[item_id].c += count

			} else {
				payload = {
					ca: Date.now(),
					ua: Date.now(),
					id: item_id,
					c: count
				}

				this.inventory[item_id] = payload
			}

			await storage.setItem(settings.slug.inventory, this.inventory)

			return this.inventory[item_id]
		},
		/**
		 * Получение информации о всем инвентаре целиком
		 */
		async getContents(): Promise<IInventory> {
			const storage = useTelegram().storage
			const keys = await storage.getKeys()

			if (!keys.includes(settings.slug.inventory)) await this.initInventory()

			this.inventory = await storage.getItem(settings.slug.inventory)

			return this.inventory
		},
		/**
		 * Использование предмета из инвентаря
		 * @param item
		 */
		async use(item: TInventoryItem): Promise<IInventory> {
			if (!this.inventory[item.id] || item.c === 0)
				throw new Error('Item not found in inventory')

			const storage = useTelegram().storage

			this.inventory[item.id].c--

			if (this.inventory[item.id].c === 0) {
				delete this.inventory[item.id]
			}

			await storage.setItem(settings.slug.inventory, this.inventory)

			return this.inventory
		},
		/**
		 * Покупка предмета из магазина в инвентаре
		 * @param item
		 */
		async buy(item: TItemListItem): Promise<void> {
			const telegram = useTelegram()
			const id = item.id
			const count = item.count

			return telegram.buyThings(id, count)
		}
	},
})
