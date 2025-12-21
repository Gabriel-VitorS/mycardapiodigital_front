<template>
    <div class="row" :id="`${categoryId}`">
        <div class="col-12 my-3 p-2" >
            <span class="fs-5 fw-medium" :style="{color: color}">{{ categoryName }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    categoryName: string;
    categoryId: number;
    color: string;
}>();

</script>