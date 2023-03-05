<template>
    <div class="container">
        <!-- <section class="row justify-content-center"> -->
            <span class="fs-1 col-4" >Login</span>
        <!-- </section> -->
        
        <section class="row justify-content-center mt-3">
            
            <FormLogin />
        </section>
    </div>

</template>

<script>
import FormLogin from '@/components/gestor/login/FormLogin.vue';
export default {
    name: 'LoginView',
    components: {FormLogin}
}
</script>