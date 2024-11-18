import { openTelegramLink , isTMA } from '@telegram-apps/sdk';
import { settings } from "@/settings";

export function useTelegram() {
	const shareResult = async (exp: number) => {
		if (!(await isTMA())) return console.log('Run not in Telegram App');

		const shareText = `I scored ${exp} points in the game! Think you can beat my record? Give it a shot and prove me wrong!`
		const telegramLink = settings.telegram.shareUrl + encodeURIComponent(shareText);

		if (openTelegramLink .isAvailable()) {
			openTelegramLink(telegramLink);
		}
	}

	return {
		shareResult
	}
}
