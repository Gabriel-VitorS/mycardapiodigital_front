<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import {useTheme} from "@/components/layout/ThemeProvider.vue"

const {isDarkMode} = useTheme()

</script>

<template>
    <div class="admin-layout d-flex">

        <AppSidebar />
        <div class="flex-grow-1 d-flex flex-column">
            <AppHeader/>
            <div class="p-2 p-md-5 h-100" :class="{'bg-light': !isDarkMode}">
                <slot></slot>
            </div>

        </div>
    </div>
</template>

<style scoped>
.admin-layout{
    min-height: 100vh;
}
</style>