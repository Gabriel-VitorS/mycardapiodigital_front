<template>
    <div class="mt-3">
        <label for="password" class="form-label">Senha:</label>
        <input type="password" v-model="passwords.password" class="form-control" name="password" id="password">
    </div>

    <div class="mt-3">
        <label for="passwordConfirmation" class="form-label">Confirmação de senha:</label>
        <input v-model="passwords.confirmPassword" type="password" class="form-control" :class="{'is-invalid': isInvalid}" name="password_confirmation" id="passwordConfirmation">
        <div class="invalid-feedback"> Senhas não coincidem </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import {useVuelidate} from '@vuelidate/core'
import { required, sameAs } from '@vuelidate/validators'

let passwords = ref({
    password: '',
    confirmPassword: ''
})

const rules = computed(()=> ({
    password: { required},
    confirmPassword: { 
        required,
        sameAs: sameAs(passwords.value.password),
    } 
}))

useVuelidate(rules, passwords)

let isInvalid = ref<boolean>(false)

watch(passwords.value, async (value)=>{
    if( (value.confirmPassword != '') && value.confirmPassword != value.password)
        isInvalid.value = true
    else
        isInvalid.value = false
})


</script>