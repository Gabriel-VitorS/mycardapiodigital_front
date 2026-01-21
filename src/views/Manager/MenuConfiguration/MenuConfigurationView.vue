<script lang="ts" setup>
import ComponentCard from '@/components/common/ComponentCard.vue';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
import ColorInput from '@/components/Form/ColorInput.vue';
import DefaultInput from '@/components/Form/DefaultInput.vue';
import SelectImgLogo from '@/components/Form/SelectImgLogo.vue';
import SelectInput from '@/components/Form/SelectInput.vue';
import UrlInput from '@/components/Form/UrlInput.vue';


import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { onMounted, ref } from "vue";
import { getConfiguration, updateConfiguration, storeConfiguration, storeImgConfiguration } from "@/api/manager/configuration";
import { Toast } from "@/stores/toast";
import type { ConfigurationForm } from "@/types/manager/configuration"
import SpinnerSm from '@/components/ui/SpinnerSm.vue';
import BtnWithSpinner from '@/components/common/BtnWithSpinner.vue';
import { useMenuConfigStore } from '@/stores/menuConfigstore';
import BoxArrowUpRight from '@/components/icons/BoxArrowUpRight.vue';
const menuConfigStore = useMenuConfigStore();

const isLoading= ref(true)
const isSending= ref(false)
const idConfiguration = ref<number|null>(null);
const { handleSubmit, resetForm, values } = useForm({
    validationSchema: yup.object({
    name_company: yup.string().required('Nome do estabelecimento é obrigatório'),
    url: yup.string().required("Digite a url").test('validUrl', "A URL só pode conter letras de A à Z, números e -",(value) => {
        return /^[A-Za-z0-9-]+$/.test(value)
    }),
    theme_color: yup.string().required("Selecione a cor do tema"),
    background_color: yup.string().required("Selecione a cor de fundo"),
    }),

});

const onSubmit = handleSubmit(async values => {

  
    const valuesToSend: ConfigurationForm = {
        name_company: values.name_company,
        url: values.url,
        theme_color: values.theme_color,
        background_color: values.background_color,
        logo_image: values.logo_image,
    }
    
    isSending.value = true

    if(idConfiguration.value != null){

        await updateConfiguration(idConfiguration.value, valuesToSend)
        .then(() => {
            Toast().success('Configuração atualizada com sucesso!');
        })
        .catch((err) => {
            console.error("Error updating configuration", err);
            Toast().error('Erro ao atualizar configuração. Tente novamente mais tarde.');
            return
        });
        

    }else{

        await storeConfiguration(valuesToSend)
        .then(() => {
            Toast().success('Configuração criada com sucesso!');
        })
        .catch((err) => {
            console.error("Error creating configuration", err);
            Toast().error('Erro ao criar configuração. Tente novamente mais tarde.');
            return
        });
    }

    await storeImgConfiguration(valuesToSend)
        .then(() => {
        Toast().success('Imagem do logo atualizada com sucesso!');
        })
        .catch((err) => {
            console.error("Error updating logo image", err)
            Toast().error('Erro ao enviar imagem do logo.')
            return
    });
    menuConfigStore.loadMenuConfig()
    isSending.value = false
});

const buscaConfig = async () =>{
    isLoading.value = true
    await getConfiguration().then((response) => {

        idConfiguration.value = response.data.id
        resetForm({
            values: {
            name_company: response.data.name_company,
            url: response.data.url,
            url_logo: response.data.url_logo,
            theme_color: response.data.theme_color,
            background_color: response.data.background_color,
            }
        })
        }).catch((err) => {
        console.error("Error fetching configuration", err)
        if (err.response.status === 404){
            return
        }
        Toast().error('Configuração não encontrada.')

    })
    isLoading.value = false
}

onMounted( async () => {
  await buscaConfig()
});
</script>

<style scoped>
    .w-100{
        width: auto !important;
    }
    @media screen and (max-width: 768px) {
  
        .w-100{
            width: 100% !important;
        }
    }
</style>

<template>
    <PageBreadcrumb
    pageTitle="Configuração do Cardápio" />

    <ComponentCard page-title="Configuração do Cardápio">

        <div class="text-center" v-if="isLoading">
            <span>Carregando configurações</span><br>
            <SpinnerSm></SpinnerSm>
        </div>

        <form class="row gy-3" @submit.prevent="onSubmit" v-else>

            <div class="col-md-6">
                <DefaultInput
                name="name_company"
                label="Nome do Estabelecimento"
                :required="true"
                />
            </div>

            <div class="col-md-6">
                <UrlInput />
            </div>

            <div class="col-md-6">
                <SelectInput
                label="Cor de fundo do Cardápio"
                name="background_color"
                :options="[
                    { value: '#F8F9FA', label: 'Claro' },
                    { value: '#252525', label: 'Escuro' },
                ]"
                :required="true" />
            </div>

            <div class="col-md-6">
                <ColorInput
                label="Selecione a cor de destaque"
                name="theme_color"
                :required="true" />
            </div>

            <div class="col-md-6">
                <SelectImgLogo :url_image="values.url_logo" />
            </div>

            <div class="col-12 text-center mx-auto">
                <BtnWithSpinner :is-sending="isSending" type="btn-primary" class="w-100"/>
                <a :href="menuConfigStore.linkToMenu" target="_blank" v-if="menuConfigStore.isMenuConfigured" class="btn btn-secondary ms-md-1 mt-md-0 mt-2 w-100">Acessar cardápio <BoxArrowUpRight></BoxArrowUpRight> </a>
            </div>
        </form>
    </ComponentCard>
</template>

