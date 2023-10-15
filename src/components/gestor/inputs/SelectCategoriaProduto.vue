<template>

    <label>
       Categoria:
    </label>
    <select v-model="selectedCategoria" name="category_id" class="form-select">
        <option value="">Selecione uma categoria</option>
        <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.name }}</option>
    </select>

    <ToastComponent v-if="toastShow"
    message="Falha ao buscar categorias"
    typeClass="danger"/>
</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted,ref, defineProps} from 'vue'
import fetchDataAuth from '@/fetch/fetchDataAuth';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Categoria from '@/interfaces/Categoria';

import ToastComponent from '@/components/toast/ToastComponent.vue';

const categorias = ref<Array<Categoria>>()
const toastShow = ref<boolean>(false)
const selectedCategoria = ref<string>('')

useVuelidate({
    selectedCategoria:{
        required
    }
}, {selectedCategoria})

const props = defineProps<{
    categoria: number | null
}>()

onBeforeMount( async()=>{
    const request = await fetchDataAuth('GET', 'category', {}, new URLSearchParams([['limit', '300']]))

    if(request.code != 200){
        toastShow.value = true
        setTimeout(()=>{
            toastShow.value = false
        },5000)
        return
    }
    categorias.value = request.data.data
})

onMounted(()=>{
    setTimeout(() => {
        if(props.categoria == 0 || props.categoria == null)
            selectedCategoria.value = ''
        else
            selectedCategoria.value = `${props.categoria}`
    }, 500);
})

</script>