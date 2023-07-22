<template>
    <section class="container">
        <section class="row">
            <span class="fs-3">{{ $route.params.id == 0 ? 'Incluir Produto': `Editar Produto - ID ${$route.params.id}`}}</span>
        </section>

        <section class="row">
            <form ref="form" class="row mt-3">

                <div class="col-lg-6 mb-3">
                    <label for="name" class="form-label">Nome:</label>
                    <input ref="name" v-model="name" required type="text" class="form-control" name="name" placeholder="Digite o nome da categoria">
                </div>

                <div class="col-lg-6 mt-lg-3">
                    <div class="form-check">
                        <label class="form-check-label">
                            Destaque?
                        </label>
                        <input v-model="highlight" class="form-check-input" name="highlight" type="checkbox"/>

                    </div>

                    <div class="form-check">
                        <label class="form-check-label">
                            Visível online?
                        </label>
                        <input v-model="visible_online" class="form-check-input" name="visible_online" type="checkbox"  />

                    </div>
                </div>

                <div class="col-lg-6 mt-3">
                    <div class="mb-2">
                        <label for='value'>Valor:</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text">R$</span>
                                <input v-model="value" type='text' @input="onlyNumber" class="form-control" name='value'  required/>
                        </div>

                    </div>
                </div>

                <div class="col-lg-6 mt-3">
                    <label>
                        Selecione uma categoria
                    </label>
                    <select v-model="category_id" name="category_id" class="form-select">
                        <option value=""></option>
                        <option v-for="category in categoryData.data" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <div class="col-md-12 row mt-3">
                    <CropImageProduct :url_image="url_image" />
                </div>

                <div class="col-md-6 mt-3">
                    <label for='detail'>Digite os detalhes do produto:</label>
                    <div>
                        <textarea v-model="details" name="details" class="form-control" cols="60" rows="10"></textarea>
                    </div>
                </div>
            </form>
        </section>
    </section>

    <footer class="d-flex justify-content-around mt-5">
        <button @click="$router.go(-1)" class="btn btn-secondary">Voltar</button>

        <button v-if="$route.params.id != 0" @click="showModalConfirm = true" class="btn btn-danger">Deletar</button>
        <button v-if="$route.params.id != 0" @click="requestCategory" :disabled="buttonDisabled" class="btn btn-success">Salvar</button>
        <button v-if="$route.params.id == 0" @click="requestCategory" :disabled="buttonDisabled" class="btn btn-success">Incluir</button>
    </footer>

    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div ref="toaster" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                Error ao enviar ou carregar os dados. Contate o suporte ou tente novamente.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>

    <ModalLoader v-if="showLoader" />
    <ModalConfirm v-if="showModalConfirm" message="Deseja apagar o produto?" 
    @closeModal="showModalConfirm = false" 
    @confirmButton="deleteProduct"/>
    <ModalAlert v-if="showAlert" :message="messageAlert" @closeButton="this.$router.push('/gestor/produtos')" />
</template>

<script>
import ModalLoader from '@/components/gestor/ModalLoader/ModalLoader.vue';
import ModalConfirm from '@/components/gestor/ModalConfirm/ModalConfirm.vue';
import ModalAlert from '@/components/gestor/ModalAlert/ModalAlert.vue';
import CropImageProduct from '@/components/gestor/CropImage/CropImageProduct.vue';
import { Toast } from 'bootstrap'
import axios from 'axios'
export default{
    name: 'ProdutosEditView',
    components:{ModalLoader, ModalConfirm, CropImageProduct, ModalAlert},
    data(){
        return{
            ProductoData: null,
            categoryData: '',
            name: '',
            value: '',
            category_id: '',
            highlight: false,
            visible_online: true,
            details: '',
            showLoader: false,
            url_image: null,
            messageAlert: '',
            showAlert: false,
            showModalConfirm: false,
            buttonDisabled: true
        }
    },
    watch:{
        name(){ this.changeButtonSubmit() },
        category_id(){ this.changeButtonSubmit() }
    },
    async mounted(){
        await this.getCategories()
        if(this.$route.params.id != 0)
            await this.getData(this.$route.params.id)
    },
    methods:{
        onlyNumber(event){
            event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        },

        async deleteProduct(){
            this.showModalConfirm = false
            this.showLoader = true
            
            await axios.delete(`${process.env.VUE_APP_URL_API}/product/${this.$route.params.id}`,{
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
            }).then(()=>{
                this.messageAlert = 'Produto deletado com sucesso!'
                this.showAlert = true
            }).catch((error)=>{
                console.log(error)
                new Toast(this.$refs.toaster).show()
            })

            this.showLoader = false
        },

        async getData(id){
            this.showLoader = true
            await axios.get(`${process.env.VUE_APP_URL_API}/product/${id}`,{
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
            })
            .catch((error)=>{
                console.log(error)
                new Toast(this.$refs.toaster).show()
            })
            .then((data)=>{
                this.ProductoData = data.data.data
                this.name = this.ProductoData.name   
                this.value = this.ProductoData.value
                this.visible_online = this.ProductoData.visible_online
                this.highlight = this.ProductoData.highlight       
                this.category_id = this.ProductoData.category_id == null ? '' : this.ProductoData.category_id
                this.details = this.ProductoData.details == null ? '' : this.ProductoData.details
                this.url_image = this.ProductoData.url_image
            })
            this.showLoader = false
        },
        
        async requestCategory(){
            const form = new FormData(this.$refs.form)
            
            if(this.value == '')
                form.set('value', '0')

            if(form.get('image').name == '')
                form.delete('image')
                
            form.set('highlight', `${this.highlight}`)
            form.set('visible_online', `${this.visible_online}`)
            console.log(this.visible_online)
            this.showLoader = true
            await axios({
                method: this.$route.params.id == 0 ? 'POST' : 'PUT',
                url: this.$route.params.id == 0 ? `${process.env.VUE_APP_URL_API}/product` : `${process.env.VUE_APP_URL_API}/product/${this.$route.params.id}`,
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`},
                data: form
            }).catch((error)=>{
                console.log(error)
                new Toast(this.$refs.toaster).show()
                this.showLoader = false        
            }).then((data)=>{
                
                if(data.request.status == 200){
                    this.messageAlert = this.$route.params.id == 0 ? 'Produto incluído com sucesso!' : 'Produto atualizado com sucesso!'
                    this.showAlert = true
                }
                this.showLoader = false        
            })
            this.showLoader = false
        },

        async getCategories(){
            await axios.get(`${process.env.VUE_APP_URL_API}/category`,{
                params: {
                    limit: 300
                },
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
            }).then((data)=>{
                this.categoryData = data.data.data
            })
        },

        changeButtonSubmit(){
            this.buttonDisabled = true
            if(this.name == '' || this.category_id == '')
                return
            
            this.buttonDisabled = false
        }
    }
}
</script>