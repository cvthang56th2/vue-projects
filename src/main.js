import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './pages/Home.vue'
import ClickGame from './pages/ClickGame.vue'
import Form from './pages/Form.vue'
import TikTakToeGame from './pages/TikTakToeGame.vue'
import StopWatch from './pages/StopWatch.vue'

const app = createApp(App)

const routes = [
  { path: '/', component: Home },
  { path: '/click-game', component: ClickGame },
  { path: '/form', component: Form },
  { path: '/tiktaktoe', component: TikTakToeGame },
  { path: '/stopwatch', component: StopWatch },
]
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

app.use(router)

app.mount('#app')

