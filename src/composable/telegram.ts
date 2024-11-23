import {
	$debug,
	cloudStorage,
	hapticFeedbackImpactOccurred,
	ImpactHapticFeedbackStyle,
	init,
	initData,
	invoice,
	isHapticFeedbackSupported,
	miniApp,
	popup,
	shareURL,
	themeParams
} from '@telegram-apps/sdk-vue';
import {settings} from "@/settings";
import {ITelegram} from "@/types/composable/telegram.types";

export function useTelegram(): ITelegram {
	const initApi = () => {
		$debug.set(true)
		init()
		miniApp.mount()
		themeParams.mount()
		initData.restore()
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

	/**
	 * Вызывает тактильные ощущения от игры
	 */
	async function hapticFeedback(style: ImpactHapticFeedbackStyle = 'light') {
		if (!isHapticFeedbackSupported()) return

		return hapticFeedbackImpactOccurred(style)
	}

	/**
	 * Покупка цифрового товара
	 * @param id
	 * @param count
	 */
	async function buyThings(id: string, count: number = 1) {
		try {
			init()
			console.log('id', id, count);

			if (!invoice.isSupported()) throw new Error('Invoice not supported on this device')
			if (!invoice.open.isAvailable()) throw new Error('Invoices not available')
			if (invoice.isOpened()) throw new Error('Invoices is now opened')

			const data = {
				product_id: 'SOME PRODUCT ID'
			}

			const response = await fetch('https://localhost:443/createInvoice', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Origin': '*',
				},
				body: JSON.stringify(data)
			})

			if (response.ok) {
				console.log('Сообщение успешно отправлено боту.');
			} else {
				console.error('Ошибка при отправке сообщения боту.');
			}

			const {link} = await response.json()

			console.log('link', link);

			const result = await invoice.open(link, 'url')
			console.log('result', result);

			if (!popup.isSupported()) return console.error('Popup not supported on this device')

			if (result === 'paid') {
				await popup.open({
					title: 'A cool purchase!)',
					message: 'Now you can use the purchased power-up directly from the inventory! Just click on it!',
					buttons: [{ text: 'I\'m understand!', type: 'default' }],
				})
			}
			if (result === 'cancelled' || result === 'failed') {
				await popup.open({
					title: 'Alas, the deal fell through(',
					message: 'Let\'s try it again) Monsters don\'t kill themselves!',
					buttons: [{ text: 'Ok!', type: 'destructive' }],
				})
			}

			return result
		} catch (e) {
			console.error(e)
		}
	}

	return {
		shareResult,
		initApi,
		hapticFeedback,
		buyThings,
		storage
	}
}
