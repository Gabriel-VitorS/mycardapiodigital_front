<script lang="ts" setup>
import { useField } from 'vee-validate'
import { vMaska } from "maska/vue"

const { value, errorMessage, } = useField("value")

</script>
<template>
    <label class="form-label">
        Valor <span class="text-danger">*</span>
    </label>

    <input 
    type="text" 
    id="value"
    v-model="value" 
    name="value" 
    class="form-control" 
    placeholder="4,55"
    v-maska
    data-maska="0,99"
    data-maska-tokens="0:\d:multiple|9:\d:optional"
    :class="{'is-invalid': errorMessage}"/>

    <div v-if="errorMessage"  class="invalid-feedback">{{ errorMessage }}</div>
</template>