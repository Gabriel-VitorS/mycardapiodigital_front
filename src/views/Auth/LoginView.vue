<script setup lang="ts">
import DefaultInput from '@/components/Form/DefaultInput.vue';
import PasswordInput from '@/components/Form/PasswordInput.vue';
import FullScreenLayout from '@/components/ui/FullScreenLayout.vue';
import SpinnerSm from '@/components/ui/SpinnerSm.vue';

import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { login } from '@/api/auth/login';
import router from '@/router';
import { Toast } from '@/stores/toast';
import { RouterLink } from 'vue-router';

const isSending = ref(false);

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
  }),

});

const onSubmit = handleSubmit(async (values) => {
  isSending.value = true;

  
  await login({email: values.email, password: values.password})
  .then((response)=>{
    const token = response.data

    sessionStorage.setItem("JWT", JSON.stringify(token))
    

    router.push("/gestor")
    
  })
  .catch((err)=>{
    console.error('Login error', err);
    if (err.response && err.response.status === 401){
      Toast().error('E-mail ou senha inválidos');
      return

    }

    Toast().error('Erro ao tentar fazer login. Tente novamente mais tarde.');
})

  isSending.value = false;
})
</script>

<template>
  <FullScreenLayout>
    <div class="row h-100">

      <section class="col-md-6 col-sm-12 col d-flex align-items-center justify-content-center">

        <div class="w-100" style="max-width: 400px;">
          <section>
            <h2>
              Login
            </h2>
            <p class="text-secondary">Entre com seu email e senha para acessar sua conta. </p>
          </section>

          <section>
            <form @submit.prevent="onSubmit">

              <div class="mb-3">
                <DefaultInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="info@gmail.com"
                  :required="true" />
              </div>

              <div class="mb-3">
                <PasswordInput
                  name="password"
                  label="Senha"
                  placeholder="Digite sua senha"
                  :required="true" />
              </div>

              <div class="mt-4">
                  <button type="submit" :disabled="isSending" class="btn btn-primary w-100">
                      Entrar
                      <SpinnerSm class="ms-2" v-if="isSending" />
                  </button>
              </div>
            </form>
          </section>
          
          <div class="mt-2">
            <p>Nâo tem uma conta? <RouterLink to="/cadastro">Cadastre-se</RouterLink></p>
          </div>
        </div>

      </section>

      <section class="col-md-6 d-md-block d-none bg-primary flex justify-content-center align-content-center">
        <div class="position-absolute top-0 end-0">
          <img class="img-fluid" src="/images/shape/grid-01.svg" alt="grid" width="300" />
        </div>

        <div class="text-center">
          <p class="text-light">Seu cardápio digital em um só lugar.</p>
        </div>
      </section>
    </div>
  </FullScreenLayout>
</template>
