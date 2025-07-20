import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/main.css";
import VueDragscroll from "vue-dragscroll";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(VueDragscroll);

app.mount("#app");
