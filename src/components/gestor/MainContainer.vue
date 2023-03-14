<template>
    <main className="d-flex flex-nowrap">
        <nav class="d-flex flex-column flex-shrink-0 p-3 bg-light" :class="{'showNav': showMenu}" >
            <router-link to="/gestor" class="d-flex justify-content-center text-black text-decoration-none">
                <i class="bi bi-journal-text fs-4"></i> <span class="ms-2 fs-4">Cardápio digital</span>
            </router-link>
            

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

            <div className="d-flex justify-content-lg-center justify-content-between">
                <div class="dropdown">
                    <a ref="dropDownMain" class="dropdown-toggle text-dark text-decoration-none" @click="new Dropdown(this.$refs.dropDownMain).show()" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span v-if="nameCompany === ''" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <strong v-else>Gabriel Vitor</strong>
                    </a>

                    <ul class="dropdown-menu">
                        <li @click="loggout" ><a href="#" class="dropdown-item">Sair</a></li>
                    </ul>
                </div>
                <i class="bi bi-arrow-bar-left d-lg-none d-block fs-5" @click="showMenu = false"></i>
            </div>
        </nav>

        
        <section class="w-100">
            <section class="navbar navbar-expand-lg bg-light p-3">

                <div class="container-fluid">

                    <div class="row d-flex w-100 justify-content-around">

                        <div class="col-6">
                            <i class="bi bi-list fs-3 d-lg-none d-block" @click="showMenu = true"></i>
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
import axios from 'axios';
import { Dropdown } from 'bootstrap';
export default {
    name: 'SideBar',
    data(){
        return{
            Dropdown,
            showMenu: false,
            nameCompany: ''
        }
    },
    beforeRouteUpdate(){
        this.showMenu= false
    },
    async mounted(){
        await axios.get(`${process.env.VUE_APP_URL_API}/company`,{
            headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
        }).then((data)=>{
            this.nameCompany = data.data.name
        })
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
    overflow: auto;
}

nav{
    width: 280px;
}
@media (max-width: 992px) {
    nav{
        width: 100vw;
        height: calc(100vh - 60px);
        position: fixed;
        z-index: 999;
        top: 0;
        left: -150vw;
        transition: left 0.5s;
    }

    .mainContainer{
        height: calc(100vh - 150px);
    }

    .showNav{
        left: 0;
    }
}
</style>