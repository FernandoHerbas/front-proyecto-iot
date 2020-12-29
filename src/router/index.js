import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/ambientes/Home.vue')
  },
  {
    path: '/living',
    name: 'Living',
    component: () => import('@/ambientes/Living.vue'),
    children: [
      {
        path: 'leds',
        name: 'Leds',
        component: () => import('@/dispositivos/leds.vue')
      },
      {
        path: 'rgb',
        name: 'RGB',
        component: () => import('@/dispositivos/rgb.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
