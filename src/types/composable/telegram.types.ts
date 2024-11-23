import {ImpactHapticFeedbackStyle} from "@telegram-apps/sdk-vue";

export interface ITelegram {
	initApi: () => void,
	shareResult: (exp: number) => void,
	storage: {
		getItem(key: string) : Promise<string | Record<string, string>>,
		setItem(key: string, value: any) : Promise<void>,
		getKeys() : Promise<string[]>,
		removeItem(key: string) : Promise<void>,
	},
	hapticFeedback(style: ImpactHapticFeedbackStyle) : void,
	buyThings(id: string, count: number) : void
}
