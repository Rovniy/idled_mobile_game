import './assets/style/styles.scss'

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { init} from '@telegram-apps/sdk-vue';

import App from './App.vue';

const pinia = createPinia()
const app = createApp(App);

init();

app.use(pinia)

app.mount('#app');



