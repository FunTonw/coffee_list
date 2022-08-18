import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/ListView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
