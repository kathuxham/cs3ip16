import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';
import "bootstrap/dist/css/bootstrap.min.css";
import { createI18n } from "vue-i18n";


// import translations
import en from "./locales/en.json";

// configure i18n
const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: { en },
});


createApp(App)
  .use(mdiVue, {
    icons: mdijs
  })
  .use(router)
  .use(i18n)
  .mount('#app')
