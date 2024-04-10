import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import './global.scss';
import router from './routes/router.ts'
const pinia = createPinia();


// 处理 preflight 的影响
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);

createApp(App).use(pinia).use(router).mount('#app');
