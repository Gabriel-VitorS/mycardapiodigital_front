import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import NotFound from '@/views/NotFound.vue'

// import GestorHomeView from '@/views/Gestor/HomeView.vue'
import ProdutosView from '@/views/Gestor/Produtos/ProdutosView.vue'
import ProdutosEditView from '@/views/Gestor/Produtos/ProdutosEditView.vue'
import ConfiguracoesView from '@/views/Gestor/Configuracoes/ConfiguracoesView.vue'
import CategoriasView from '@/views/Gestor/Categorias/CategoriasView.vue'
import CategoriasEditView from '@/views/Gestor/Categorias/CategoriaEditView.vue'
import MainContainer from '@/components/gestor/MainContainer.vue'
import LoginView from '@/views/Gestor/LoginView.vue'
import CadastrarView from '@/views/Gestor/CadastrarView.vue'
import CadastroSucessoView from '@/views/Gestor/CadastroSucessoView.vue'

import CardapioView from '@/views/Cardapio/CardapioView.vue'
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
    path: '/cadastro',
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
    path: '/cardapio/:restaurante',
    name: 'cardapio',
    component: CardapioView
  },
  {
    path: '/gestor', component: MainContainer,
    name: 'gestor',
    children: [
      // {
      //   path: '',
      //   component: GestorHomeView,
      //   name: 'gestor-home',
      //   meta:{
      //     title: 'Gestor'
      //   }
      // },
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
        path: 'categorias/:id',
        component: CategoriasEditView,
        name: 'categorias-edit',
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
      },
      {
        path: 'produtos/:id',
        component: ProdutosEditView,
        name: 'produtos-edit',
        meta:{
          title: 'Produtos'
        }
      },
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  // document.title = to.meta.title

  if(to.path.includes('/gestor')){
    
    if(sessionStorage.getItem('JWT') === null)
      return {name: 'login'}

  }

  
});

export default router
