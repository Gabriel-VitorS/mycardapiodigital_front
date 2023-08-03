<template >
    <section class="container mt-4">
        <form class="row" ref="form">

            <div class="col-lg-6 mt-2">
                <InputRequired 
                id="name_company"
                label="Nome do restaurante:"
                :value="configuracao.name_company"
                />
            </div>

            <div class="col-lg-6 mb-3">
                <urlInput
                :url="configuracao.url" />
            </div>

            <div class="col-md12 row mt-3">
                <CropImageBanner :url_image="configuracao.url_banner " />
            </div>

            <div class="col-md12 row mt-3">
                <CropImageLogo :url_image="configuracao.url_logo" />
            </div>
        </form>
    </section>

    <footer class="d-flex justify-content-around mt-5 pb-3">
                    
        <div>
            <button class="btn btn-success ms-2" @click="submit">Salvar</button>
        </div>
            
    </footer>

    <ToastComponent v-if="toast.show"
    :message="toast.message"
    :typeClass="toast.type"/>

    <ModalAlert v-if="showAlert" message="Configurações salvas com sucesso" @closeButton="$router.go(0)" />
    <ModalLoader v-if="showLoader" />

</template>

<script lang="ts" setup>
// componentes
import urlInput from '@/components/gestor/inputs/urlInput.vue';
import InputRequired from '@/components/gestor/inputs/InputRequired.vue';
import CropImageBanner from '@/components/gestor/CropImage/CropImageBanner.vue'
import CropImageLogo from '@/components/gestor/CropImage/CropImageLogo.vue'
import ToastComponent from '@/components/toast/ToastComponent.vue';
import ModalLoader from '@/components/gestor/ModalLoader/ModalLoader.vue'
import ModalAlert from '@/components/gestor/ModalAlert/ModalAlert.vue'

import InterfaceToast from '@/components/toast/interfaceToast'
import TypeToast from '@/components/toast/typeToast';
import Configuracao from "@/interfaces/Configuracao";
import {ref, onMounted} from 'vue'
import fetchDataAuth from '@/fetch/fetchDataAuth';
import useVuelidate from '@vuelidate/core';

const toast = ref<InterfaceToast>({
    show: false,
    message: '',
    type: 'danger'
})

const showAlert = ref<boolean>(false)
const showLoader = ref<boolean>(false)

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

const form = ref<Element | null>(null)

const configuracao = ref<Configuracao>({
    id: 0,
    company_id: 0,
    name_company: '',
    url: '',
    url_banner: '',
    url_logo: '',
    updated_at: '',
    created_at: '',
})

onMounted(async ()=>{
    showLoader.value = true
    const request = await fetchDataAuth('GET', 'configuration')
    if(request.code != 200){
        changeToast('Falha ao buscar dados. Atualize a página', 'danger')
        showLoader.value = false
        return
    }
    configuracao.value = request.data

    setTimeout(()=>{
        showLoader.value = false
    }, 800)

    
})

const v$ = useVuelidate()  

const submit = async() =>{
    if(form.value == null)
        return

    const formData = new FormData((form.value as HTMLFormElement))
    if(await v$.value.$validate() == false){
        changeToast('Preencha o Nome do Restaurante e URL corretamente', 'danger')
        return
    }

    const url:string = configuracao.value.id == 0 ? 'configuration' : `configuration/${configuracao.value.id}`
    const typeFetch: 'POST' | 'PUT' = configuracao.value.id == 0 ? 'POST' : 'PUT'

    showAlert.value = true
    const request = await fetchDataAuth(typeFetch, url, formData)
    showAlert.value = false
    if(request.code == 406){
        changeToast('URL já está em uso. Utilize outra URL', 'danger')
        return
    }

    if(request.code != 200){
        changeToast('Falha ao salvar configuração. Tente novamente', 'danger')
        return
    }
 
    showAlert.value = true

}
</script>