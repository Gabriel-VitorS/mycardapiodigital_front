<template>
    <section class="container">
        <section class="row">
            <span class="fs-3">{{ $route.params.id == '0' ? 'Incluir Produto': `Editar Produto - ID ${$route.params.id}`}}</span>
        </section>

        <section class="row">
            <form ref="form" class="row mt-3">

                <div class="col-lg-6 mb-3">
                    <InputRequired 
                    label="Nome:"
                    id="name"
                    placeholder="Digite o nome da categoria"
                    :value="produto.name"/>
                    
                </div>

                <div class="col-lg-6 mt-lg-3">
                    <div class="form-check">
                        <CheckboxProduto 
                        label="Destaque ?"
                        name="highlight"
                        :value="produto.highlight"
                        />
                    </div>
                    
                    <div class="form-check">
                        <CheckboxProduto
                        label="Visível online ?"
                        name="visible_online"
                        :value="produto.visible_online" />

                    </div>
                </div>

                <div class="col-lg-6 mt-3">
                    <ValorProduto
                    :value="produto.value" />

                </div>

                <div class="col-lg-6 mt-3">
                    <SelectCategoriaProduto
                    :categoria="produto.category_id" />
                    
                </div>
                <div class="col-md-12 row mt-3">
                    <CropImageProduct :url_image="produto.url_image" />
                </div>

                <div class="col-md-6 mt-3">
                    <label for='detail'>Digite os detalhes do produto: <span class="text-black-50">(opcional)</span></label>
                    <div>
                        <textarea name="details" class="form-control" cols="60" rows="10"></textarea>
                    </div>
                </div>
            </form>
        </section>
    </section>

    <footer class="d-flex justify-content-around mt-5">
        <button @click="$router.go(-1)" class="btn btn-secondary">Voltar</button>

        <button v-if="$route.params.id != '0'" @click="showModalConfirm = true" class="btn btn-danger">Deletar</button>
        <button v-if="$route.params.id != '0'" @click="submit" class="btn btn-success">Salvar</button>
        <button v-if="$route.params.id == '0'" @click="submit" class="btn btn-success">Incluir</button>
    </footer>

    <ModalLoader v-if="showLoader" />
    <ModalConfirm v-if="showModalConfirm" message="Deseja apagar o produto?" 
    @closeModal="showModalConfirm = false" 
    @confirmButton="destroy"/>
    <ModalAlert v-if="alert.show" :message="alert.message" @closeButton="$router.push('/gestor/produtos')" />

    <ToastComponent v-if="toast.show"
    :message="toast.message"
    :typeClass="toast.type"/>
</template>

<script lang="ts" setup>
// Componentes
import ModalLoader from '@/components/gestor/ModalLoader/ModalLoader.vue';
import ModalConfirm from '@/components/gestor/ModalConfirm/ModalConfirm.vue';
import ModalAlert from '@/components/gestor/ModalAlert/ModalAlert.vue';
import ToastComponent from '@/components/toast/ToastComponent.vue';
import CropImageProduct from '@/components/gestor/CropImage/CropImageProduct.vue';
import InputRequired from '@/components/gestor/inputs/InputRequired.vue';
import CheckboxProduto from '@/components/gestor/inputs/CheckboxProduto.vue';
import ValorProduto from '@/components/gestor/inputs/ValorProduto.vue';
import SelectCategoriaProduto from '@/components/gestor/inputs/SelectCategoriaProduto.vue';

// Interfaces e tipos
import InterfaceToast from '@/components/toast/interfaceToast'
import TypeToast from '@/components/toast/typeToast';
import Produto from '@/interfaces/Produto';

// Funcoes importadas
import { ref, onMounted } from 'vue';
import fetchDataAuth from '@/fetch/fetchDataAuth';
import { useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';

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

const route = useRoute()
const form = ref<Element | null>(null)
const v$ = useVuelidate()

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

const produto = ref<Produto>({
    id: 0,
    company_id: 0,
    category_id: 0,
    name: '',
    value: 0,
    resume: '',
    details: '',
    image: '',
    url_image: '',
    highlight: 0,
    visible_online: 1,
    created_at: '',
    updated_at: ''
})


onMounted(async ()=>{
    if(route.params.id == '0'){
        return
    }

    showLoader.value = true
    const request = await fetchDataAuth('GET', `product/${route.params.id}`)

    if(request.code != 200){
        showLoader.value = false
        changeToast('Falha ao buscar dados. Tente novamente', 'danger')
        return
    }

    produto.value = request.data
    setTimeout(()=>{ showLoader.value = false },800)

})

const submit = async() =>{
    
    if(await v$.value.$validate() == false){
        changeToast('Preencha todos os campos corretamente', 'danger')
        return
    }

    if(form.value == null)
        return
        
    const formData = new FormData((form.value as HTMLFormElement))
    const method: 'PUT' | 'POST' = route.params.id == '0' ? 'POST' : 'PUT'
    const url =  route.params.id == '0' ? 'product' : `product/${route.params.id}`

    formData.set('highlight', formData.get('highlight') ? 'true' : 'false')
    formData.set('visible_online', formData.get('visible_online') ? 'true' : 'false')
    formData.set('value', String(formData.get('value')).replaceAll(',', '.')) 

    showLoader.value = true
    const request = await fetchDataAuth(method, url, formData)
    showLoader.value = false

    if(request.code != 200){
        changeToast('Falha ao salvar produto. Tente novamente', 'danger')
        return
    }

    if(method == 'POST')
        alert.value.message = 'Categoria salva com sucesso'
    else
        alert.value.message = 'Categoria atualizada com sucesso'
    
    alert.value.show = true
}

const destroy = () =>{
    console.log('submit')
}

</script>