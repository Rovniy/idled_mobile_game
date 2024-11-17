import './assets/style/styles.scss'

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { telegramPlugin } from './plugins/telegram';

import App from './App.vue';

const pinia = createPinia()
const app = createApp(App);

app.use(telegramPlugin)
app.use(pinia)

app.mount('#app');
