import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
