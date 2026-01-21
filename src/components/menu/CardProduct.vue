<script setup lang="ts">
import { useCurrency } from '@/composables/useCurrency';
const {formatBRL} = useCurrency()


defineProps<{
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productImageUrl: string;
    color: string;
}>();

</script>

<template>
    <div class="product-card row p-2 col m-2" role="button">
        <div class="col-8 p-0">

            <div style="max-height: 24px;" class="text-truncate">
                <span class="fw-medium" style="color: #444444;">{{ productName }}</span>
            </div>

            <div style="max-height: 24px;" class="text-truncate">
                <span style="font-size: 0.8rem;" :style="{color: color}" class="fw-medium">
                    {{ formatBRL(productPrice) }}
                </span>
            </div>

            <div  style="max-height: 50px;">
                <p style="font-size: 0.6rem;" class="truncate fw-light">{{ productDescription }}</p>
            </div>

        </div>
        <div class="col-4 justify-content-center d-flex ">
            <img :src="productImageUrl" alt="" width="100" height="100" style="border-radius: 8px;">
        </div>

    </div>
</template>

<style scoped>
    .truncate{
        color: #444444;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* número de linhas */
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .product-card{
        max-width: 330px;
        min-width: 300px;
        width: 100%;
        height: 120px;
        border-radius: 8px;
        background-color: white;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    }

    /* Rectangle 31 */





</style>
