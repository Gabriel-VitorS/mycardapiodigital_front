import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import HomeView from '../views/Manager/HomeView.vue'
import MenuConfigurationView from '../views/Manager/MenuConfiguration/MenuConfigurationView.vue'
import CategoryView from '../views/Manager/Category/CategoryView.vue'
import CategoryModal from '../views/Manager/Category/CategoryModal.vue'
import ProductView from '../views/Manager/Product/ProductView.vue'
import ProductModal from '../views/Manager/Product/ProductModal.vue'
import MenuView from '../views/Menu/MenuView.vue'
import ProductModalMenu from '@/views/Menu/ProductModalMenu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/cardapio/:menu',
      name: 'menu',
      component: MenuView,
      children: [
        {
          path: 'produto/:productId',
          name: 'product-detail-menu',
          component: ProductModalMenu,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
        {
      path: '/cadastro',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/gestor/inicio',
      name: 'gestor-inicio',
      component: HomeView,
    },
    {
      path: '/gestor/configuracao-cardapio',
      name: 'menu-configuration',
      component: MenuConfigurationView,
    },
    {
      path: '/gestor/categorias',
      name: 'categories',
      component: CategoryView,
      children: [
        {
          path: ':categoryId',
          name: 'category-modal',
          component: CategoryModal,
        }
      ]
    },
    {
      path: '/gestor/produtos',
      name: 'products',
      component: ProductView,
      children: [
        {
          path: ':productId',
          name: 'product-modal',
          component: ProductModal,
        }
      ]
    },
  ],
})

export default router
