<template>
    <section class="container">
        <section class="row">
            <span className="fs-3">{{ $route.params.id == '0' ? 'Incluir Categoria': `Editar Categoria - ID ${$route.params.id}`}}</span>
        </section>

        <section class="row">
            <form ref="form" class="row mt-3">

                <div class="col-lg-6 mt-2">
                    <InputRequired
                    id="name"
                    label="Nome:"
                    placeholder="Digite o nome da categoria"
                    :value="categoria.name" />
                </div>

                <div class="col-lg-6 mb-3">
                    <OrdemInput
                    :idCategoria="categoria.id" 
                    :value="categoria.order"
                    />
                </div>
            </form>
        </section>
    </section>

    <footer class="d-flex justify-content-around">
        <button @click="$router.go(-1)" class="btn btn-secondary">Voltar</button>

        <button v-if="route.params.id != '0'" @click="showModalConfirm = true" class="btn btn-danger">Deletar</button>
        <button v-if="$route.params.id != '0'" @click="submit" class="btn btn-success">Salvar</button>
        <button v-if="$route.params.id == '0'" @click="submit" class="btn btn-success">Incluir</button>
    </footer>


    <ModalConfirm v-if="showModalConfirm" message="Deseja apagar a categoria?" 
    @closeModal="showModalConfirm = false" 
    @confirmButton="destroy"/>

    <ModalLoader v-if="showLoader" />
    <ModalAlert v-if="alert.show" :message="alert.message" @closeButton="$router.push('/gestor/categorias')" />

    <ToastComponent v-if="toast.show"
    :message="toast.message"
    :typeClass="toast.type"/>
</template>

<script lang="ts" setup>

// Componentes
import ModalConfirm from '@/components/gestor/ModalConfirm/ModalConfirm.vue';
import ModalLoader from '@/components/gestor/ModalLoader/ModalLoader.vue';
import ModalAlert from '@/components/gestor/ModalAlert/ModalAlert.vue';
import InputRequired from '@/components/gestor/inputs/InputRequired.vue';
import OrdemInput from '@/components/gestor/inputs/OrdemInput.vue'
import ToastComponent from '@/components/toast/ToastComponent.vue';

// Interfaces e Tipos
import TypeToast from '@/components/toast/typeToast';
import InterfaceToast from '@/components/toast/interfaceToast'
import Categoria from '@/interfaces/Categoria';

// Funcoes importadas
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import fetchDataAuth from '@/fetch/fetchDataAuth';
import useVuelidate from '@vuelidate/core';

// Variaveis
const showLoader = ref<boolean>(false)
const showModalConfirm = ref<boolean>(false)
const alert = ref({
    show: false,
    message: ''
})
const toast = ref<InterfaceToast>({
    show: false,
    message: '',
    type: 'danger'
})
const categoria = ref<Categoria>({
    company_id: 0,
    id: 0,
    order: 0,
    name: '',
    created_at: '',
    updated_at: ''
})
const form = ref<Element | null>(null)
const route = useRoute()
const v$ = useVuelidate()

//Funcoes
const changeToast = (message: string, type: TypeToast)=>{
    if(toast.value.show == true){
        toast.value.show = false
    }
    toast.value.message = message
    toast.value.type = type

    toast.value.show = true
    setTimeout(()=>{
        toast.value.show = false
    },5000)
}

onMounted( async()=>{
    if(route.params.id == '0')
        return

    showLoader.value = true
    const request = await fetchDataAuth('GET', `category/${route.params.id}`)

    if(request.code != 200){
        showLoader.value = false
        changeToast('Falha ao buscar dados. Tente novamente', 'danger')
        return
    }
    categoria.value = request.data
    setTimeout(()=>{ showLoader.value = false },800)

})

const submit = async () =>{

    if(await v$.value.$validate() == false){
        changeToast('Preencha todos os campos corretamente', 'danger')
        return
    }

    if(form.value == null)
        return
        
    const formData = new FormData((form.value as HTMLFormElement))
    const method: 'PUT' | 'POST' = route.params.id == '0' ? 'POST' : 'PUT'
    const url =  route.params.id == '0' ? 'category' : `category/${route.params.id}`

    console.log( await v$.value.$validate())

    showLoader.value = true
    const request = await fetchDataAuth(method, url, formData)
    showLoader.value = false

    if(request.code == 406){
        changeToast('Campo Ordem já está cadastrado', 'danger')
        return
    }

    if(request.code != 200){
        changeToast('Falha ao salvar categoria. Tente novamente', 'danger')
        return
    }

    if(method == 'POST')
        alert.value.message = 'Categoria salva com sucesso'
    else
        alert.value.message = 'Categoria atualizada com sucesso'
    
    alert.value.show = true

}

