<template>
    <form @submit.prevent="submit" class="col-md-4">

        <div class="mb-3">
            <label for="email"  class="form-label">Email:</label>
            <input type="email"  v-model="login.email" class="form-control" id="email" name="email" placeholder="email@example.com">
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">Senha:</label>
            <input type="password" v-model="login.password" class="form-control" name="password" placeholder="*****" id="password">
        </div>

        <div class="d-flex justify-content-around flex-wrap">
            <button  type="button" @click="router.push('/cadastro')" class="btn btn-light">Cadastrar</button>

            <button type="submit" :disabled="buttonDisabled" class="btn btn-primary">
                Entrar 
                <span v-if="showSpin" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
        </div>

    </form>    

    <ToastComponent v-if="showToast"
    :message="toastMessage"
    :typeClass="toastType"/>    

</template>

<script lang="ts" setup>
import fetchData from '@/fetch/fetchData'
import TypeToast from '@/components/toast/typeToast'
import ToastComponent from '@/components/toast/ToastComponent.vue'
import router from '@/router'
import {ref, onBeforeMount} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import { required} from "@vuelidate/validators";
import moment from 'moment'
const login = ref({
    email: '',
    password: ''
})

const rules = {
    email:{ required},
    password: {required}
}

const v$ = useVuelidate(rules, login)

let showToast = ref<boolean>(false)
let toastMessage = ref<string>('')
let toastType = ref<TypeToast>('danger')
let showSpin = ref<boolean>(false)
let buttonDisabled = ref<boolean>(false)

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

const submit = async(event: Event) => {

    if(await v$.value.$validate() == false){
        changeToast('Preencha todos os campos corretamente', 'danger')
        return
    }

    const formElement = event.target as HTMLFormElement
    const formData = new FormData(formElement)

    showSpin.value = true
    buttonDisabled.value = true

    const request = await fetchData('POST','login',formData)

    showSpin.value = false
    buttonDisabled.value = false

    if(request.code == 422){
        showSpin.value = false
        buttonDisabled.value = false
        changeToast('Usuario inválido', 'danger')
        return 
    }

    if(request.code != 200){
        showSpin.value = false
        buttonDisabled.value = false
        changeToast('Algo deu errado. Tente novamente', 'danger')
        return 
    }
    
    sessionStorage.setItem('JWT', JSON.stringify({
        token: request.data.token,
        exp: moment().add(1, 'h').unix()
    }))
    router.push('/gestor')

}

onBeforeMount(()=>{
    const dateNow = moment().unix()

    if(sessionStorage.getItem('JWT') != null){
        const jwt = JSON.parse(sessionStorage.getItem('JWT')!)

        if(moment().isBetween( moment(dateNow * 1000), moment(jwt.exp * 1000) )){
            router.push('/gestor')
        }
    } 
})


</script>