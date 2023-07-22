<template>
    <form @submit.prevent="login" class="col-md-4">

        <div class="mb-3">
            <label for="email"  class="form-label">Email:</label>
            <input type="email" :disabled="showSpin" v-model="email" class="form-control" id="email" name="email" placeholder="email@example.com">
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">Senha:</label>
            <input type="password" :disabled="showSpin" v-model="password" class="form-control" name="password" placeholder="*****" id="password">
        </div>

        <div class="d-flex justify-content-around flex-wrap">
            <button  type="button" @click="this.$router.push('/cadastrar')" class="btn btn-light">Cadastrar</button>

            <button type="submit" :disabled="buttonDisabled" class="btn btn-primary">
                Entrar 
                <span v-if="showSpin" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
        </div>
        

    </form>    

    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div ref="toaster" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                {{ errorMessage }}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
    

</template>

<script>
import axios from 'axios'
import { Toast } from 'bootstrap'

export default {
    name: 'FormLogin',
    data(){
        return{
            email: '',
            password: '',
            buttonDisabled: true,
            showSpin: false,
            errorMessage: ''
        }
    },
    watch:{
        email(){
            this.changeButtonSubmit()
        },
        password(){
            this.changeButtonSubmit()
        }
    },
    methods:{
        changeButtonSubmit(){

            if(this.email !== '' && this.password !== '')
                this.buttonDisabled = false
            else
                this.buttonDisabled = true

        },

        async login(event){
            this.showSpin = true
            this.buttonDisabled = true

            const toaster = new Toast(this.$refs.toaster)

            try {

                const request =await axios.post(`${process.env.VUE_APP_URL_API}/login`,event.target)
            
                if(request.status == 200){
                    sessionStorage.setItem('JWT', request.data.data)
                    this.$router.push('/gestor')
                }else{
                    this.errorMessage = 'Error interno. Contate o suporte ou tente novamente mais tarde'
                    toaster.show()
                }

            } catch (error) {
                console.log(error.response.status)
                if(error.response.status === 422)
                    this.errorMessage = 'Usuário invalido'
                else
                    this.errorMessage = 'Error interno. Contate o suporte ou tente novamente mais tarde'
                
                toaster.show()
            }
            
            this.showSpin = false
            this.buttonDisabled = false
        }
    }
}
</script>