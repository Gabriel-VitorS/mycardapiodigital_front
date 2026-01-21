<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import router from '@/router';
import {Modal} from 'bootstrap'
import { getMenuProductById } from '@/api/Menu/menu';
import { useMenuStore } from '@/stores/menuStore';
import type { MenuProduct } from '@/types/menu/menu.type';
const menuStore = useMenuStore();
import { useCurrency } from '@/composables/useCurrency';
const {formatBRL} = useCurrency()

const productId = router.currentRoute.value.params.productId as number | undefined
let modal: Modal
const productData = ref<MenuProduct | null>(null);
const modalProduct = ref<Element | HTMLElement>(document.getElementById('modal')!)

onMounted( async () => {
    modal = new Modal(modalProduct.value)

    modalProduct.value.addEventListener('hidden.bs.modal', () =>{
        router.push({name: 'menu'})
    })

    if(productId == undefined){
        router.push({name: 'menu'})
    }

    modal.show();

    await getMenuProductById(productId!)
    .then((response) => {
        productData.value = response.data;
    })
    .catch((error) => {
        console.error('Error fetching product details:', error);
        router.push({name: 'menu'})
    })
    
});

onUnmounted(()=>{
    
    modal.hide()
})
</script>

<template>
    <Teleport to="body">

        <div ref="modalProduct" class="modal fade" id="modal2" tabindex="-1"> 
            <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    
                    <div class="modal-body">
                        <div class="row" v-if="productData">
                            <div class="col-12">
                                <img :src="productData.url_image">
                            </div>

                            <div class="col-12 mt-3">
                                <h2>{{ productData.name }}</h2>
                            </div>

                            <div class="col-12 mt-3">
                                <span>{{ formatBRL(productData.value)}}</span>
                            </div>

                            <div class="col-12 mt-3">
                                <h5 :style="{color: menuStore.menuData?.configuration.theme_color}">Detalhes</h5>
                            </div>

                            <div class="col-12 mt-3">
                                <span>{{ productData.details }}</span>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button 
                        type="button" 
                        class="btn btn-secondary px-3 " 
                        data-bs-dismiss="modal"
                        :style="{backgroundColor: menuStore.menuData?.configuration.theme_color, borderColor: menuStore.menuData?.configuration.theme_color }"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
    img{
        width: 100%;
        border-radius: 12px;
    }

</style>