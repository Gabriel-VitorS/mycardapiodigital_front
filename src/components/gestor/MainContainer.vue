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
                    :class="$route.path.split('/').length == 2 ? 'active text-light' : 'link-dark' ">
                        Ínicio
                    </router-link>
                </li>

                <li className="nav-item">
                    <router-link to="/gestor/configuracoes" class="nav-link"
                    :class="$route.path.includes('configuracoes') ? 'active text-light': 'link-dark' " >
                        Configurações
                    </router-link>
                </li>

                <li className="nav-item">
                    <router-link to="/gestor/categorias" class="nav-link "
                    :class="$route.path.includes('categorias') ? 'active text-light': 'link-dark' ">
                        Categorias
                    </router-link>
                </li>

                <li className="nav-item">
                    <router-link to="/gestor/produtos" class="nav-link"
                    :class="$route.path.includes('produtos') ? 'active text-light': 'link-dark' ">
                        Produtos
                    </router-link>
                </li>
            </ul>

            <hr />

            <div className="d-flex justify-content-lg-center justify-content-between">
                <div class="dropdown">
                    <a ref="dropDownMain" class="dropdown-toggle text-dark text-decoration-none" @click="showDropDown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span v-if="nameCompany === ''" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <strong v-else>{{ nameCompany }}</strong>
                    </a>

                    <ul class="dropdown-menu">
                        <li @click="loggout" ><a href="#" class="dropdown-item">Sair</a></li>
                    </ul>
                </div>
                <i class="bi bi-arrow-bar-left d-lg-none d-block fs-5" @click="showMenu = false"></i>
            </div>
        </nav>

        
        <section class="w-100">
            <section class="border bg-light d-lg-none d-md-block">

                <div class="col-1 ps-3">
                    <i class="bi bi-list fs-1 d-lg-none d-block" @click="showMenu = true"></i>
                </div>                    

            </section>
    
            <router-view > </router-view>
            
        </section>
        
    </main>
  
    
    

</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import router from '@/router';
import { onBeforeRouteUpdate } from 'vue-router';
import { Dropdown } from 'bootstrap';
import fetchDataAuth from '@/fetch/fetchDataAuth';
const showMenu = ref<boolean>(false)
const nameCompany = ref<string>('')
const dropDownMain = ref<Element| null>(null)

const showDropDown = () =>{
    if(dropDownMain.value != null){
        new Dropdown(dropDownMain.value).show()
    }
}

onBeforeRouteUpdate(()=>{
    showMenu.value = false
})

const loggout = async () => {
    await fetchDataAuth('GET', '')
    sessionStorage.removeItem('JWT')
    router.push('/login')
}

onMounted(async ()=>{
    const request = await fetchDataAuth('GET', 'company')

    if(request.code == 200){
        nameCompany.value = request.data.name
    }

})

</script>

<style scoped>

nav{
    width: 280px;
}
@media (max-width: 992px) {
    nav{
        width: 100vw;
        position: fixed;
        z-index: 10;
        height: 100%;
        left: -100%;
        transition: left 0.5s;
    }

    .showNav{
        left: 0;
    }
}
</style>