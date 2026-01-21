<script lang="ts" setup>
import ComponentCard from '@/components/common/ComponentCard.vue';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import SpinnerSm from '@/components/ui/SpinnerSm.vue';
import XIcon from '@/components/icons/XIcon.vue';
import SelectInput from '@/components/Form/SelectInput.vue';
import SearchDefaultInput from '@/components/Form/SearchDefaultInput.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import PaginationComponent from '@/components/common/PaginationComponent.vue';

import type { ProductParams } from '@/types/manager/product.type';
import { ref, onMounted} from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useCurrency } from '@/composables/useCurrency';
const {formatBRL} = useCurrency()


const productStore = useProductStore();
const isLoading = ref(true)
const hasFilter = ref(false) 

const { handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
        filterValue: yup.string().required('')
    })

});

const params: ProductParams = {
    page: 1
}



const resetFilter = () =>{
    delete params['name']
    delete params['highlight']
    delete params['visible_online']
    delete params['category']
    hasFilter.value = false
    resetForm()
    getData()
}


const searchDatas = handleSubmit( async (values)=>{
    
    if(values.selectedFilter != ''){
        hasFilter.value = true
        params[values.selectedFilter] = values.filterValue

        if(values.selectedFilter == 'highlight' || values.selectedFilter == 'visible_online'){
            if(values.filterValue.toLowerCase() == 's'){
                params[values.selectedFilter] = 'true'
            }else if(values.filterValue.toLowerCase() == 'n'){
                params[values.selectedFilter] = 'false'
            }
        }
        
    }

    getData()
})

onMounted( async ()=>{
    await getData()
})

const getData = async (page: number = 1) =>{
    isLoading.value = true
    
    params.page = page
    await productStore.loadProducts(params)
    isLoading.value = false
}


</script>
<template>
    <PageBreadcrumb page-title="Produtos" />
    <ComponentCard page-title="Produtos">
        <form class="row gy-2" @submit.prevent="searchDatas">
            <div class="col-lg-2">
                <SelectInput
                name="selectedFilter"
                :options="[
                    {label: 'Nome', value: 'name'},
                    {label: 'Em destaque? (s/n)', value: 'highlight'},
                    {label: 'Visível online? (s/n)', value: 'visible_online'},
                    {label: 'Categoria', value: 'category'}
                ]"
                />
            </div>

            <div class="col-lg-2">
                <SearchDefaultInput
                name="filterValue"
                />
            </div>

            <div class="col-auto">
                <XIcon class="me-3" role="button" v-if="hasFilter" @click="resetFilter"/>
                <button class="btn btn-secondary"><SearchIcon class="me-2" /> Buscar </button>
            </div>

            <div class="col-auto text-end">
                <RouterLink :to="{name: 'product-modal', params: {productId: 0}}" type="button" class="btn btn-primary"><PlusIcon class="me-2" /> Incluir </RouterLink>
            </div>

        </form>

        <section class="row mt-4" v-if="productStore.products && !isLoading">

            <table class="table table-hover" style="--bs-table-bg: none">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Destaque</th>
                        <th>Visível online</th>
                        <th>Categoria</th>
                    </tr>
                </thead>


                <tbody >
                    
                    <tr class="cursor-pointer" v-for="product in productStore.products.data" :key="product.id" @click="$router.push({name: 'product-modal', params: {productId: product.id}})">
                        <td scope="row" role="button">{{ product.name }}</td>
                        <td role="button">{{ formatBRL(product.value) }}</td>
                        <td role="button">{{ product.highlight == 1 ? "Sim": "Não" }}</td>
                        <td role="button">{{ product.visible_online == 1 ? "Sim": "Não" }}</td>
                        <td role="button">{{ product.category?.name }}</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="row mt-4" v-if="isLoading">
            <div class="text-center" >
                <span>Carregando dados</span><br>
                <SpinnerSm></SpinnerSm>
            </div>
        </section>

        <PaginationComponent v-if="productStore.products"
        :current-page="productStore.products.current_page"
        :last-page="productStore.products.last_page"
        :previus-page="productStore.products.prev_page_url"
        :get-data="getData"
        />
    </ComponentCard>

    <RouterView />
</template>