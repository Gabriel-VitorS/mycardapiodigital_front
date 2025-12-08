<script setup lang="ts">
import DefaultInput from '@/components/Form/DefaultInput.vue';
import BtnWithSpinner from '@/components/common/BtnWithSpinner.vue';
import MoneyInput from '@/components/Form/MoneyInput.vue';
import CheckBox from '@/components/Form/CheckBox.vue';
import SelectInput from '@/components/Form/SelectInput.vue';

import { onMounted, ref, onBeforeUnmount } from 'vue';
import router from '@/router';
import {Modal} from 'bootstrap'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { getProductById, storeProduct, updateProduct, deleteProduct, storeImgProduct } from '@/api/manager/product';
import { Toast } from "@/stores/toast";
import { useCategoryStore } from '@/stores/categoryStore';
import { useProductStore } from '@/stores/productStore';
import SelectImgProduct from '@/components/Form/SelectImgProduct.vue';
import DefaultTextArea from '@/components/Form/DefaultTextArea.vue';

const categoryStore = useCategoryStore();
const productStore = useProductStore();
const isSending= ref(false)
let modal: Modal
const modalProduct = ref<Element | HTMLElement>(document.getElementById('modal')!)
const productId = router.currentRoute.value.params.productId as number | undefined

const { handleSubmit, resetForm, values} = useForm({
    validationSchema: yup.object({
        name: yup.string().required('Nome do estabelecimento é obrigatório'),
        value: yup.string().required("Valor do produto é obrigatório"),
        category_id: yup.string().optional(),
        highlight: yup.boolean().optional(),
        visible_online: yup.boolean().optional(),
    }),

});

onMounted(async () => {
    // Logic for modal can be added here
    modal = new Modal(modalProduct.value)
    
    modalProduct.value.addEventListener('hidden.bs.modal', () =>{
        router.push({name: 'products'})
    })

    if(productId == undefined){
        router.push({name: 'products'})
    }

    await categoryStore.loadCategories({limit: 100, page: 1});

    if(productId != 0 && productId != undefined){
        await getProductById(productId).then((response) => {
            resetForm({
                values: {
                    name: response.data.name,
                    value: response.data.value.toString().replace('.', ','),
                    category_id: response.data.category_id?.toString() || '',
                    highlight: response.data.highlight == 0 ? false : true,
                    visible_online: response.data.visible_online == 0 ? false : true,
                    details: response.data.details || '',
                    url_image: response.data.url_image || '',
                    image: response.data.url_image || null,
                }
            })
        }).catch((err) => {
            Toast().error('Erro ao carregar produto. Tente novamente mais tarde.');
            console.error("Error fetching product", err);
            router.push({name: 'products'})
            
        });
    }

    modal.show()
});

onBeforeUnmount(()=>{
    modal.dispose()
})


const onSubmit = handleSubmit(async values => {
    console.log(values)
    isSending.value = true

    let newId: number

    if(productId == 0){
        console.log('aqui')
        await storeProduct({
            name: values.name,
            category_id: Number(values.category_id) || null,
            value: String(values.value).replace(',', '.'),
            highlight: values.highlight ? 1 : 0,
            visible_online: values.visible_online ? 1 : 0,
            details: values.details || '',
            image: values.image || null,
        }).then(async (response) => {
            Toast().success('Produto criada com sucesso!');
            console.log(response)
            newId = response.data;

        }).catch((err) => {
            console.error("Error creating product", err);
            Toast().error('Erro ao criar produto. Tente novamente mais tarde.');
        });
    }else{

        await updateProduct(productId!, {
            name: values.name,
            category_id: Number(values.category_id) || null,
            value: String(values.value).replace(',', '.'),
            highlight: values.highlight ? 1 : 0,
            visible_online: values.visible_online ? 1 : 0,
            details: values.details || '',
            image: values.image || null,
        }).then(async () => {
            Toast().success('Produto atualizado com sucesso!');

        }).catch((err) => {
            console.error("Error updating product", err);
            Toast().error('Erro ao atualizar produto. Tente novamente mais tarde.');
        });
    }

    await storeImgProduct({
        id: productId == 0 ? newId! : productId!,
        image: values.image || null,
    })
    .then(async () => {
        Toast().success('Imagem do produto atualizada com sucesso!');
            
    }).catch((err) => {
        console.error("Error updating product", err);
        Toast().error('Erro ao atualizar produto. Tente novamente mais tarde.');
    });

    await productStore.loadProducts({page: 1});
    isSending.value = false
});

const delProduct = async () => {
    isSending.value = true
    await deleteProduct(productId!).then(async () => {
        await productStore.loadProducts({page: 1});
        Toast().success('Produto apagado com sucesso!');
        modal.hide()

    }).catch((err) => {
        console.error("Error deleting product", err);
        Toast().error('Erro ao apagar produto. Tente novamente mais tarde.');
    });
    isSending.value = false
}

</script>

<template>
    <div ref="modalProduct" class="modal fade" id="modal2" tabindex="-1"> 
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">{{ productId == 0 ? 'Incluir Produto' : 'Editar Produto' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form class="row gy-3"  >
                        <div class="col-md-6">
                            <DefaultInput
                            name="name"
                            label="Nome do Produto"
                            :required="true"
                            />
                        </div>

                        <div class="col-md-6">
                            <MoneyInput />
                        </div>

                        <div class="col-md-6">
                            <SelectInput
                            name="category_id"
                            label="Categoria do Produto"
                            :options="categoryStore.categories?.data.map(category => ({ value: `${category.id}`, label: category.name }) )"
                            />
                        </div>

                        <div class="col-md-6 align-content-center">
                            <CheckBox
                            name="highlight"
                            label="Produto em destaque?"
                            />

                            <CheckBox
                            name="visible_online"
                            label="Produto é visível no cardápio?"
                            />
                        </div>

                        <div class="col-md-6">
                            <DefaultTextArea
                            name="details"
                            label="Detalhes"
                            :required="false"
                            type="textarea"
                            />
                        </div>

                        <div class="col-md-6">
                            <SelectImgProduct
                            :url_image="values.url_image" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <BtnWithSpinner type="btn-danger"  v-if="productId != 0" @click="delProduct" :is-sending="isSending" text-btn="Apagar" />
                    <BtnWithSpinner :is-sending="isSending" type="btn-primary" @click="onSubmit"/>
                </div>
            </div>
        </div>
    </div>
</template>