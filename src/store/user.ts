import { defineStore } from 'pinia'
import { parseInitData } from '@telegram-apps/sdk';

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
		initTelegramData() {
			const _u = parseInitData();
			if (!_u) return

			this.first_name = _u.first_name
			this.last_name = _u.last_name || ''
			this.id = _u.id
			this.language_code = _u.language_code || ''
			this.photo_url = _u.photo_url || ''
			this.username = _u.username || ''
		},
	},
})
