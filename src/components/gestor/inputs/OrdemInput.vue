<template>
<label class="form-label">Ordem:</label>
<div class="input-group">
    <input v-model="order" v-maska data-maska="##########" :class="{'is-invalid': isInvalid}" required type="text" class="form-control" name="order" placeholder="Coloque a ordem da categoria">
    <span v-show="showSpin" class="input-group-text" >
        <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
    </span>

    <div class="invalid-feedback">Ordem já está em uso</div>
    
</div>
</template>

<script lang="ts" setup>
import { vMaska } from "maska"
import {ref, defineProps, computed, onMounted} from 'vue'
import { helpers, minLength, or } from "@vuelidate/validators";
import {useVuelidate} from '@vuelidate/core'
import fetchDataAuth from "@/fetch/fetchDataAuth";

const showSpin = ref<boolean>(false)
const isInvalid = ref<boolean>(false)
const order = ref('')
const idCategoria = ref(0)

const rules = computed(()=>({
    value:{
        minLength: minLength(1),
        asyncValidator: helpers.withAsync(verifyOrder)
    }
}))

const verifyOrder = async ():Promise<boolean> =>{

    showSpin.value = true
    let params = {
        id: idCategoria.value,
        order: order.value,
    }
    const request = await fetchDataAuth('POST', 'category/verify_order', params)
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

useVuelidate(rules, order)

const props = defineProps<{
    value: number,
    idCategoria: number
}>()

onMounted(()=>{
    setTimeout(()=>{
        if(props.idCategoria != 0){
            idCategoria.value = props.idCategoria
            order.value = `${props.value}`
        }
    }, 650)
    
})


</script>