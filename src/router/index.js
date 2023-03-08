import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import GestorHomeView from '@/views/Gestor/HomeView.vue'
import ProdutosView from '@/views/Gestor/ProdutosView.vue'
import ConfiguracoesView from '@/views/Gestor/ConfiguracoesView.vue'
import CategoriasView from '@/views/Gestor/Categorias/CategoriasView.vue'
import MainContainer from '@/components/gestor/MainContainer.vue'
import LoginView from '@/views/Gestor/LoginView.vue'
import CadastrarView from '@/views/Gestor/CadastrarView.vue'
import CadastroSucessoView from '@/views/Gestor/CadastroSucessoView.vue'
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
    path: '/cadastrar-sucesso',
    name: 'cadastrar-sucesso',
    component: CadastroSucessoView,
    meta:{
      title: 'Cadastrar'
    }
  },
  {
    path: '/gestor', component: MainContainer,
    name: 'gestor',
    children: [
      {
        path: '',
        component: GestorHomeView,
        name: 'gestor-home',
        meta:{
          title: 'Gestor'
        }
      },
      {
        path: 'configuracoes',
        component: ConfiguracoesView,
        name: 'configuracoes',
        meta:{
          title: 'Configurações'
        }
      },
      {
        path: 'categorias',
        component: CategoriasView,
        name: 'categorias',
        meta:{
          title: 'Categorias'
        }
      },
      {
        path: 'produtos',
        component: ProdutosView,
        name: 'produtos',
        meta:{
          title: 'Produtos'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  document.title = to.meta.title

  if(to.path.includes('/gestor')){
    
    if(sessionStorage.getItem('JWT') === null)
      return {name: 'login'}

  }

  
});

export default router
