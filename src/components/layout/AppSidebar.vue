

<script lang="ts" setup>
import {useTheme} from '@/components/layout/ThemeProvider.vue'
import GearIcon from '@/components/icons/GearIcon.vue'
import HouseIcon from '@/components/icons/HouseIcon.vue'
import TagsIcon from '../icons/TagsIcon.vue';
import BoxIcon from '../icons/BoxIcon.vue';

import { useRoute } from "vue-router";
import { useMenuSideBar } from '@/stores/menuSideBarStore';
import XIcon from '../icons/XIcon.vue';

const route = useRoute()
const menuSideBarStore = useMenuSideBar()
const isActive = (path:string)=>route.path === path

const {isDarkMode} = useTheme()

const menuGroup = [
    {
        icon: HouseIcon,
        name: 'Início',
        path: '/gestor'
    },
    {
        icon: GearIcon,
        name: 'Config Cardápio',
        path: '/gestor/configuracao-cardapio'
    },
    {
        icon: TagsIcon,
        name: 'Categorias',
        path: '/gestor/categorias'
    },
    {
        icon: BoxIcon,
        name: 'Produtos',
        path: '/gestor/produtos'
    }
]
</script>

<style scoped>
    aside{
        width: 280px;
        transition: left 0.3s ease-in-out;
    }

    @media screen and (max-width: 768px) {
  /* Styles to apply when the screen width is at least 768px */
        aside{
            position: fixed;
            left: -500px;
            height: 100vh;
        }

        .show-sidebar{
            left: 0;
            position: absolute;
            width: 100vw;
            z-index: 5;
        }
    }
</style>

<template>
    <aside class="border-end border-subtle py-2 pt-2 ps-3 pe-3 d-flex flex-column flex-shrink-0 bg-light"
     :class="{'show-sidebar': menuSideBarStore.hideOrShowMenu, 'bg-dark': isDarkMode}">
        <div class="d-flex justify-content-between">

            <router-link to="/gestor">
                <img v-if="isDarkMode" src="/images/mycardapiodigital_light.svg" alt="logo" width="150">
                <img v-else src="/images/mycardapiodigital_dark.svg" alt="logo" width="150">
                
            </router-link>

            <div class="d-flex justify-content-center d-md-none d-block" style="width: 30px; height: 30px;" role="button" @click="menuSideBarStore.toggleMenu()">
                <XIcon class="mt-1" />

            </div>
        </div>

        <hr>

        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <RouterLink v-for="item in menuGroup" :key="item.name" class="nav-link" :class="{'active': isActive(item.path)}" :to="item.path">
                    <component :is="item.icon" class="me-2" style="font-size: 18px;" /> {{ item.name }}
                </RouterLink>
            </li>
        </ul>
    </aside>
</template>
