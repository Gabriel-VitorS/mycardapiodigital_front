<template>
    <main className="d-flex flex-nowrap">
        <nav class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
            <span>Cardapio digital</span>

            <hr />

            <ul class="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <router-link to="/gestor" class="nav-link"
                    :class="this.$route.path.split('/').length == 2 ? 'active text-light' : 'link-dark' ">
                        Ínicio
                    </router-link>
                </li>

                <li className="nav-item">
                    <router-link to="/gestor/configuracoes" class="nav-link"
                    :class="this.$route.path.includes('configuracoes') ? 'active text-light': 'link-dark' " >
                        Configurações
                    </router-link>
                </li>

                <li className="nav-item">
                    <router-link to="/gestor/categorias" class="nav-link "
                    :class="this.$route.path.includes('categorias') ? 'active text-light': 'link-dark' ">
                        Categorias
                    </router-link>
                </li>

                <li className="nav-item">
                    <router-link to="/gestor/produtos" class="nav-link"
                    :class="this.$route.path.includes('produtos') ? 'active text-light': 'link-dark' ">
                        Produtos
                    </router-link>
                </li>
            </ul>

            <hr />

            <div className="d-flex justify-content-md-center justify-content-between">
                <div class="dropdown">
                    <a ref="dropDownMain" class="dropdown-toggle text-dark text-decoration-none" @click="new Dropdown(this.$refs.dropDownMain).show()" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <strong>Gabriel Vitor</strong>
                    </a>

                    <ul class="dropdown-menu">
                        <li @click="loggout" ><a class="dropdown-item">Sair</a></li>
                    </ul>
                </div>
                
            </div>
        </nav>

        
        <section class="w-100">
            <section class="navbar navbar-expand-lg bg-light p-3">

                <div class="container-fluid">

                    <div class="row d-flex w-100 justify-content-around">

                        <div class="col-6">
                        </div>

                        <div class="col-6 text-end">
                            <span class="fs-4" >
                                &nbsp;
                            </span>
                        </div>
                        
                        
                    </div>

                </div>

            </section>

            <section class="mainContainer">
                <router-view > </router-view>
            </section>
        </section>
        
    </main>
  
    
    

</template>

<script>
import { Dropdown } from 'bootstrap';
export default {
    name: 'SideBar',
    data(){
        return{
            Dropdown,
        }
    },    
    methods:{
        loggout(){
            sessionStorage.removeItem('JWT')
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.mainContainer{
    height: 92%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em 1em 0 1em;

}
</style>