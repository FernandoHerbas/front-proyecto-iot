import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/ambientes/Home.vue'),
    meta: {
      name: 'Home'
    }
  },
  {
    path: '/living',
    component: () => import('@/ambientes/Environment.vue'),
    meta: {
      name: 'Living',
      environment: 'living'
    },
    children: [
      {
        path: '',
        redirect: 'leds'
      },
      {
        path: 'leds',
        component: () => import('@/dispositivos/leds.vue'),
        meta: {
          name: 'Leds'
        }
      },
      {
        path: 'rgb',
        component: () => import('@/dispositivos/rgb.vue'),
        meta: {
          name: 'RGB'
        }
      }
    ]
  },
  {
    path: '/cuarto1',
    component: () => import('@/ambientes/Environment.vue'),
    meta: {
      name: 'Habitacion Fer(WIP)',
      environment: 'cuarto1'
    },
    children: [
      {
        path: '',
        redirect: 'oneLed'
      },
      {
        path: 'OneLed',
        component: () => import('@/dispositivos/oneLed.vue'),
        meta: {
          name: 'Led'
        }
      },
      {
        path: 'rgb',
        component: () => import('@/dispositivos/rgb.vue'),
        meta: {
          name: 'RGB'
        }
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
