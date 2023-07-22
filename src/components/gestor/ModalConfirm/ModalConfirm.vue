<template>
<div ref="modal" class="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">

    <div class="modal-content">
      <div class="modal-body">
        <span class="fs-5">{{ message }}</span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeButton" >Não</button>
        <button type="button" class="btn btn-primary" @click="confirmButton">Sim</button>
      </div>
      
    </div>
  </div>
</div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
    name: 'ModalConfirm',
    props: {
        message: {type: String, required: false}
    },
    methods:{
        closeButton(){
            this.$emit('closeModal')
        },
        confirmButton(){
            this.$emit('confirmButton')
        }
    },
    mounted(){
        new Modal(this.$refs.modal).show()
    },
    beforeUnmount(){
        document.querySelector('.modal-backdrop').remove()
    }
}
</script>