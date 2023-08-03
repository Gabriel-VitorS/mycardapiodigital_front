<template>
    <section class="container mt-4">
        <section class="row">
            <span className="fs-3">{{ $route.params.id == '0' ? 'Incluir Categoria': `Editar Categoria - ID ${$route.params.id}`}}</span>
        </section>

        <section class="row">
            <form ref="form" class="row mt-3">

                <div class="col-lg-6 mt-2">
                    <InputRequired
                    id="name"
                    label="Nome:"
                    placeholder="Digite o nome da categoria"
                    :value="categoria.name" />
                </div>

                <div class="col-lg-6 mb-3">
                    <OrdemInput
                    :idCategoria="categoria.id" 
                    :value="categoria.order"
                    />
                </div>
            </form>
        </section>
    </section>

    <footer class="d-flex justify-content-around">
        <button @click="$router.go(-1)" class="btn btn-secondary">Voltar</button>

        <button v-if="route.params.id != '0'" @click="showModalConfirm = true" class="btn btn-danger">Deletar</button>
        <button v-if="$route.params.id != '0'" @click="submit" class="btn btn-success">Salvar</button>
        <button v-if="$route.params.id == '0'" @click="submit" class="btn btn-success">Incluir</button>
    </footer>


    <ModalConfirm v-if="showModalConfirm" message="Deseja apagar a categoria?" 
    @closeModal="showModalConfirm = false" 
    @confirmButton="destroy"/>

    <ModalLoader v-if="showLoader" />
    <ModalAlert v-if="alert.show" :message="alert.message" @closeButton="$router.push('/gestor/categorias')" />

    <ToastComponent v-if="toast.show"
    :message="toast.message"
    :typeClass="toast.type"/>
</template>

<script lang="ts" setup>

// Componentes
import ModalConfirm from '@/components/gestor/ModalConfirm/ModalConfirm.vue';
import ModalLoader from '@/components/gestor/ModalLoader/ModalLoader.vue';
import ModalAlert from '@/components/gestor/ModalAlert/ModalAlert.vue';
import InputRequired from '@/components/gestor/inputs/InputRequired.vue';
import OrdemInput from '@/components/gestor/inputs/OrdemInput.vue'
import ToastComponent from '@/components/toast/ToastComponent.vue';

// Interfaces e Tipos
import TypeToast from '@/components/toast/typeToast';
import InterfaceToast from '@/components/toast/interfaceToast'
import Categoria from '@/interfaces/Categoria';

// Funcoes importadas
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import fetchDataAuth from '@/fetch/fetchDataAuth';
import useVuelidate from '@vuelidate/core';

// Variaveis
const showLoader = ref<boolean>(false)
const showModalConfirm = ref<boolean>(false)
const alert = ref({
    show: false,
    message: ''
})
const toast = ref<InterfaceToast>({
    show: false,
    message: '',
    type: 'danger'
})
const categoria = ref<Categoria>({
    company_id: 0,
    id: 0,
    order: 0,
    name: '',
    created_at: '',
    updated_at: ''
})
const form = ref<Element | null>(null)
const route = useRoute()
const v$ = useVuelidate()

//Funcoes
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

onMounted( async()=>{
    if(route.params.id == '0')
        return

    showLoader.value = true
    const request = await fetchDataAuth('GET', `category/${route.params.id}`)

    if(request.code != 200){
        showLoader.value = false
        changeToast('Falha ao buscar dados. Tente novamente', 'danger')
        return
    }
    categoria.value = request.data
    setTimeout(()=>{ showLoader.value = false },800)

})

const submit = async () =>{

    if(await v$.value.$validate() == false){
        changeToast('Preencha todos os campos corretamente', 'danger')
        return
    }

    if(form.value == null)
        return
        
    const formData = new FormData((form.value as HTMLFormElement))
    const method: 'PUT' | 'POST' = route.params.id == '0' ? 'POST' : 'PUT'
    const url =  route.params.id == '0' ? 'category' : `category/${route.params.id}`

    console.log( await v$.value.$validate())

    showLoader.value = true
    const request = await fetchDataAuth(method, url, formData)
    showLoader.value = false

    if(request.code == 406){
        changeToast('Campo Ordem já está cadastrado', 'danger')
        return
    }

    if(request.code != 200){
        changeToast('Falha ao salvar categoria. Tente novamente', 'danger')
        return
    }

    if(method == 'POST')
        alert.value.message = 'Categoria salva com sucesso'
    else
        alert.value.message = 'Categoria atualizada com sucesso'
    
    alert.value.show = true

}

const destroy = async () =>{
    showLoader.value = true
    const request = await fetchDataAuth('DELETE', `category/${route.params.id}`)
    showLoader.value = false

    if(request.code != 200){
        changeToast('Falha ao deletar categoria', 'danger')
        return
    }

    alert.value.message = "Categoria deleteda com sucesso"
    alert.value.show = true
}
</script>