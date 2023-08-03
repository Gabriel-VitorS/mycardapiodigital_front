<template>
    <label>{{ label }}</label>
    <input type="text" class="form-control" v-model="inputValue.input" :id="id" :name="id" :placeholder="placeholder">
</template>

<script lang="ts" setup>
import {ref, defineProps, onBeforeMount} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {required} from "@vuelidate/validators";

const inputValue = ref({input: ''})

useVuelidate({
    input:{
        required
    }
}, inputValue)

const props = defineProps({
    label: String,
    id: String,
    placeholder: String,
    value: {required: false, type: String}
})

onBeforeMount(()=>{
    setTimeout(()=>{
        if(props.value != undefined)
            inputValue.value.input = props.value
    }, 650)
})

</script>