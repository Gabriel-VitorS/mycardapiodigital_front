<template>
    <form class="col-md-4" @submit.prevent="submit">
        <div class="mb-3">
            <InputRequired label="Nome:" id="name" placeholder="Digite seu nome"></InputRequired>
        </div>
        
        <CpfCnpj></CpfCnpj>

        <EmailInput></EmailInput>
        <SenhaInput></SenhaInput>

        <div class="d-flex justify-content-around flex-wrap mt-3">
            <button  type="button" @click="router.push('/login')" class="btn btn-light">Entrar</button>

            <button type="submit" :disabled="buttonDisabled" class="btn btn-primary">
                Cadastrar 
                <span v-if="showSpin" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
        </div>
    </form>

    <ToastComponent v-if="showToast"
    :message="toastMessage"
    :typeClass="toastType"/>

</template>

<script lang="ts" setup>
import router from '@/router'
import {ref} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import TypeToast from '@/components/toast/typeToast'
import fetchData from '@/fetch/fetchData'

// componentes
import CpfCnpj from '../inputs/CpfCnpj.vue'
import SenhaInput from '../inputs/SenhaInput.vue'
import EmailInput from '../inputs/EmailInput.vue'
import InputRequired from "../inputs/InputRequired.vue";
import ToastComponent from '../../toast/ToastComponent.vue'

// variaveis
let buttonDisabled = ref<boolean>(false)
let showSpin = ref<boolean>(false)
let showToast = ref<boolean>(false)
let toastMessage = ref<string>('')
let toastType = ref<TypeToast>('danger')
const v = useVuelidate()


const changeToast = (message: string, type: TypeToast)=>{
    if(showToast.value == true){
        showToast.value = false
    }
    toastMessage.value = message
    toastType.value = type

    showToast.value = true
    setTimeout(()=>{
        showToast.value = false
    },5000)
}

const submit = async (event: Event) =>{
    const formElement = event.target as HTMLFormElement
    const formData = new FormData(formElement)

    formData.set('cpf_cnpj', formData.getAll('cpf_cnpj')[0].valueOf().toString().replaceAll('.', '').replaceAll('/', '').replaceAll('-', ''))

    if(await v.value.$validate() == false){
        changeToast('Preencha todos os campos corretamente', 'danger')
        return
    }

    showSpin.value = true
    buttonDisabled.value = true

    const request = await fetchData('POST', 'register', formData)

    showSpin.value = false
    buttonDisabled.value = false

    if(request.code == 406){
        showSpin.value = false
        buttonDisabled.value = false
        changeToast('Email já cadastrado', 'danger')
        return 
    }

    if(request.code != 200){
        showSpin.value = false
        buttonDisabled.value = false
        changeToast('Algo deu errado. Tente novamente', 'danger')
        return 
    }

    router.push('/cadastrar-sucesso')
}
</script>
