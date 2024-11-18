import { shareURL, openTelegramLink, openLink, isTMA } from '@telegram-apps/sdk';
import { settings } from "@/settings";
import {useDebugStore} from "@/store/debug";


export function useTelegram() {
	const shareResult = async (exp: number) => {
		const debug = useDebugStore();

		if (!(await isTMA())) return console.log('Run not in Telegram App');

		const shareText = `I scored ${exp} points in the game! Think you can beat my record? Give it a shot and prove me wrong!`

		if (shareURL.isAvailable()) {
			return shareURL(settings.telegram.appUrl, shareText)
		} else {
			debug.log('shareURL not available');
		}

		if (openTelegramLink.isAvailable()) {
			return openTelegramLink(settings.telegram.appUrl);
		} else {
			debug.log('openTelegramLink not available');
		}

		if (openLink.isAvailable()) {
			openLink(settings.telegram.appUrl, {
				tryBrowser: 'chrome',
				tryInstantView: true,
			});
		} else {
			debug.log('openLink not available');
		}
	}

	return {
		shareResult
	}
}
