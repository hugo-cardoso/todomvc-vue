import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// TODOMVC styles
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

createApp(App).use(createPinia()).mount("#app");
