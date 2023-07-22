<template>
    <div ref="modalAlert" data-bs-backdrop="static" data-bs-keyboard="false" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">

            <div class="modal-content">
            <div class="modal-body">
                <span class="fs-5">{{ message }}</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="closeButton">OK</button>
            </div>
            
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';
export default {
    name: 'ModalAlert',
    props: {
        message: {type: String, required: false}
    },
    methods:{
        closeButton(){
            this.$emit('closeButton')
        }
    },
    mounted(){
        new Modal(this.$refs.modalAlert).show()
    },
    beforeUnmount(){
        document.querySelector('.modal-backdrop').remove()
    }
}
</script>