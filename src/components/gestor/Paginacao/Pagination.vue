<template>
    <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="previusPage ? '' : 'disabled'">
                <a class="page-link" @click="changePage" href="#">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li v-for="pages in lastPage" :key="pages" class="page-item">
                <a href="#" @click="changePage" class="page-link" :class="pages == currentPage ? 'active': ''">
                    {{ pages }}
                </a>
            </li>

            <li class="page-item" :class="lastPage == currentPage ? 'disabled': ''">
                <a href="#" @click="changePage" class="page-link">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>

        </ul>
    </nav>
</template>

<script>
export default {
    name: 'PaginacaoSection',
    props: {
        lastPage: {type: Number, required: true},
        previusPage: {type: [String, null], required: true},
        currentPage: {type: Number, required: true},
        getData: {type: Function, required: true}
    },
    methods:{
        async changePage(event){
            let page = event.target.innerText

            if(Number(page))
                await this.getData(page)
            else if (page === '»')
                await this.getData(this.currentPage + 1)
            else
                await this.getData(this.currentPage - 1)
        }
    }
}
</script>