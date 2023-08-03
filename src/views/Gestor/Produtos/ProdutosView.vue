<template >
<div class="container mt-4">
        <section class="row ">
            <div class="col-lg-2">
                <select v-model="filter.name" class="form-select form-select">
                    <option value="">Selecione um filtro</option>
                    <option value="name">Nome</option>
                    <option value="highlight">Destaque</option>
                    <option value="visible_online">Visível online</option>
                    <option value="category_id">Id categoria</option>
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
                <button class="btn btn-primary ms-2" @click="$router.push(`/gestor/produtos/0`)">Incluir</button>
            </div>
        </section>

        <section class="row mt-3 overflow-auto">

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

                
                <tbody v-if="produtos">
                    
                    <tr class="cursorPointer" v-for="produto in produtos" :key="produto.id" @click="$router.push(`/gestor/produtos/${produto.id}`)">
                        <td>{{ produto.id }}</td>
                        <td>{{ produto.name }}</td>
                        <td>{{produto.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</td>
                        <td>{{produto.highlight == 'true' ? 'Sim' : 'Não'}}</td>
                        <td>{{produto.visible_online == 'true' ? 'Sim' : 'Não'}}</td>
                        <td>{{produto.category_id}}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="showSpin" class="d-flex justify-content-center mt-3">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </div>
        </section>
    </div>

    <PaginationComponente v-if="produtos"
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
import ToastComponent from '@/components/toast/ToastComponent.vue';
import PaginationComponente from '@/components/gestor/Paginacao/PaginationComponente.vue'

// Interfaces e tipos
import InterfaceToast from '@/components/toast/interfaceToast'
import TypeToast from '@/components/toast/typeToast';
import Paginacao from '@/interfaces/Paginacao';
import Produto from '@/interfaces/Produto';

// Funcoes importadas
import fetchDataAuth from '@/fetch/fetchDataAuth';
import {ref, onMounted} from 'vue'


const produtos = ref<Array<Produto>>()
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

const resetFilter = async() =>{
    filter.value.name = ''
    filter.value.value = ''
    filter.value.hasFilter = false
    await getData(1)
}

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

const getData = async (page: number) =>{
    const params = new URLSearchParams([['page', `${page}`]])
    
    showSpin.value = true

    if(filter.value.name != '' && filter.value.value != ''){
        filter.value.hasFilter = true

        if(filter.value.name == 'highlight' || filter.value.name == 'visible_online'){

            switch (filter.value.value.toLowerCase()) {
                case 'nao':
                    params.append(filter.value.name, '0')            
                    break;
                case 'não':
                    params.append(filter.value.name, '0')            
                    break;
                case 'n':
                    params.append(filter.value.name, '0')            
                    break;
                case 'sim' || 's':
                    params.append(filter.value.name, '1')            
                    break
                default:
                    params.append(filter.value.name, '1')            
                    break;
            }

        }else{
            params.append(filter.value.name, filter.value.value)
        }

    }

    const request = await fetchDataAuth('GET', 'product', {}, params)
    if(request.code != 200){
        showSpin.value = false
        changeToast('Falha ao buscar dados. Atualize a página', 'danger')
        return
    }
    showSpin.value = false
    produtos.value = request.data.data
    paginacao.value = request.data.meta
}
</script>