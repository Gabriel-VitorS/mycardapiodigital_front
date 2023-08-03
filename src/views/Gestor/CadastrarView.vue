<template>
    <div class="container">
        <span class="fs-1 col-4" >Cadastrar</span>

        <section class="row justify-content-center mt-3">
            <FormCadastro />
            
        </section>
    </div>
</template>

<script>
import FormCadastro from '@/components/gestor/forms/FormCadastro.vue';
export default {
    name: 'CadastrarView',
    components: {
        FormCadastro
    }
}
</script>