import { shareURL, init } from '@telegram-apps/sdk-vue';
import { settings } from "@/settings";

export function useTelegram() {
	const shareResult = async (exp: number) => {
		init()

		const shareText = settings.telegram.shareText.replace('{exp}', exp.toString());

		shareURL.ifAvailable(
			settings.telegram.appUrl,
			shareText
		)
	}

	return {
		shareResult
	}
}
