import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategories } from '@/api/manager/category';
import type {CategoryParams, Categories} from '@/types/manager/category.type'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Categories>()

    async function loadCategories(params: CategoryParams) {
            await getCategories(params)
            .then((response)=>{
                categories.value = response.data
            })
            .catch((error) =>{
                console.log(error)
            })
    }

    // async function addCategory(data) {
    //     const created = await requestAuthenticated.post('/categorias', data)
    //     categories.value.push(created)
    // }

    // async function updateCategory(id, data) {
    //     const updated = await requestAuthenticated.put(`/categorias/${id}`, data)
    //     const index = categories.value.findIndex(c => c.id === id)
    //     categories.value[index] = updated
    // }

  return { categories, loadCategories }
})
