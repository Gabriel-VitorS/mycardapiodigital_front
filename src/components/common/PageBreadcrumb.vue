<script lang="ts" setup>
import {useTheme} from "@/components/layout/ThemeProvider.vue"
import ChevronRightIcon from "../icons/ChevronRightIcon.vue";

const {isDarkMode} = useTheme()

defineProps({
    pageTitle: {type: String, required: true}
})

</script>

<style scoped>
</style>

<template>
    <section class="row">
        <div class="col-md-8">
            <h4 class="p-0 m-0">{{ pageTitle }}</h4>
        </div>

        <div class="col-md-4 mt-2 text-md-end text-start">
            <RouterLink to="/gestor/inicio"  class=" link-underline-opacity-0" :class="{'link-light': isDarkMode, 'link-dark': !isDarkMode}"> Ínicio</RouterLink>
            <ChevronRightIcon style="font-size: 0.8em;" class="px-2"/>
            <a class=" link-underline-opacity-0" :class="{'link-light': isDarkMode, 'link-dark': !isDarkMode}"> {{ pageTitle }}</a>
        </div>

    </section>
</template>