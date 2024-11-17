import { getCurrentInstance } from 'vue'

export function useTelegram() {
	const instance = getCurrentInstance();
	return instance?.appContext.config.globalProperties.$tg;
}
