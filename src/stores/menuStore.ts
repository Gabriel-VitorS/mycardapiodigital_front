import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMenu } from '@/api/Menu/menu';
import type { MenuResponse } from '@/types/menu/menu.type';

export const useMenuStore = defineStore('menu', () => {
  const menuData = ref<MenuResponse|null>(null);

    async function loadMenu(menu: string) {
      await getMenu(menu)
        .then((response)=>{
            menuData.value = response.data;
        })
        .catch((error) =>{
            console.log(error)
        })
    }

  return { menuData, loadMenu }
})
