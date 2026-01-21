import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuSideBar = defineStore('menuSideBar', () => {

    const hideOrShowMenu = ref(false)

    function toggleMenu() {
        hideOrShowMenu.value = !hideOrShowMenu.value
    }


  return { hideOrShowMenu, toggleMenu }
})
