<template>
    <label class="form-check-label">
        {{ label }}
    </label>
    <input class="form-check-input" v-model="checkboxValue" :name="name" :id="name" type="checkbox"  />
</template>

<script lang="ts" setup>
import {defineProps, ref, onBeforeMount, watch} from 'vue'

const checkboxValue = ref<boolean>()

const props = defineProps<{
    label: string,
    name: string
    value: 1 | 0
}>()

onBeforeMount(()=>{    
    
    setTimeout(() => {
        if(props.value == 1)
            checkboxValue.value = true
        else
            checkboxValue.value = false
        
    }, 500);

})

</script>