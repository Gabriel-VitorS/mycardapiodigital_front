<script lang="ts" setup>
import BoxArrowUpRight from '@/components/icons/BoxArrowUpRight.vue';
import BoxIcon from '@/components/icons/BoxIcon.vue';
import GearIcon from '@/components/icons/GearIcon.vue';
import TagsIcon from '@/components/icons/TagsIcon.vue';
import { useMenuConfigStore } from '@/stores/menuConfigstore';
const menuConfigStore = useMenuConfigStore();

</script>

<template>
    <div class="container ">
        <div class="row justify-content-center gy-2">
            
            <RouterLink to="/gestor/configuracao-cardapio" class="card col-12 col-md-12 me-2" style="width: 18rem;">
                <div class="card-body text-center">
                    <GearIcon  style="font-size: 2rem;"/>
                    <p>Config Cardápio</p>
                </div>
            </RouterLink>

            <RouterLink to="/gestor/categorias" class="card col-12 col-md-12 me-2" style="width: 18rem;">
                <div class="card-body text-center">
                    <TagsIcon  style="font-size: 2rem;"/>
                    <p>Categorias</p>
                </div>
            </RouterLink>

            <RouterLink to="/gestor/produtos" class="card col-12 col-md-12 me-2" style="width: 18rem;">
                <div class="card-body text-center">
                    <BoxIcon  style="font-size: 2rem;"/>
                    <p>Produtos</p>
                </div>
            </RouterLink>

            <a v-if="menuConfigStore.isMenuConfigured" :href="menuConfigStore.linkToMenu" target="_blank" class="card col-12 col-md-12 me-2" style="width: 18rem;">
                <div class="card-body text-center">
                    <BoxArrowUpRight  style="font-size: 2rem;"/>
                    <p>Acessar cardápio</p>
                </div>
            </a>
        </div>
    </div>
</template>