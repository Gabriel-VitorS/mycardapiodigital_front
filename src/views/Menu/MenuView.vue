<script setup lang="ts">
import { onMounted} from 'vue';
import router from '@/router';
import MenuCategory from '@/components/menu/MenuCategory.vue';
import CardProduct from '@/components/menu/CardProduct.vue';

import { useMenuStore } from '@/stores/menuStore';

const menu = router.currentRoute.value.params.menu as string;
const menuStore = useMenuStore();

onMounted( async () => {
    await menuStore.loadMenu(menu);

});
</script>

<template>
    <div class="container-fluid" :style="{backgroundColor: menuStore.menuData?.configuration.background_color}">

    
        <div v-if="menuStore.menuData" class="container pt-5"
        :style="{backgroundColor: menuStore.menuData.configuration.background_color}">

            <div class="row ">
                <div class="col-6">
                    <img :src="menuStore.menuData.configuration.url_logo" width="100" height="100"
                    style="border-radius: 8px;">
                </div>

                <div class="col-6">
                    <span class="fs-4 fw-medium" style="color: #444444">
                        {{ menuStore.menuData.configuration.name_company}}

                    </span>
                    
                </div>

            </div>

            <section >

                <MenuCategory v-if="menuStore.menuData.highlight.length > 0"
                :category-id="0"
                category-name="Destaque"
                :color="menuStore.menuData.configuration.theme_color"
                />

                <div class="row flex-md-row flex-column align-items-center justify-content-evenly">

                    <CardProduct v-for="product in menuStore.menuData.highlight" :key="product.id" class="mb-3"
                        @click="$router.push({name: 'product-detail-menu', params: {productId: product.id}})"
                        :product-id="product.id"
                        :product-name="product.name"
                        :product-description="product.details || ''"
                        :product-price="product.value as number"
                        :product-image-url="product.url_image"
                        :color="menuStore.menuData.configuration.theme_color"
                    />
                </div>
            </section>

            <section v-for="category in menuStore.menuData.categories" :key="category.id">

                <MenuCategory
                :category-id="category.id"
                :category-name="category.name"
                :color="menuStore.menuData.configuration.theme_color"
                />
                <div class="row flex-md-row flex-column align-items-center justify-content-evenly">

                    <CardProduct v-for="product in category.products" :key="product.id" class="mb-3"
                        @click="$router.push({name: 'product-detail-menu', params: {productId: product.id}})"
                        :product-id="product.id"
                        :product-name="product.name"
                        :product-description="product.details || ''"
                        :product-price="product.value as number"
                        :product-image-url="product.url_image"
                        :color="menuStore.menuData.configuration.theme_color"
                    />
                </div>
            </section>
        </div>

    </div>
    <RouterView />
</template>