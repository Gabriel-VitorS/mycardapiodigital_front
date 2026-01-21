<script lang="ts" setup>
import { useMenuStore } from '@/stores/menuStore';
const menuStore = useMenuStore();

const scrollToCategory = (categoryId: number): void=> {
    const element = document.getElementById(`${categoryId}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
};

</script>

<template>
    <footer class="row align-items-center justify-content-evenly flex-column"
    :style="{backgroundColor: menuStore.menuData?.configuration.background_color}">

        <button v-for="category in menuStore.menuData?.categories" 
        type="button" 
        class="btn btn-secondary px-3 mx-3" 
        :style="{backgroundColor: menuStore.menuData?.configuration.theme_color, borderColor: menuStore.menuData?.configuration.theme_color }"
        :key="category.id"
        @click="scrollToCategory(category.id)"
        >
            {{ category.name }}
        </button>

        
    </footer>
</template>

<style scoped>
    footer {
        position: sticky;
        bottom: 0px;
        overflow-x: auto;
        height: 61px;
    }
    button {
        white-space: nowrap;
        width: 120px;
    }
</style>