const destroy = async () =>{
    showLoader.value = true
    const request = await fetchDataAuth('DELETE', `category/${route.params.id}`)
    showLoader.value = false

    if(request.code != 200){
        changeToast('Falha ao deletar categoria', 'danger')
        return
    }

    alert.value.message = "Categoria deleteda com sucesso"
    alert.value.show = true
}

// export default {
//     name: 'CategoriaEditView',
//     components: {ModalConfirm, ModalLoader, ModalAlert, OrdemInput},
//     data(){
//         return{
//             name: '',
//             order: '',
//             categoryData: null,
//             showSpinnerOrder: false,
//             buttonDisabled: true,
//             showModalConfirm: false,
//             showLoader: false,
//             showAlert: false,
//             messageAlert: ''
//         }
//     },
//     watch:{
//         order(value){
//             if(this.categoryData){
//                 if(value != this.categoryData.order && value != '')
//                     this.verifyOrder(value)
//                 else 
//                     this.$refs.order.classList.remove('is-invalid')
//             }else if(value != ''){
//                 this.verifyOrder(value)
//             }

//             this.changeButtonSubmit()
//         },
//         name(){
//             this.changeButtonSubmit()
//         }
//     },
//     mounted(){
//         if(this.$route.params.id != 0)
//             this.getCategory(this.$route.params.id)
//     },
//     methods:{
//         async deleteCategory(){
//             this.showModalConfirm = false
//             this.showLoader = true
            
//             await axios.delete(`${process.env.VUE_APP_URL_API}/category/${this.$route.params.id}`,{
//                 headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
//             }).then(()=>{
//                 this.messageAlert = 'Categoria deletada com sucesso!'
//                 this.showAlert = true
//             }).catch((error)=>{
//                 console.log(error)
//                 new Toast(this.$refs.toaster).show()
//             })

//             this.showLoader = false
//         },
//         async verifyOrder(order){
//             this.showSpinnerOrder = true

//             await axios.post(`${process.env.VUE_APP_URL_API}/category/verify_order`,{order: order},{
//                 headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
//             })
//             .catch((error)=>{
//                 console.log(error)
//                 new Toast(this.$refs.toaster).show()
//             })
//             .then((data)=>{
//                 if(data.data.isValid == true){
//                     this.$refs.order.classList.remove('is-invalid')
//                 }else{
//                     this.$refs.order.classList.add('is-invalid')
//                 }
//             })
//             this.showSpinnerOrder = false

//             this.changeButtonSubmit()
//         },
//         async getCategory(id){
//             this.showLoader = true
//             await axios.get(`${process.env.VUE_APP_URL_API}//${id}`,{
//                 headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
//             })
//             .catch((error)=>{
//                 console.log(error)
//                 new Toast(this.$refs.toaster).show()
//             })
//             .then((data)=>{
//                 this.categoryData = data.data.data
//                 this.name = this.categoryData.name
//                 this.order = this.categoryData.order
                
//             })
//             this.showLoader = false
//         },

//         async requestCategory(){
//             this.showLoader = true
//             await axios({
//                 method: this.$route.params.id == 0 ? 'POST' : 'PUT',
//                 url: this.$route.params.id == 0 ? `${process.env.VUE_APP_URL_API}/category` : `${process.env.VUE_APP_URL_API}/category/${this.$route.params.id}`,
//                 headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`},
//                 data: {
//                     name: this.name,
//                     order: this.order
//                 }
//             }).catch((error)=>{
//                 console.log(error)
//                 new Toast(this.$refs.toaster).show()
//             }).then(()=>{
//                 this.messageAlert = this.$route.params.id == 0 ? 'Categoria incluída com sucesso!' : 'Categoria atualizada com sucesso!'
//                 this.showAlert = true
//             })
//             this.showLoader = false
//         },

//         changeButtonSubmit(){
//             this.buttonDisabled = true
            
//             if(this.name == '')
//                 return

//             if(this.order == '' || this.$refs.order.classList.contains('is-invalid'))
//                 return

//             this.buttonDisabled = false
//         },
//     }
// }
</script>