<template>
    <section class="container">        
        <span class="fs-1 col-4" >Cadastro</span>
        
        
        <div class="d-flex justify-content-center mt-5">
            <div class="card text-bg-primary" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Cadastero realizado com sucesso!</h5>
                    <p class="card-text">
                        Faça o login para fazer as configurações, adicionar produtos e imagens do seu restaurante.
                    </p>
                    
                    <div class="d-flex justify-content-end">
                        <button @click="goToLogin" type="button" class="btn btn-light">Entrar</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'CadastroSucessoView',
    methods:{
        goToLogin(){
            sessionStorage.removeItem('JWT')
            this.$router.push('/login')
        }
    }
}
</script>