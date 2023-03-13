import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import { VueQueryPlugin } from 'vue-query';
import i18n from './i18n';
import './assets/main.css';

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.use(Quasar, {});

app.use(VueQueryPlugin);

app.use(i18n);

app.mount('#app');
