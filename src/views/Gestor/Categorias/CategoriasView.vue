<template >
    <div class="container">
        <section class="row ">
            <div class="col-lg-2">
                <select v-model="filter.name" class="form-select form-select">
                    <option value="">Selecione um filtro</option>
                    <option value="name">Nome</option>
                </select>
            </div>

            <div class="col-lg-2 mt-2 mt-lg-0">
                <div class="d-flex">
                    <input v-model="filter.value" @keyup.enter="getData(1)" type="text" id="filterInput" class="form-control" />
                    
                    <i v-show="filter.hasFilter" @click="resetFilter" 
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

                
                <tbody v-if="categorias">
                    
                    <tr class="cursorPointer" v-for="categoria in categorias" :key="categoria.id" @click="$router.push(`/gestor/categorias/${categoria.id}`)">
                        <td>{{ categoria.id }}</td>
                        <td>{{ categoria.name }}</td>
                        <td>{{ categoria.order }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="showSpin" class="d-flex justify-content-center mt-3">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </div>
        </section>
    </div>

    <PaginationComponente v-if="categorias"
    :lastPage="paginacao.last_page"
    :previusPage="paginacao.previous_page_url"
    :currentPage="paginacao.current_page"
    :getData="getData"    
    />

    <ToastComponent v-if="toast.show"
    :message="toast.message"
    :typeClass="toast.type"/>

</template>

<script lang="ts" setup>
// Componentes
import PaginationComponente from '@/components/gestor/Paginacao/PaginationComponente.vue'
import ToastComponent from '@/components/toast/ToastComponent.vue';

// Interfaces e tipos
import InterfaceToast from '@/components/toast/interfaceToast'
import Categoria from '@/interfaces/Categoria'
import Paginacao from '@/interfaces/Paginacao';
import TypeToast from '@/components/toast/typeToast';

// Funcoes importadas
import fetchDataAuth from '@/fetch/fetchDataAuth';
import {ref, onMounted} from 'vue'

// Refs
const categorias = ref<Array<Categoria>>()
const showSpin = ref<boolean>(false)
    
const toast = ref<InterfaceToast>({
    show: false,
    message: '',
    type: 'danger'
})

const filter = ref({
    name: '',
    value: '',
    hasFilter: false
})

const paginacao = ref<Paginacao>({
    current_page: 1,
    previous_page_url: '',
    last_page: 0
})

// Funcoes
onMounted( async ()=>{
    await getData(1)
})
const changeToast = (message: string, type: TypeToast)=>{
    if(toast.value.show == true){
        toast.value.show = false
    }
    toast.value.message = message
    toast.value.type = type

    toast.value.show = true
    setTimeout(()=>{
        toast.value.show = false
    },5000)
}

const resetFilter = async () =>{
    filter.value.name = ''
    filter.value.value = ''
    filter.value.hasFilter = false
    await getData(1)
}


const getData = async (page: number) =>{
    const params = new URLSearchParams([['page', `${page}`]])
    
    showSpin.value = true

    if(filter.value.name == 'name' && filter.value.value != ''){
        filter.value.hasFilter = true
        params.append('name', filter.value.value)
    }
    
    const request = await fetchDataAuth('GET', 'category', {}, params)
    if(request.code != 200){
        showSpin.value = false
        changeToast('Falha ao buscar dados. Atualize a página', 'danger')
        return
    }
    showSpin.value = false
    categorias.value = request.data.data
    paginacao.value = request.data.meta
}
</script>