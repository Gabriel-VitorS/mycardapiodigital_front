<template>
   <label for="name" class="form-label">URL:</label>
    <div class="input-group">
        <input ref="name" v-model="url.url" @keydown="validateUrlString" autocomplete="off" @paste="$event => $event.preventDefault()" required type="text" class="form-control" :class="{'is-invalid': isInvalid}" name="url">
        <div class="invalid-feedback">{{ messageFeedback }}</div>
        <span v-if="showSpin" class="input-group-text">
            <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
        </span>
        
    </div>
    
    <div>
        <p>Exemplo: www.cardapiodigital.com.br/cardapio/<strong>{{ url.url == '' ? 'sua-url' : url.url }} </strong></p>
    </div>
</template>

<script lang="ts" setup>
import {ref, defineProps, onBeforeMount, computed} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import { helpers, required, minLength  } from "@vuelidate/validators";
import fetchDataAuth from '@/fetch/fetchDataAuth';

const rules = computed(()=>({
    url:{
        required,
        minLength: minLength(2),
        asyncValidator: helpers.withAsync(verifyUrl)
    }
}))

const verifyUrl = async () =>{
    if(url.value.url.length < 2){
        messageFeedback.value = 'Minimo de 2 caracteres'
        isInvalid.value = true
        return false
    }
    showSpin.value = true
    const request = await fetchDataAuth('POST', 'configuration/verify_url', {url: url.value.url})
    showSpin.value = false

    if(request.code != 200){
        messageFeedback.value = 'Error. Tente novamente'
        isInvalid.value = true
        showSpin.value = false    
        return false
    }
    
    if(request.data.isValid == true){
        
        isInvalid.value = false
        return true

    }else{
        messageFeedback.value = 'URL já está em uso'
        isInvalid.value = true
        return false
    }
}

const url = ref({
    url: ''
})
const isInvalid = ref<boolean>(false)
const messageFeedback = ref<string>('')
const showSpin = ref<boolean>(false)

const props = defineProps<{
    url: string,
}>()

useVuelidate(rules, url)

const validateUrlString = (event: Event)=>{
    const keyboardEvent = event as KeyboardEvent
    if(/^[A-Za-z0-9-]+$/.test(keyboardEvent.key) == false){
        event.preventDefault()
        return
    }
}

onBeforeMount(()=>{
    setTimeout(()=>{
        url.value.url = props.url

    }, 650)

})

</script>