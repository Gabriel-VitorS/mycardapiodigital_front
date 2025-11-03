<script setup lang="ts">
import SpinnerSm from '@/components/ui/SpinnerSm.vue';
defineProps<{
    isSending: boolean
    type: 'btn-primary' | 'btn-danger' | 'btn-close' | 'btn-secondary' | 'btn-success'
}>()

</script>
<template>
    <button class="btn" :class="type" :disabled="isSending">Salvar <SpinnerSm v-if="isSending" class="ms-1"></SpinnerSm> </button>
</template>