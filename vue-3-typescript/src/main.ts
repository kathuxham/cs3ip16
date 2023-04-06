import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';
import "bootstrap/dist/css/bootstrap.min.css";
import { createI18n } from "vue-i18n";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


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
