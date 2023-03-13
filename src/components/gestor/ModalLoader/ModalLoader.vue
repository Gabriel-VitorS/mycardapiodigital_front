<template>
    <div ref="modalLoader" class="modal" id="modalLoader" data-bs-backdrop="static" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered" style="justify-content: center;">
        <span class="spinner-border text-light" role="status" aria-hidden="true">
            <span class="visually-hidden">Loading...</span>
        </span>
      </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
    name: 'modalLoader',
    mounted(){
        const loader = new Modal(document.querySelector('#modalLoader'))
        loader.show()
    },
    beforeUnmount(){
        
        const loader = new Modal(document.querySelector('#modalLoader'))
        loader.dispose()
        document.querySelector('.modal-backdrop').remove()
    }
}
</script>