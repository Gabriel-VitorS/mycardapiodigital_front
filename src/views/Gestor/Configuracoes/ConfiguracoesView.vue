<template >
    <section class="container ">
        <form class="row" ref="form">
            <div class="col-lg-6 mb-3">
                <label for="name" class="form-label">Nome do restaurante:</label>
                <input ref="name" v-model="name_company" required type="text" class="form-control" name="name_company" placeholder="Digite o nome do restaurante">
            </div>

            <div class="col-lg-6 mb-3">
                <label for="name" class="form-label">URL:</label>
                <div class="input-group">
                    <input ref="name" v-model="url" @blur="verifyUrl" autocomplete="off" @paste="$event => $event.preventDefault()" @keyup.delete="validateUrlString"  @keydown="validateUrlString" required type="text" class="form-control" :class="{'is-invalid': urlIsInvalid}" name="url">
                    <span v-if="showSpinUrl" class="input-group-text" id="basic-addon1">
                        <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
                    </span>
                    
                </div>
                
                
                <div>
                    <p>Exemplo: www.cardapiodigital.com.br/cardapio/<strong>{{ url == '' ? 'sua-url' : url }} </strong></p>
                </div>
            </div>

            <div class="col-md-12 row mt-3">
                <CropImageBanner :url_image="url_banner" />
            </div>

            <div class="col-md-12 row mt-3">
                <CropImageLogo :url_image="url_logo" />
            </div>
        </form>
    </section>

    <footer class="d-flex justify-content-around mt-5">
                    
        <div>
            <button class="btn btn-success ms-2" @click="enviaConfiguracao" :disabled="buttonDisabled">Salvar</button>
        </div>
            
    </footer>

    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div ref="toaster" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                {{ errorMessageToaster }}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>

    <ModalAlert v-if="showAlert" message="Configurações salvas com sucesso" @closeButton="this.$router.go(0)" />
    <ModalLoader v-if="showLoader" />

</template>

<script>
import CropImageBanner from '@/components/gestor/CropImage/CropImageBanner.vue'
import CropImageLogo from '@/components/gestor/CropImage/CropImageLogo.vue'
import ModalLoader from '@/components/gestor/ModalLoader/ModalLoader.vue'
import ModalAlert from '@/components/gestor/ModalAlert/ModalAlert.vue'
import { Toast } from 'bootstrap'
import axios from 'axios'
export default {
    name: 'ConfiguracoesView',
    components:{CropImageBanner, CropImageLogo, ModalLoader, ModalAlert},
    data(){
        return{
            name_company: '',
            url: '',
            id: 0,
            oldUrl: '',
            urlIsInvalid: false,
            showSpinUrl: false,
            url_banner: '',
            url_logo: '',
            buttonDisabled: true,
            errorMessageToaster: '',
            showLoader: false,
            showAlert: false
        }
    },
    watch:{
        name_company(){this.changeButtonSubmit()},
        url(){this.changeButtonSubmit()},
        urlIsInvalid(){this.changeButtonSubmit()}
    },
    mounted(){
        this.getData()
    },
    methods:{
        validateUrlString(event){
            if(/^[A-Za-z0-9-]+$/.test(event.key) == false){
                event.preventDefault()
                return
            }
            
            if(this.url == ''){
                this.urlIsInvalid = true
                return
            }
            this.urlIsInvalid = false
        },
        async verifyUrl(){
            const toaster = new Toast(this.$refs.toaster)
            if(this.url == '' || this.urlIsInvalid)
                return

            if(this.oldUrl == this.url)
                return

            this.buttonDisabled = true
            this.showSpinUrl = true
            await axios.post(`${process.env.VUE_APP_URL_API}/configuration/verify_url`,{url: this.url},{
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
            }).then((data)=>{
                this.showSpinUrl = false
                if(data.request.status !== 200){
                    this.errorMessageToaster = 'Error ao verificar url. Tente novamente'
                    toaster.show()
                    return
                }

                if(data.data.isValid == true){
                    this.urlIsInvalid = false
                    this.changeButtonSubmit()
                }else{
                    this.urlIsInvalid = true
                }
            })
        },
        async getData(){
            this.showLoader = true
            const toaster = new Toast(this.$refs.toaster)
            await axios.get(`${process.env.VUE_APP_URL_API}/configuration`,{
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`}
            }).then((data)=>{
                
                if(data.request.status !== 200){
                    this.errorMessageToaster = 'Error ao buscar dados. Tente novamente'
                    toaster.show()
                    return
                }

                if(data.data.data == '') return

                this.name_company = data.data.data.name_company
                this.url = data.data.data.url
                this.oldUrl = data.data.data.url
                this.url_banner = `${data.data.data.url_banner}?lastmod=${new Date() / 1}`
                this.url_logo = `${data.data.data.url_logo}?lastmod=${new Date() / 1}`
                this.id = data.data.data.id
                
            })
            .catch((err)=>{
                console.log(err)
                this.errorMessageToaster = 'Error ao buscar dados. Tente novamente'
                    toaster.show()
            })
            this.showLoader = false
        },
        async enviaConfiguracao(){
            this.showLoader = true
            const form = new FormData(this.$refs.form)
            const toaster = new Toast(this.$refs.toaster)

            await axios({
                method: this.id == 0 ? 'POST' : 'PUT',
                url: this.id == 0 ? `${process.env.VUE_APP_URL_API}/configuration` : `${process.env.VUE_APP_URL_API}/configuration/${this.id}`,
                headers: {Authorization: `bearer ${sessionStorage.getItem('JWT')}`},
                data: form
            })
            .catch((err)=>{
                console.log(err)
                this.showLoader = false
                this.errorMessageToaster = 'Erro ao enviar dados. Tente novamente'
                toaster.show()
                
            }).then((data)=>{
                if(data.request.status == 200){
                    this.showAlert = true
                }
                this.showLoader = false 
            })


        },
        changeButtonSubmit(){
            this.buttonDisabled = true

            if(this.name_company == '')
                return

            if(this.url == '' || this.urlIsInvalid)
                return

            this.buttonDisabled = false
        }
    }
}
</script>