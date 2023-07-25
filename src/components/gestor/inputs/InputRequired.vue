<template>
    <label>{{ label }}</label>
    <input type="text" class="form-control" v-model="inputValue.input" :id="id" :name="id" :placeholder="placeholder">
</template>

<script lang="ts" setup>
import {ref, defineProps} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {required} from "@vuelidate/validators";

const inputValue = ref({input: ''})

useVuelidate({
    input:{
        required
    }
}, inputValue)

defineProps({
    label: String,
    id: String,
    placeholder: String
})

</script>