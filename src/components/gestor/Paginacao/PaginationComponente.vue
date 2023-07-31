<template>
    <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="previusPage ? '' : 'disabled'">
                <a class="page-link" @click.prevent="changePage" href="#">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li v-for="pages in lastPage" :key="pages" class="page-item">
                <a href="#" @click.prevent="changePage" class="page-link" :class="pages == currentPage ? 'active': ''">
                    {{ pages }}
                </a>
            </li>

            <li class="page-item" :class="lastPage == currentPage ? 'disabled': ''">
                <a @click.prevent="changePage" class="page-link" href="#">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>

        </ul>
    </nav>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'

const props = defineProps<{
    lastPage: number,
    previusPage: string | null,
    currentPage: number
    getData: (page: number) => Promise<void>
}>()

const changePage = async (event: Event) =>{
    const page: string | number = (event.target as HTMLElement).innerText

    if(Number(page))
        await props.getData(Number(page))
    else if (page === '»')
        await props.getData(props.currentPage + 1)
    else
        await props.getData(props.currentPage - 1)
    
}

</script>