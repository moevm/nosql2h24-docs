import { createApp } from 'vue';
import App from './App';
import router from '@/router/router';

import { createPinia } from 'pinia';
//import { useTablesStore } from '@/stores/useTablesStore';
import { useUserStore } from '@/stores/useUserStore';
import '@/assets/scss/global.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router);

//export const tablesStore = useTablesStore();
export const userStore = useUserStore();
app.mount('#app');
