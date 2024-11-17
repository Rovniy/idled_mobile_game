import './assets/style/styles.scss'

import { createApp } from 'vue';
import { telegramPlugin } from './plugins/telegram';

import App from './App.vue';

const app = createApp(App);

app.use(telegramPlugin)

app.mount('#app');
