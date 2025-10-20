<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {getCompany} from '@/api/manager/company'
import { Toast } from '@/stores/toast';
import type { CompanyResponse } from '@/types/manager/company.type';
import {useTheme} from "@/components/layout/ThemeProvider.vue"

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
})
</script>

<template>
    <header class="border border-subtle py-2 pt-2">
        <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">

            
            <div>
                <router-link to="/gestor">
                    <img v-if="isDarkMode" src="/images/mycardapiodigital_light.svg" alt="logo" width="200">
                    <img v-else src="/images/mycardapiodigital_dark.svg" alt="logo" width="200">
                    
                </router-link>
            </div>

            <div class="d-flex justify-content-end align-items-center">

                <div class="me-3"  @click="toggleTheme" role="button">
                    
                    <i v-if="isDarkMode" class="bi bi-brightness-high-fill"></i>
                    <i v-else class="bi bi-moon-stars-fill"></i>
                </div>


                <div class="dropdown">
                    <a class="btn btn-light dropdown-toggle" :class="{'btn-dark': isDarkMode}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {{company?.name}}
                    </a>

                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Sair</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>

</template>