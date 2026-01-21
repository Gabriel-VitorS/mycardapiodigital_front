<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {getCompany} from '@/api/manager/company'
import { Toast } from '@/stores/toast';
import type { CompanyResponse } from '@/types/manager/company.type';
import {useTheme} from "@/components/layout/ThemeProvider.vue"
import { useMenuSideBar } from '@/stores/menuSideBarStore';
const menuSideBarStore = useMenuSideBar()
import { useMenuConfigStore } from '@/stores/menuConfigstore';
const menuConfigStore = useMenuConfigStore()

const {toggleTheme, isDarkMode} = useTheme()
const company = ref<CompanyResponse>()

onMounted( async () => {

    await getCompany()
    .then((response)=>{    
        company.value = response.data
    })
    .catch((err)=>{
        console.error('Login error', err);

        Toast().error('Erro ao buscar dados do usuário.');
    })

    await menuConfigStore.loadMenuConfig()
})
</script>

<template>
    <header class="border-bottom border-subtle py-3 pt-2">
        <div class="container-fluid ">
            <div class="row">

                <div class="col">
                    <div class="border text-center d-md-none d-block" style="border-radius: 5px; width: 45px;" role="button"  @click="menuSideBarStore.toggleMenu()">
                        <i class="bi bi-list fs-4"></i>
                    </div>
                </div>
                
                <div class="col">
                    <router-link to="/gestor/inicio">
                        <!-- <div class="d-md-none d-block">
                            <img v-if="isDarkMode" src="/images/mycardapiodigital_light.svg" alt="logo">
                            <img v-else src="/images/mycardapiodigital_dark.svg" alt="logo" >
                            
                        </div> -->
                        
                    </router-link>
                </div>

                <div class="col d-flex justify-content-end align-items-center">

                    <div class="me-3"  @click="toggleTheme" role="button">
                        
                        <i v-if="isDarkMode" class="bi bi-brightness-high-fill"></i>
                        <i v-else class="bi bi-moon-stars-fill"></i>
                    </div>
                    

                    <div class="dropdown ">
                        <a class="btn btn-light dropdown-toggle" :class="{'btn-dark': isDarkMode}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{company?.name}}
                        </a>
                        
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Sair</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    
</template>

<style scoped>
img {
    max-width: 100%;
    height: auto;
}
</style>