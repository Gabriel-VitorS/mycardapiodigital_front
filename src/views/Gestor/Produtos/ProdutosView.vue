<template >
<div class="container">
        <section class="row ">
            <div class="col-lg-2">
                <select v-model="filter" class="form-select form-select">
                    <option value="">Selecione um filtro</option>
                    <option value="name">Nome</option>
                    <option value="highlight">Destaque</option>
                    <option value="visible_online">Visível online</option>
                    <option value="category_id">Id categoria</option>
                </select>
            </div>

            <div class="col-lg-2 mt-2 mt-lg-0">
                <div class="d-flex">
                    <input v-model="filterValue" @keyup.enter="getData(1)" type="text" id="filterInput" class="form-control" />
                    
                    <i v-show="hasFilter" @click="filterValue = ''; filter = '';getData(1)" 
                    class="bi bi-x-circle text-danger btn ms-2" title="Limpar filtro"></i>
                </div>
                
            </div>
            <div class="col-lg-5 mt-2 mt-lg-0">
                <button class="btn btn-secondary me-2" @click="getData(1)">Filtrar</button>
                <button class="btn btn-primary ms-2" @click="$router.push(`/gestor/produtos/0`)">Incluir</button>
            </div>
        </section>

        <section class="row mt-3">

            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Destaque</th>
                        <th>Visível online</th>
                        <th>Id categoria</th>
                    </tr>
                </thead>

                
                <tbody v-if="product">
                    
                    <tr class="cursorPointer" v-for="product in product.data" :key="product.id" @click="$router.push(`/gestor/produtos/${product.id}`)">
                        <td>{{ product.id }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{product.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</td>
                        <td>{{product.highlight === 'true' ? 'Sim' : 'Não'}}</td>
                        <td>{{product.visible_online === 'true' ? 'Sim' : 'Não'}}</td>
                        <td>{{product.category_id}}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="showSpin" class="d-flex justify-content-center mt-3">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </div>
        </section>
    </div>

    <Pagination v-if="product"
    :lastPage="product.meta.last_page"
    :previusPage="product.meta.previous_page_url"
    :currentPage="product.meta.current_page"
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
    name: 'GestorProdutosView',
    components: {Pagination},
    data(){
        return{
            product: null,
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
            this.product = null

            if(this.filterValue == '')
                this.hasFilter = false
            else
                this.hasFilter = true

            var params  = new URLSearchParams([['page', page]]);
            if(this.filter == 'name'){
                params  = new URLSearchParams([['page', page], ['name', this.filterValue]]);
            }

            if(this.filter == 'highlight'){
                let inputFilter = 'false'
                if(this.filterValue.toLocaleLowerCase() === 's' || this.filterValue.toLocaleLowerCase() === 'sim')
                    inputFilter = 'true'
                params  = new URLSearchParams([['page', page], ['highlight', inputFilter]]);
            }

            if(this.filter == 'visible_online'){
                let inputFilter = 'false'
                if(this.filterValue.toLocaleLowerCase() === 's' || this.filterValue.toLocaleLowerCase() === 'sim')
                    inputFilter = 'true'
                params  = new URLSearchParams([['page', page], ['visible_online', inputFilter]]);
            }

            if(this.filter == 'category_id'){
                params  = new URLSearchParams([['page', page], ['category_id', this.filterValue]]);
            }

            await axios.get(`${process.env.VUE_APP_URL_API}/product`,{
                params,
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
            })
            .catch((error) => {
                console.log(error)
                toaster.show()
                this.showSpin = false
            })
            .then((data)=>{
                this.product = data.data.data
                this.currentPage = this.product.meta.current_page
            })

            this.showSpin = false
        },
    }
}
</script>