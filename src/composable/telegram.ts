import { openLink } from '@telegram-apps/sdk';
import { settings } from "@/settings";

export function useTelegram() {
	const shareResult = (exp: number) => {
		const shareText = `I scored ${exp} points in the game! Think you can beat my record? Give it a shot and prove me wrong!`
		const telegramLink = settings.telegram.shareUrl + encodeURIComponent(shareText);

		if (openLink.isAvailable()) {
			openLink(telegramLink, {
				tryBrowser: 'chrome',
				tryInstantView: true,
			});
		}
	}

	return {
		shareResult
	}
}
