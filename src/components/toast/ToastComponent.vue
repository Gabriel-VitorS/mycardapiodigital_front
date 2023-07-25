<template>
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div ref="toastElement" :class="typeToastClass" class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    {{ message }}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps, computed } from "vue";
import {Toast} from 'bootstrap'
import TypeToast from "./typeToast";
const toastElement = ref<Element| null>(null)

const props = defineProps<{
    message: string,
    typeClass: TypeToast
}>()

const typeToastClass = computed(()=>{
    return `text-bg-${props.typeClass}` 
})

onMounted(()=>{
    if(toastElement.value){
        const toast = new Toast(toastElement.value)
        toast.show()
    }
})

</script>