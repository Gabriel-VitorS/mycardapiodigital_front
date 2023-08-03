<template>
    <section class="main" v-if="showCardapio">
        <Header 
        :urlBanner="configuration.banner_image"
        :urlLogo="configuration.url_logo"
        :nameCompany="configuration.name_company" />

        <!-- Área de destaque -->
        <section v-if="highlight.length != 0">
            <TextCategoria name="Destaques" :id=0 />

            <div class="d-flex justify-content-center flex-wrap justify-content-evenly">
                <CardComponent v-for="products in highlight" :key="products.id"
                :name="products.name"
                :value="products.value"
                :image="products.url_image"
                @detailProduct="getDetailProduct(products.id)"
                />

            </div>
        </section>
        <!-- Fim Área de destaque -->

        <section>
            <template v-for="category in categories" :key="category.id">
                <TextCategoria :name="category.name" :id="category.id" />

                <div class="d-flex justify-content-center flex-wrap justify-content-evenly">
                    <CardComponent  v-for="product in category.products" :key="product.id"
                    :name="product.name"
                    :value="product.value"
                    :image="product.url_image"
                    @detailProduct="getDetailProduct(product.id)"
                    />
                </div>
            </template>
        </section>

        <ButtonsArea :categories="categories" :hasHighlight="highlight.length != 0 ? true : false" />

        <ModalLoader v-if="showLoaderProduct" />

        <CardDetail
        :name="detailProduct.name"
        :value="detailProduct.value"
        :detail="detailProduct.details"
        :image="detailProduct.url_image"
        @closeButton="this.showDetail = false" v-if="showDetail" />

        <div class="toast-container position-fixed top-0 end-0 p-3">
            <div ref="toaster" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body"> Error ao buscar dados </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
        
    </section>

</template>


<script lang="js">
import axios from 'axios';
import { Toast } from 'bootstrap';

import Header from '@/components/cardapio/Header/Header.vue';
import TextCategoria from '@/components/cardapio/TextCategoria/TextCategoria.vue';
import CardComponent from '@/components/cardapio/Card/CardComponent.vue';
import ButtonsArea from '@/components/cardapio/ButtonsArea/ButtonsArea.vue';
import ModalLoader from '@/components/gestor/ModalLoader/ModalLoader.vue';
import CardDetail from '@/components/cardapio/CardDetail/CardDetail.vue';
export default{
    name: 'CardapioView',
    components:{
        Header,
        TextCategoria,
        CardComponent,
        ButtonsArea,
        ModalLoader,
        CardDetail
    },
    data(){
        return{
            showCardapio: false,
            configuration: null,
            categories: [],
            highlight: [],
            detailProduct: {},
            showLoaderProduct: false,
            showDetail: false

        }
    },
    beforeMount(){
        this.getCardapio()
    },
    methods:{
        async getCardapio(){
            const restaurante = this.$route.params.restaurante

            try {
                const {data} = await axios.get(`${process.env.VUE_APP_URL_API}/menu/${restaurante}`) 
                this.configuration = data.configuration
                this.highlight = data.highlight
                this.categories = data.categories
                console.log(data)
                document.title = this.configuration.name_company
                this.showCardapio = true
            } catch (error) {
                this.$router.push('/NotFound')
                console.log(error)
            }
            
        },
        async getDetailProduct(id){
            this.showLoaderProduct = true

            try {
                const {data} = await axios.get(`${process.env.VUE_APP_URL_API}/menu/product/${id}`)
                this.detailProduct = data.data
                this.showDetail = true
            } catch (error) {
                new Toast(this.$refs.toaster).show()
                console.log(error)
            }

            this.showLoaderProduct = false
        }

    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.main{
    font-family: 'Montserrat', sans-serif;
    height:90vh;
    padding-bottom: 85px;
    overflow: auto;
    margin-bottom: 500px;

}
</style>