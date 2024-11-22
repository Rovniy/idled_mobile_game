import { defineStore } from 'pinia'
import { isTMA, useLaunchParams } from '@telegram-apps/sdk-vue';

export const useUserStore = defineStore('user', {
	state: () => ({
		first_name: '',
		last_name: '',
		id: 0,
		language_code: '',
		photo_url: '',
		username: 'unknown player'
	}),
	getters: {
		getUsername: (state) => state.username,
		getAvatar: (state) => state.photo_url,
	},
	actions: {
		async initTelegramData() {
			if (!(await isTMA())) return console.log('Run not in Telegram App');

			const lp = useLaunchParams();

			const _u = lp?.initData?.user
			if (!_u) return

			this.first_name = _u.firstName
			this.last_name = _u.lastName || ''
			this.id = _u.id
			this.language_code = _u.languageCode || ''
			this.photo_url = _u.photoUrl || ''
			this.username = _u.username || ''
		},
	},
})
