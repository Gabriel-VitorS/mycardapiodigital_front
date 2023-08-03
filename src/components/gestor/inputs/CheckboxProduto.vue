<template>
    <label class="form-check-label">
        {{ label }}
    </label>
    <input class="form-check-input" v-model="checkboxValue" :name="name" :id="name" type="checkbox"  />
</template>

<script lang="ts" setup>
import {defineProps, ref, onMounted} from 'vue'

const checkboxValue = ref<boolean>()

const props = defineProps<{
    label: string,
    name: string
    value: number
}>()

onMounted(()=>{    
    setTimeout(() => {
        if(props.value == 1)
            checkboxValue.value = true
        else
            checkboxValue.value = false
        
    }, 250);

})

</script>