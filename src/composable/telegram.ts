import { shareURL, init, miniAppReady, cloudStorage } from '@telegram-apps/sdk-vue';
import { settings } from "@/settings";

export function useTelegram() {
	const initApi = () => {
		init()
		miniAppReady()
	}

	const shareResult = async (exp: number) => {
		const shareText = settings.telegram.shareText.replace('{exp}', exp.toString());

		shareURL.ifAvailable(
			settings.telegram.appUrl,
			shareText
		)
	}

	const storage = {
		async getItem(key: string) {
			if (!key)
				throw new Error('Key is required');

			const result = await cloudStorage.getItem(key)
			if (!result)
				return null

			return JSON.parse(result)
		},
		async setItem(key: string, value: any = null) {
			if (!key)
				throw new Error('Key is required')

			const payload = JSON.stringify(value)
			return cloudStorage.setItem(key, payload)
		},
		async getKeys() {
			return cloudStorage.getKeys()
		},
		async removeItem(key: string) {
			if (!key)
				throw new Error('Key is required')

			return cloudStorage.deleteItem(key)
		}
	}

	return {
		shareResult,
		initApi,
		storage
	}
}
