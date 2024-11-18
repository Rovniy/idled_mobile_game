import './assets/style/styles.scss'

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { init, isTMA, miniApp  } from '@telegram-apps/sdk-vue';

isTMA()
	.then(() => {
		init({
			acceptCustomStyles: true
		});

		if (miniApp.mount.isAvailable()) {
			miniApp.mount();
		}
	})

import App from './App.vue';

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)

app.mount('#app');
