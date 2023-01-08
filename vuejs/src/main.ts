import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';

import "./assets/main.css";

var Parse = require('parse/node');

Parse.initialize("3HqZGXUbik4IBJowyoxgekx1lVTsRVAb2JaHKPhX","VsmF7XziqNLDbK9BgWkMCdrV9uM366Rxp0lf1LCu");
Parse.serverURL = 'https://parseapi.back4app.com/'

const app = createApp(App).use(mdiVue, {
    icons: mdijs
  });

app.use(router);

app.mount("#app");
