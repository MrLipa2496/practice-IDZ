import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Profile from './components/Profile.vue'
import Orders from './components/Orders.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/profile', component: Profile },
  { path: '/orders', component: Orders }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
