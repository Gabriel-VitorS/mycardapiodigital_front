import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GestorHomeView from '@/views/GestorHomeView.vue'
import GestorProdutosView from '@/views/GestorProdutosView.vue'
import SideBar from '../components/SideBar.vue'
import LoginView from '@/views/LoginView.vue'
import CadastrarView from '@/views/CadastrarView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      title: 'Login'
    }
  },
  {
    path: '/cadastrar',
    name: 'cadastrar',
    component: CadastrarView,
    meta:{
      title: 'Cadastrar'
    }
  },
  {
    path: '/gestor',
    name: 'gestor',
    components: 
    {
      default: GestorHomeView,
      SideBar,
    },
  },
  {
    path: '/gestor/produtos',
    name: 'produtos',
    components: {
      default: GestorProdutosView,
      SideBar,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next();
});

export default router
