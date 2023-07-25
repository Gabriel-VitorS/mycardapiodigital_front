<template>
    <label for="email" class="form-label mt-3">Email:</label>
    <div class="input-group">
        <input type="email" v-model="emailInput.email" class="form-control" :class="{'is-invalid': isInvalid}" name="email" placeholder="email@examplo.com">
        <span v-show="showSpin" class="input-group-text" id="basic-addon1">
            <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
        </span>

        <div class="invalid-feedback">Email inválido ou já está em uso</div>
        
    </div>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import fetchData from '@/fetch/fetchData'
import { helpers, required, email, minLength  } from "@vuelidate/validators";


const showSpin = ref<boolean>(false)
const isInvalid = ref<boolean>(false)
const emailInput = ref({
    email: ''
})

const rules = computed(()=>({
    email:{
        required,
        minLength: minLength(4),
        email,
        asyncValidator: helpers.withAsync(verifyEmail)
    }
}))


const verifyEmail = async ():Promise<boolean> =>{

    if(emailInput.value.email.length < 4 || emailInput.value.email.includes('@') == false){
        return false
    }
    
    showSpin.value = true
    const request = await fetchData('POST', 'verify_email', {email: emailInput.value})
    showSpin.value = false

    if(request.code != 200){
        showSpin.value = false    
        return false
    }
    
    if(request.data.isValid == true){
        isInvalid.value = false
        return true

    }else{
        isInvalid.value = true
        return false
    }

}


useVuelidate(rules, emailInput)

</script>