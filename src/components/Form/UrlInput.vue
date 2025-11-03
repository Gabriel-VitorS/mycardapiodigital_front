<script lang="ts" setup>
import { useField } from 'vee-validate'


const { value, errorMessage, } = useField('url')

</script>
<template>
    <label class="form-label">
        URL <span  class="text-danger">*</span>
    </label>

    <input type="text" id="url" v-model="value" name="url" class="form-control" placeholder="meu-restaurante" :class="{'is-invalid': errorMessage}"/>

    <div v-if="errorMessage"  class="invalid-feedback">{{ errorMessage }}</div>
</template>