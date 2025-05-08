import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useEDDLServerStore } from '@/stores/eddl'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

const eddlServerConnectionStsore = useEDDLServerStore()
eddlServerConnectionStsore.bindEvents()

app.use(router)

app.mount('#app')
