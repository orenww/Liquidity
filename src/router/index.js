import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CategoryPage from '../views/CategoryPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },    
  {
    path: '/categoryPage/:category',
    name: 'CategoryPage',
    component: CategoryPage,
    props:true    
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
