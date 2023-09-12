<template>
    <div>
        <label for='value'>Valor:</label>
        <div class="input-group mb-3">
            <span class="input-group-text">R$</span>
                <input v-maska v-model="inputValor" data-maska="0,99" type='text' data-maska-tokens="0:\d:multiple|9:\d:optional" class="form-control" name='value' />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vMaska } from 'maska';
import {defineProps, ref, onMounted, watch} from 'vue'
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const inputValor = ref('0')

useVuelidate({
    inputValor:{
        required
    }
}, {inputValor})

const props = defineProps<{
    value: number
}>()

onMounted(()=>{
    if(props.value != undefined){
        setTimeout(()=>{
            inputValor.value = `${props.value}`.replaceAll('.', ',')
        }, 500)
        
    }

})

    
</script>