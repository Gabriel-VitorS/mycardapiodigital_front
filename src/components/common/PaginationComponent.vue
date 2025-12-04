<script lang="ts" setup>
import {computed} from 'vue'

const props = defineProps<{
    lastPage: number,
    previusPage: string | null,
    currentPage: number
    getData: (page: number) => Promise<void>
}>()

const disablePrevius = computed(()=>{
    return props.previusPage ? false : true
})

const disableNext = computed(()=>{
    return props.lastPage == props.currentPage ? true : false
})

</script>

<template>
    <nav class="pb-1">
        <ul class="pagination justify-content-center">
            <li class="page-item" >
                <button class="page-link" @click.prevent="getData(currentPage - 1)" :class="{'disabled' : disablePrevius}">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>

            <li v-for="pages in lastPage" :key="pages" class="page-item">
                <button @click.prevent="getData(pages)" class="page-link" :class="pages == currentPage ? 'active': ''">
                    {{ pages }}
                </button>
            </li>

            <li class="page-item" >
                <button @click.prevent="getData(currentPage + 1)" class="page-link" :class="{'disabled': disableNext}" >
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>

        </ul>
    </nav>
</template>
