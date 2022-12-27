import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Home from './pages/Home.vue'
import ClickGame from './pages/ClickGame.vue'
import Form from './pages/Form.vue'
import TikTakToeGame from './pages/TikTakToeGame.vue'
import StopWatch from './pages/StopWatch.vue'
import ChatApp from './pages/ChatApp.vue'
import Calculator from './pages/Calculator.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

const routes = [
  { path: '/', component: Home },
  { path: '/click-game', component: ClickGame },
  { path: '/form', component: Form },
  { path: '/tiktaktoe', component: TikTakToeGame },
  { path: '/stopwatch', component: StopWatch },
  { path: '/chat-app', component: ChatApp },
  { path: '/calculator', component: Calculator },
]
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

app.use(router)

app.mount('#app')

