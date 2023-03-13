<template>
    <section class="container">
        <section class="row">
            <span className="fs-3">{{ $route.params.id == 0 ? 'Incluir Categoria': `Editar Categoria - ID ${$route.params.id}`}}</span>
        </section>

        <section class="row">
            <form ref="form" class="row mt-3">

                <div class="col-lg-6 mb-3">
                    <label for="email" class="form-label">Nome:</label>
                    <input ref="name" v-model="name" required type="text" class="form-control" name="email" placeholder="Digite o nome da categoria">
                </div>

                <div class="col-lg-6 mb-3">
                    <label for="email" class="form-label">Ordem:</label>
                    <div class="input-group c">
                        <input ref="order" v-model="order" required type="text" class="form-control" name="order" placeholder="Coloque a ordem da categoria">
                        <span v-show="showSpinnerOrder" class="input-group-text" id="basic-addon1">
                            <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
                        </span>

                        <div class="invalid-feedback">Ordem já está em uso</div>
                        
                    </div>
                </div>
            </form>
        </section>
    </section>

    <footer class="d-flex justify-content-around">
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

    <ModalConfirm v-if="showModalConfirm" message="Deseja apagar a categoria?" 
    @closeModal="showModalConfirm = false" 
    @confirmButton="deleteCategory"/>
    <ModalLoader v-if="showLoader" />
    <ModalAlert v-if="showAlert" :message="messageAlert" @closeButton="this.$router.push('/gestor/categorias')" />
</template>

<script>
import axios from 'axios';
import ModalConfirm from '@/components/gestor/ModalConfirm/ModalConfirm.vue';
import ModalLoader from '@/components/gestor/ModalLoader/ModalLoader.vue';
import ModalAlert from '@/components/gestor/ModalAlert/ModalAlert.vue';
import { Toast } from 'bootstrap';
export default {
    name: 'CategoriaEditView',
    components: {ModalConfirm, ModalLoader, ModalAlert},
    data(){
        return{
            name: '',
            order: '',
            categoryData: null,
            showSpinnerOrder: false,
            buttonDisabled: true,
            showModalConfirm: false,
            showLoader: false,
            showAlert: false,
            messageAlert: ''
        }
    },
    watch:{
        order(value){
            if(this.categoryData){
                if(value != this.categoryData.order && value != '')
                    this.verifyOrder(value)
                else 
                    this.$refs.order.classList.remove('is-invalid')
            }else if(value != ''){
                this.verifyOrder(value)
            }

            this.changeButtonSubmit()
        },
        name(){
            this.changeButtonSubmit()
        }
    },
    mounted(){
        if(this.$route.params.id != 0)
            this.getCategory(this.$route.params.id)
    },
    methods:{
        async deleteCategory(){
            this.showModalConfirm = false
            this.showLoader = true
            
            await axios.delete(`${process.env.VUE_APP_URL_API}/category/${this.$route.params.id}`,{
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
            }).then(()=>{
                this.messageAlert = 'Categoria deletada com sucesso!'
                this.showAlert = true
            }).catch((error)=>{
                console.log(error)
                new Toast(this.$refs.toaster).show()
            })

            this.showLoader = false
        },
        async verifyOrder(order){
            this.showSpinnerOrder = true

            await axios.post(`${process.env.VUE_APP_URL_API}/category/verify_order`,{order: order},{
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
            })
            .catch((error)=>{
                console.log(error)
                new Toast(this.$refs.toaster).show()
            })
            .then((data)=>{
                if(data.data.isValid == true){
                    this.$refs.order.classList.remove('is-invalid')
                }else{
                    this.$refs.order.classList.add('is-invalid')
                }
            })
            this.showSpinnerOrder = false

            this.changeButtonSubmit()
        },
        async getCategory(id){
            this.showLoader = true
            await axios.get(`${process.env.VUE_APP_URL_API}/category/${id}`,{
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
            })
            .catch((error)=>{
                console.log(error)
                new Toast(this.$refs.toaster).show()
            })
            .then((data)=>{
                this.categoryData = data.data.data
                this.name = this.categoryData.name
                this.order = this.categoryData.order
                
            })
            this.showLoader = false
        },

        async requestCategory(){
            this.showLoader = true
            await axios({
                method: this.$route.params.id == 0 ? 'POST' : 'PUT',
                url: this.$route.params.id == 0 ? `${process.env.VUE_APP_URL_API}/category` : `${process.env.VUE_APP_URL_API}/category/${this.$route.params.id}`,
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`},
                data: {
                    name: this.name,
                    order: this.order
                }
            }).catch((error)=>{
                console.log(error)
                new Toast(this.$refs.toaster).show()
            }).then(()=>{
                this.messageAlert = this.$route.params.id == 0 ? 'Categoria incluída com sucesso!' : 'Categoria atualizada com sucesso!'
                this.showAlert = true
            })
            this.showLoader = false
        },

        changeButtonSubmit(){
            this.buttonDisabled = true
            
            if(this.name == '')
                return

            if(this.order == '' || this.$refs.order.classList.contains('is-invalid'))
                return

            this.buttonDisabled = false
        },
    }
}
</script>