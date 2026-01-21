import { getConfiguration } from "@/api/manager/configuration";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuConfigStore = defineStore("menuConfig", () => {
    const isMenuConfigured = ref(false)
    const linkToMenu = ref("")

    async function loadMenuConfig(){
        await getConfiguration().then((response)=>{
            isMenuConfigured.value = true
            linkToMenu.value = `${window.location.origin}/cardapio/${response.data.url}`

        }).catch((err)=>{
            if (err.response.status === 404){
                isMenuConfigured.value = false
                return
            }
            console.error("Error fetching configuration", err)
        })
    
    }

    return { isMenuConfigured, loadMenuConfig, linkToMenu }
})