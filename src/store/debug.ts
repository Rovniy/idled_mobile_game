import { defineStore } from 'pinia'

type TState = {
	messages: string[]
}
export const useDebugStore = defineStore('debug', {
	state: () : TState => ({
		messages: []
	}),
	getters: {
		getMessages: (state) => state.messages
	},
	actions: {
		async log(msg: string) {
			this.messages.push(msg)
		},
	},
})
