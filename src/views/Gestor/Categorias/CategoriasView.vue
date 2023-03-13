<template >
    <div class="container">
        <section class="row ">
            <div class="col-lg-2">
                <select v-model="filter" class="form-select form-select">
                    <option value="">Selecione um filtro</option>
                    <option value="name">Nome</option>
                </select>
            </div>

            <div class="col-lg-2 mt-2 mt-lg-0">
                <div class="d-flex">
                    <input v-model="filterValue" @keyup.enter="getData(1)" type="text" id="filterInput" class="form-control" />
                    
                    <i v-show="hasFilter" @click="filterValue = ''; getData(1)" 
                    class="bi bi-x-circle text-danger btn ms-2" title="Limpar filtro"></i>
                </div>
                
            </div>
            <div class="col-lg-5 mt-2 mt-lg-0">
                <button class="btn btn-secondary me-2" @click="getData(1)">Filtrar</button>
                <button class="btn btn-primary ms-2" @click="$router.push(`/gestor/categorias/0`)">Incluir</button>
            </div>
        </section>

        <section class="row mt-3">

            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Ordem</th>
                    </tr>
                </thead>

                
                <tbody v-if="category">
                    
                    <tr class="cursorPointer" v-for="categories in category.data" :key="categories.id" @click="$router.push(`/gestor/categorias/${categories.id}`)">
                        <td>{{ categories.id }}</td>
                        <td>{{ categories.name }}</td>
                        <td>{{ categories.order }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="showSpin" class="d-flex justify-content-center mt-3">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </div>
        </section>
    </div>

    <Pagination v-if="category"
    :lastPage="category.meta.last_page"
    :previusPage="category.meta.previous_page_url"
    :currentPage="category.meta.current_page"
    :getData="getData"    
    />

    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div ref="toaster" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                Error ao tentar buscar dados. Tente novamente
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import Pagination from '@/components/gestor/Paginacao/Pagination.vue'
import { Toast } from 'bootstrap'

export default {
    name: 'ConfiguracoesView',
    components: {Pagination},
    data(){
        return{
            category: null,
            currentPage: 1,
            filter: '',
            filterValue: '',
            hasFilter: false,
            showSpin: false
        }
    },
    mounted(){
        this.getData(this.currentPage)
    },
    methods:{
        async getData(page){
            const toaster = new Toast(this.$refs.toaster)

            this.showSpin = true
            this.category = null

            if(this.filterValue == '')
                this.hasFilter = false
            else
                this.hasFilter = true

            var params  = new URLSearchParams([['page', page]]);
            if(this.filter == 'name'){
                params  = new URLSearchParams([['page', page], ['name', this.filterValue]]);
            }

            await axios.get(`${process.env.VUE_APP_URL_API}/category`,{
                params,
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
            })
            .catch((error) => {
                console.log(error)
                toaster.show()
                this.showSpin = false
            })
            .then((data)=>{
                this.category = data.data.data
                this.currentPage = this.category.meta.current_page
            })

            this.showSpin = false
        },
    }
}
</script>