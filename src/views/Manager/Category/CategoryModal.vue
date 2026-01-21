<script setup lang="ts">
import DefaultInput from '@/components/Form/DefaultInput.vue';
import BtnWithSpinner from '@/components/common/BtnWithSpinner.vue';

import { onMounted, ref, onBeforeUnmount } from 'vue';
import router from '@/router';
import {Modal} from 'bootstrap'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { getCategoryById, createCategory, updateCategory, deleteCategory } from '@/api/manager/category';
import { Toast } from "@/stores/toast";
import { useCategoryStore } from '@/stores/categoryStore';

const categoryStore = useCategoryStore();
const isSending= ref(false)
let modal: Modal
const modalElement = ref<Element | HTMLElement>(document.getElementById('modal')!)
const categoryId = router.currentRoute.value.params.categoryId as number | undefined

const { handleSubmit, resetForm} = useForm({
    validationSchema: yup.object({
        name: yup.string().required('Nome do estabelecimento é obrigatório'),
        order: yup.number().required("Ordem de exibição é obrigatória").min(1, "Ordem deve ser no mínimo 1"),
    }),

});

onMounted(async () => {
    // Logic for modal can be added here
    modal = new Modal(modalElement.value)
    
    modalElement.value.addEventListener('hidden.bs.modal', () =>{
        router.push({name: 'categories'})
    })

    if(categoryId == undefined){
        router.push({name: 'categories'})
    }

    if(categoryId != 0 && categoryId != undefined){
        await getCategoryById(categoryId).then((response) => {
            resetForm({
                values: {
                    name: response.data.name,
                    order: response.data.order,
                }
            })
        }).catch((err) => {
            Toast().error('Erro ao carregar categoria. Tente novamente mais tarde.');
            console.error("Error fetching category", err);
            router.push({name: 'categories'})
            
        });
    }

    modal.show()
});

onBeforeUnmount(()=>{
    modal.dispose()
})



const onSubmit = handleSubmit(async values => {
    isSending.value = true
    if(categoryId == 0){

        await createCategory({
            name: values.name,
            order: values.order,
        }).then(async () => {
            await categoryStore.loadCategories({page: 1});
            Toast().success('Categoria criada com sucesso!');
            modal.hide()

        }).catch((err) => {
            console.error("Error creating category", err);
            Toast().error('Erro ao criar categoria. Tente novamente mais tarde.');
        });
    }else{

        await updateCategory(categoryId!, {
            name: values.name,
            order: values.order,
        }).then(async () => {
            await categoryStore.loadCategories({page: 1});
            Toast().success('Categoria atualizada com sucesso!');
            modal.hide()

        }).catch((err) => {
            console.error("Error updating category", err);
            Toast().error('Erro ao atualizar categoria. Tente novamente mais tarde.');
        });
    }
    isSending.value = false
});

const delCategory = async () => {
    isSending.value = true
    await deleteCategory(categoryId!).then(async () => {
        await categoryStore.loadCategories({page: 1});
        Toast().success('Categoria apagada com sucesso!');
        modal.hide()

    }).catch((err) => {
        console.error("Error deleting category", err);
        Toast().error('Erro ao apagar categoria. Tente novamente mais tarde.');
    });
    isSending.value = false
}

</script>

<template>
    <div ref="modalElement" class="modal fade" id="modal" tabindex="-1"> 
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">{{ categoryId == 0 ? 'Incluir Categoria' : 'Editar Categoria' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form class="row gy-3"  >
                        <div class="col-md-6">
                            <DefaultInput
                            name="name"
                            label="Nome da Categoria"
                            :required="true"
                            />
                        </div>

                        <div class="col-md-6">
                            <DefaultInput
                            name="order"
                            label="Ordem de exibição"
                            type="number"
                            :required="true"
                            />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <BtnWithSpinner type="btn-danger"  v-if="categoryId != 0" @click="delCategory" :is-sending="isSending" text-btn="Apagar" />
                    <BtnWithSpinner :is-sending="isSending" type="btn-primary" @click="onSubmit"/>
                </div>
            </div>
        </div>
    </div>
</template>