<template>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" v-model="cpfCnpj.radioButton" value="cnpj">
        <label class="form-check-label" for="inlineRadio1">CNPJ</label>
    </div>

    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" v-model="cpfCnpj.radioButton" value="cpf">
        <label class="form-check-label" for="inlineRadio2">CPF</label>
    </div>
    <div class="mt-1">
        <input type="text" 
        v-maska:[optionsMask]
         v-model="cpfCnpj.input" 
        class="form-control" 
        :class="{'is-invalid': isInvalid}"
        name="cpf_cnpj" placeholder="Digite seu CPF ou CNPJ">
        <div class="invalid-feedback">
            CNPJ ou CPF inválido
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import {cpf, cnpj} from 'cpf-cnpj-validator'
import { vMaska } from "maska"
import {useVuelidate} from '@vuelidate/core'
import {required} from "@vuelidate/validators";
let isInvalid = ref<boolean>(false)

const cpfCnpj = ref({
    radioButton: 'cnpj',
    input: ''
})

let optionsMask = ref({
    mask: '##.###.###/####-##',
    eager: false
})

watch(cpfCnpj.value, (value)=>{
    optionsMask.value.mask = value.radioButton == 'cpf' ? '###.###.###-##' : '##.###.###/####-##'
    isInvalid.value = false
})


const validateCpfCnpj = ():boolean =>{
    if(cpfCnpj.value.radioButton == 'cnpj' && cpfCnpj.value.input.length == 18){
        if(cnpj.isValid(cpfCnpj.value.input.replaceAll('.', '').replaceAll('/', '').replaceAll('-', '')) == false){
            console.log('entrou')
            isInvalid.value = true
            return false
        }else{
            isInvalid.value = false
            return true
        }
        
    }if(cpfCnpj.value.radioButton == 'cpf' && cpfCnpj.value.input.length == 14){
        
        if(cpf.isValid(cpfCnpj.value.input.replaceAll('.', '').replaceAll('-', '')) ==  false ){
            isInvalid.value = true
            return false
        }else{
            isInvalid.value = false
            return true
        }
    }else{
        isInvalid.value = false
        return false
    }
}

const rules = {
    input: {
        required,
        validateCpfCnpj
    }
}

useVuelidate(rules, cpfCnpj)
</script>