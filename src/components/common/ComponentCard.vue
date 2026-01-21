<script lang="ts" setup>
import {useTheme} from "@/components/layout/ThemeProvider.vue"

const {isDarkMode} = useTheme()

defineProps({
    pageTitle: {type: String, required: true}
})
// :class="{'bg-light-subtle': isDarkMode, 'bg-dark-subtle': !isDarkMode}"
</script>
<style scoped>
#componentCard{
 border-radius: 12px;
}

</style>

<template>
    <section id="componentCard" class="container-fluid mt-4 p-3 p-md-4 border" :class="{'bg-light-subtle': isDarkMode, 'bg-white': !isDarkMode}" >
        <div>
            <h5>{{ pageTitle }}</h5>
        </div>
        <hr>
        <slot></slot>
    </section>
</template>