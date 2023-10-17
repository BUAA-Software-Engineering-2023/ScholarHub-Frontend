import { createApp } from 'vue'
import {createPinia} from 'pinia'
import './style.css'
import ElementPlus from 'element-plus'
import router from './router'
import App from './App.vue'
import I18n from "./language"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import 'virtual:svg-icons-register'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(createPinia()).use(router).use(I18n).use(ElementPlus).mount('#app')
