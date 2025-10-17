<script setup lang="ts">
import DefaultInput from '@/components/Form/DefaultInput.vue';
import PasswordInput from '@/components/Form/PasswordInput.vue';
import FullScreenLayout from '@/components/ui/FullScreenLayout.vue';
import SpinnerSm from '@/components/ui/SpinnerSm.vue';
import CpfCnpjInput from '@/components/Form/CpfCnpjInput.vue';

import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { register } from '@/api/auth/register';
import router from '@/router';
import { Toast } from '@/stores/toast';
import { RouterLink } from 'vue-router';
import { cpf, cnpj} from '@dmalbuquerque/cpf-cnpj-validator';
import type { RegisterRequest } from '@/types/auth/register.type';

const isSending = ref(false);

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
    cpf_cnpj: yup.string().required("Digite o CPF ou o CNPJ válido")
            .min(14, "Digite o CPF ou o CNPJ válido")
            .test("cpfcnpjValidation", "Digite o CPF ou o CNPJ válido", (value) =>{
                return validCpfCnpj(value)
            }),
    password_confirmation: yup.string().required("Campo obrigatório").oneOf([yup.ref("password")], "Senha não coincide")
  }),

});

function validCpfCnpj(cpfcnpj: string): boolean{

    if(cpfcnpj.length < 14) 
        return false

    if(cpfcnpj.length == 14)
        return cpf.isValid(cpfcnpj);

    if(cpfcnpj.length < 18)
        return false

    return cnpj.isValid(cpfcnpj)
}

const onSubmit = handleSubmit(async (values) => {
  isSending.value = true;

  const valuesToSend:RegisterRequest ={
    name: values.name,
    cpf_cnpj: values.cpf_cnpj.replace(/[.\-\/]/g, ''),
    email: values.email,
    password: values.password,
    password_confirmation: values.password_confirmation
  }
  
  await register(valuesToSend)
  .then((response)=>{
    const token = response.data

    sessionStorage.setItem("JWT", JSON.stringify(token))
    

    router.push("/gestor")
    
  })
  .catch((err)=>{
    console.error('Login error', err);
    if (err.response && err.response.status === 406){
      Toast().error(err.response.data)
      console.log(err.response)
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
              Cadastro
            </h2>
            
          </section>

          <section>
            <form @submit.prevent="onSubmit">

              <div class="mb-3">
                <DefaultInput
                  name="name"
                  label="Nome"
                  placeholder="Fulano da Silva"
                  :required="true" />
              </div>

              <div class="mb-3">
                <DefaultInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="info@gmail.com"
                  :required="true" />
              </div>

              <div class="mb-3">
                <CpfCnpjInput />
              </div>

              <div class="mb-3">
                <PasswordInput
                  name="password"
                  label="Senha"
                  placeholder="Digite sua senha"
                  :required="true" />
              </div>

              <div class="mb-3">
                <PasswordInput
                  name="password_confirmation"
                  label="Digite novamente a senha"
                  placeholder="Digite sua senha"
                  :required="true" />
              </div>

              <div class="mt-4">
                  <button type="submit" :disabled="isSending" class="btn btn-primary w-100">
                      Cadastrar
                      <SpinnerSm class="ms-2" v-if="isSending" />
                  </button>
              </div>
            </form>
          </section>
          
          <div class="mt-2">
            <p>Já tem uma conta? <RouterLink to="/login">Faça o login</RouterLink></p>
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
