<template>
    <div class="modal fade" ref="modalDetail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <section class="modal-body">
                    <section class="d-flex justify-content-around flex-wrap">
                        <section class="d-flex justify-content-center align-items-center" style="width: calc(100% - 200px);">
                            <img :src="imageProduct" width="100" class="rounded" height="100" alt="">
                        </section>
                        
                        <section class="infoArea">
                            <div class="text-start">
                                <span class="fs-5">{{name}}</span> 
                            </div>
                            <div>
                                <strong>{{ valueProduct }}</strong>
                            </div>
                        </section>

                    </section>

                    <section class="detailArea">
                            <textarea :value="detail" disabled ></textarea>
                    </section>
                </section>
                <section class="modal-footer border-0 d-flex justify-content-center">
                    <button type="button" @click="closeButton" data-bs-dismiss="modal">Fechar</button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';
export default{
    name: 'CardDetail',
    props:{
        name: {type: String, required: true},
        value: {type: Number, required: true},
        detail: {type: String, required: false},
        image: {type: String, required: true},
    },
    computed:{
        valueProduct(){
            return Number(this.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        },
        imageProduct(){
            return `http://${this.image}?lastmod=${new Date() / 1})`
        }
    },
    mounted(){
        new Modal(this.$refs.modalDetail).show()
    },
    methods:{
        closeButton(){
            this.$emit('closeButton')
        }
    },
    beforeUnmount(){
        document.querySelector('.modal-backdrop').remove()
    }
}
</script>

<style scoped>
.modal-content{
    height: 85vh;
}

.infoArea{
    width: 200px;
    padding: 10px;
}

.infoArea > .text-start{
    max-height: 75%;
    height: 75%;
}

.detailArea{
    display: flex;    
    padding: 10px 23px;
    height: 85%;
}

button{
    background: var(--main-color);
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    border: none;
}

textarea {
    border: none;
    background-color: white;
    width: 100%;
    height: 100%;
    
}
</style>