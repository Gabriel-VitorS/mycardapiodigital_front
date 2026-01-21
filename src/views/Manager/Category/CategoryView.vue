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

import type { CategoryParams } from '@/types/manager/category.type';
import { ref, onMounted} from 'vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { useForm } from 'vee-validate';
import * as yup from 'yup';


const categoryStore = useCategoryStore();
const isLoading = ref(true)
const hasFilter = ref(false) 

const { handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
        filterValue: yup.string().required('')
    })

});

const params: CategoryParams = {
    page: 1
}



const resetFilter = () =>{
    delete params['name']
    hasFilter.value = false
    resetForm()
    getData()
}

const searchDatas = handleSubmit( async (values)=>{
    if(values.selectedFilter != ''){
        hasFilter.value = true
        params.name = values.filterValue

    }

    getData()
})

onMounted( async ()=>{
    await getData()
})

const getData = async (page: number = 1) =>{
    isLoading.value = true

    params.page = page
    await categoryStore.loadCategories(params)
    isLoading.value = false
}


</script>
<template>
    <PageBreadcrumb page-title="Categorias" />
    <ComponentCard page-title="Categorias">
        <form class="row gy-2" @submit.prevent="searchDatas">
            <div class="col-lg-2">
                <SelectInput
                name="selectedFilter"
                :options="[
                    {label: 'Nome', value: 'name'},
                    {label: 'Ordem de exibição', value: 'order'}
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
                <RouterLink :to="{name: 'category-modal', params: {categoryId: 0}}" type="button" class="btn btn-primary"><PlusIcon class="me-2" /> Incluir </RouterLink>
            </div>

        </form>

        <section class="row mt-4" v-if="categoryStore.categories && !isLoading">

            <table class="table table-hover" style="--bs-table-bg: none">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Ordem de exibição</th>
                    </tr>
                </thead>


                <tbody >
                    
                    <tr class="cursor-pointer" v-for="category in categoryStore.categories.data" :key="category.id" @click="$router.push({name: 'category-modal', params: {categoryId: category.id}})">
                        <td scope="row" role="button">{{ category.name }}</td>
                        <td role="button">{{ category.order }}</td>
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

        <PaginationComponent v-if="categoryStore.categories"
        :current-page="categoryStore.categories.current_page"
        :last-page="categoryStore.categories.last_page"
        :previus-page="categoryStore.categories.prev_page_url"
        :get-data="getData"
        />
    </ComponentCard>

    <RouterView />
</template>