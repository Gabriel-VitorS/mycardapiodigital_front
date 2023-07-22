<template>
    <form class="col-md-4" @submit.prevent="cadastra">
        <div class="mb-3">
            <label for="name" class="form-label">Nome:</label>
            <input type="text" v-model="nome" class="form-control" id="name" name="name" placeholder="Digite seu nome">
        </div>
        
        <!-- CPF ou CNPJ Inicio -->
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="cpfOrCnpj" value="cnpj">
            <label class="form-check-label" for="inlineRadio1">CNPJ</label>
        </div>

        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="cpfOrCnpj" value="cpf">
            <label class="form-check-label" for="inlineRadio2">CPF</label>
        </div>

        <div class="mt-1">
            <input ref="cpf_cnpj" type="text" @blur="validateCpfCnpj" :maxlength="maxLength" v-model="cpf_cnpj" class="form-control" name="cpf_cnpj" placeholder="Digite seu CPF ou CNPJ (Apenas números)">
            <div class="invalid-feedback">
                CNPJ ou CPF inválido
            </div>
        </div>
        <!-- CPF ou CNPJ Fim -->

        <label for="email" class="form-label mt-3">Email:</label>
        <div class="input-group">
            <input ref="email" type="email" @blur="verifyEmail" v-model="email" class="form-control" id="email" name="email" placeholder="email@example.com">
            <span v-show="showSpinnerEmail" class="input-group-text" id="basic-addon1">
                <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
            </span>

            <div class="invalid-feedback"> {{ InvalidMessageEmail }} </div>
            
        </div>

        <div class="mt-3">
            <label for="password" class="form-label">Senha:</label>
            <input type="password" v-model="password" class="form-control" name="password" id="password">
        </div>

        <div class="mt-3">
            <label for="passwordConfirmation" class="form-label">Confirmação de senha:</label>
            <input ref="confirmPasswordInput" type="password" v-model="confirmPassword" class="form-control" name="password_confirmation" id="passwordConfirmation">
            <div class="invalid-feedback"> Senhas não coincidem </div>
        </div>

        <div class="d-flex justify-content-around flex-wrap mt-3">
            <button  type="button" @click="this.$router.push('/login')" class="btn btn-light">Entrar</button>

            <button type="submit" :disabled="buttonDisabled" class="btn btn-primary">
                Cadastrar 
                <span v-if="showSpin" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
        </div>
    </form>

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
</template>

<script>
import {cpf, cnpj} from 'cpf-cnpj-validator'
import axios from 'axios'
import { Toast } from 'bootstrap'

export default{
    name: 'FormCadastro',
    data(){
        return{
            nome: '',
            cpf_cnpj: '',
            email: '',
            password: '',
            confirmPassword: '',
            cpfOrCnpj: 'cnpj',
            maxLength: 14,
            showSpinnerEmail: false,
            InvalidMessageEmail: 'Digite um e-mail válido',
            errorMessageToaster: '',
            buttonDisabled: true,
            showSpin: false,

        }
    },
    watch:{
        cpfOrCnpj(value){
            this.cpf_cnpj = ''
            value === 'cnpj' ? this.maxLength = 14 : this.maxLength = 11
        },
        nome(){this.changeButtonSubmit() },
        cpf_cnpj(){ this.changeButtonSubmit() },
        email(){ this.changeButtonSubmit() },
        password(){
            this.verifyPassword()
            this.changeButtonSubmit()
        },
        confirmPassword(){
            this.verifyPassword()
            this.changeButtonSubmit()
        }
    },
    methods:{
        validateCpfCnpj(event){
            
            if(this.cpfOrCnpj === 'cnpj'){            
                if(cnpj.isValid(event.target.value)){
                    event.target.classList.remove('is-invalid')
                    
                }else{
                    event.target.classList.add('is-invalid')
                }

                this.changeButtonSubmit()
            }else{
                if(cpf.isValid(event.target.value)){
                    event.target.classList.remove('is-invalid')
                    
                }else{
                    event.target.classList.add('is-invalid')
                }

                this.changeButtonSubmit()
            }
        },
        
        async verifyEmail(event){
            const toaster = new Toast(this.$refs.toaster)

            if(!event.target.value.includes('@') || event.target.value.length < 10){
                this.InvalidMessageEmail = 'Digite um e-mail válido'
                event.target.classList.add('is-invalid')
                return
            }

            this.showSpinnerEmail = true
            const request = await axios.post(`${process.env.VUE_APP_URL_API}/verify_email`, {email: event.target.value}).catch(()=>{
                this.errorMessageToaster = 'Falha ao verificar e-mail. Tente novamente mais tarde'
                toaster.show()
                return
            })
            this.showSpinnerEmail = false

            if(request.data.isValid == true){
                event.target.classList.remove('is-invalid')
                
            }else{
                this.InvalidMessageEmail = 'E-mail já está em uso'
                event.target.classList.add('is-invalid')
            }
            this.changeButtonSubmit()
        },
        verifyPassword(){
            const input = this.$refs.confirmPasswordInput

            if(this.password != this.confirmPassword){
                input.classList.add('is-invalid')
            }else{
                input.classList.remove('is-invalid')
            }
        },
        changeButtonSubmit(){
            this.buttonDisabled = true
            
            if(this.nome == '' || this.password == '' || this.confirmPassword == '' || this.$refs.confirmPasswordInput.classList.contains('is-invalid'))
                return

            if(this.cpf_cnpj == '' || this.$refs.cpf_cnpj.classList.contains('is-invalid'))
                return

            if(this.email == '' || this.$refs.email.classList.contains('is-invalid'))
                return

            this.buttonDisabled = false
        },
        async cadastra(event){
            this.showSpin = true
            this.buttonDisabled = true
            console.log(event)
            const toaster = new Toast(this.$refs.toaster)

            try {

                const request =await axios.post(`${process.env.VUE_APP_URL_API}/register`,event.target)

                if(request.status == 200){
                    this.$router.push('/cadastrar-sucesso')
                }else{
                    this.errorMessageToaster = 'Error interno. Contate o suporte ou tente novamente mais tarde'
                    toaster.show()
                }

            } catch (error) {

                if(error.response.status === 406)
                    this.errorMessageToaster = 'E-mail já cadastrado'
                else
                    this.errorMessageToaster = 'Error interno. Contate o suporte ou tente novamente mais tarde'

                toaster.show()
            }

            this.showSpin = false
            this.buttonDisabled = false
        }
    }
}
</script>
