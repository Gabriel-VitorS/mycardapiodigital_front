<script lang="ts" setup>
import { useField } from 'vee-validate'
import { reactive } from 'vue'
import { vMaska } from "maska/vue"
import type { MaskInputOptions } from "maska"



const { value, errorMessage, } = useField("cpf_cnpj")

const cpfCnpjMask = reactive<MaskInputOptions>({
    mask: ["###.###.###-##", "##.###.###/####-##"]
})
</script>
<template>
    <label class="form-label">
        CPF ou CNPJ <span class="text-danger">*</span>
    </label>

    <input 
    type="text" 
    id="cpf_cnpj"
    v-model="value" 
    name="cpf_cnpj" 
    class="form-control" 
    placeholder="123.456.789-00 ou 12.345.678/0001-00"
    v-maska="cpfCnpjMask"
    :class="{'is-invalid': errorMessage}"/>

    <div v-if="errorMessage"  class="invalid-feedback">{{ errorMessage }}</div>
</template>