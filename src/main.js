import { createApp } from 'vue'
import {createPinia} from 'pinia'
import './style.css'
import router from './router'
import App from './App.vue'
import I18n from "./language"
const app = createApp(App)

app.use(createPinia()).use(router).use(I18n).mount('#app')
