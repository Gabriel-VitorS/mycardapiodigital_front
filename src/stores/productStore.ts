import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProducts } from '@/api/manager/product';
import type {ProductParams, Products} from '@/types/manager/product.type'

export const useProductStore = defineStore('product', () => {
  const products = ref<Products>()

    async function loadProducts(params: ProductParams) {
      await getProducts(params)
        .then((response)=>{
            products.value = response.data
        })
        .catch((error) =>{
            console.log(error)
        })
    }

  return { products, loadProducts }
})
