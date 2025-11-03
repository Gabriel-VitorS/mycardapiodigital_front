import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../App.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue'),
    },
        {
      path: '/cadastro',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue'),
    },
    {
      path: '/gestor/inicio',
      name: 'gestor-inicio',
      component: () => import('../views/Manager/HomeView.vue'),
    },
    {
      path: '/gestor/configuracao-cardapio',
      name: 'menu-configuration',
      component: () => import('../views/Manager/MenuConfiguration/MenuConfigurationView.vue'),
    },
  ],
})

export default router
