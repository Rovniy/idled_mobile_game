import { getCurrentInstance } from 'vue'
import { settings } from "@/settings";

export function useTelegram() {
	const sourceInstance = getCurrentInstance();
	const instance = sourceInstance?.appContext.config.globalProperties.$tg

	const shareResult = (exp: number) => {
		const shareText = `I scored ${exp} points in the game! Think you can beat my record? Give it a shot and prove me wrong!`
		const telegramLink = settings.telegram.shareUrl + encodeURIComponent(shareText);

		instance.openTelegramLink(telegramLink);
	}

	return {
		instance,
		shareResult
	};
}
