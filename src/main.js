import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import './style.css'
import App from './App.vue'
import Home from './pages/Home.vue'
import ClickGame from './pages/ClickGame.vue'
import Form from './pages/Form.vue'
import TikTakToeGame from './pages/TikTakToeGame.vue'
import StopWatch from './pages/StopWatch.vue'
import ChatApp from './pages/ChatApp.vue'
import Calculator from './pages/Calculator.vue'
import SnakeGame from './pages/SnakeGame.vue'
import TasksManagement from './pages/TasksManagement.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(VueSweetalert2);
app.component("v-select", VueSelect)

window.Swal = app.config.globalProperties.$swal;

const routes = [
  { path: '/', component: Home },
  { path: '/click-game', component: ClickGame },
  { path: '/form', component: Form },
  { path: '/tiktaktoe', component: TikTakToeGame },
  { path: '/stopwatch', component: StopWatch },
  { path: '/chat-app', component: ChatApp },
  { path: '/calculator', component: Calculator },
  { path: '/snake-game', component: SnakeGame },
  { path: '/tasks-management', component: TasksManagement },
]
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

app.use(router)

app.mount('#app')

