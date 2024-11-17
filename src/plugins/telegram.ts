import { FunctionPlugin, App } from 'vue'

interface TelegramWebApp {
	expand: () => void;
	initDataUnsafe: {
		user: {
			id: number;
			first_name: string;
			last_name?: string;
			username?: string;
		}
	};
}

declare global {
	interface Window {
		Telegram: {
			WebApp: TelegramWebApp;
		};
	}
}

export const telegramPlugin: FunctionPlugin = (app: App): void => {
	const tg = window.Telegram.WebApp;

	tg.expand();

	// Добавляем объект tg в глобальные свойства приложения
	app.config.globalProperties.$tg = tg;
};
