<script setup lang="ts">
import SpinnerSm from '@/components/ui/SpinnerSm.vue';
// defineProps<{
//     isSending: boolean
//     type: 'btn-primary' | 'btn-danger' | 'btn-close' | 'btn-secondary' | 'btn-success'
// }>()

defineProps({
    isSending: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    textBtn: {
        type: String,
        default: 'Salvar',
        required: false
    }
})

</script>
<template>
    <button class="btn" :class="type" :disabled="isSending">{{ textBtn }} <SpinnerSm v-if="isSending" class="ms-1"></SpinnerSm> </button>
</template>