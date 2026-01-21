<script lang="ts" setup>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css'
import { ref, onMounted } from "vue";
import {Modal} from 'bootstrap'
import { Field} from 'vee-validate';

const cropper = ref<typeof Cropper|null>(null)
const imgResult = ref()
const imgToCrop = ref()
const modalElement = ref()
const inputElement = ref<HTMLInputElement>()

let modal: Modal

onMounted(()=>{
    modal = new Modal(modalElement.value, {keyboard: false})
})

function crop(){
    if(cropper.value == null)
        return

    const { canvas, } = cropper.value.getResult()

    imgResult.value = canvas.toDataURL()

    canvas.toBlob( (blob: string) => {
        const file = new File( [ blob ], "mycanvas.png" ,{ lastModified: new Date().getTime(), type: 'image/png' });
        const dT = new DataTransfer();
        dT.items.add( file );
        
        inputElement.value!.files = dT.files
        inputElement.value!.dispatchEvent(new Event('change', {bubbles: true}))
        
    } );

   
    modal.hide()
}

const onChange = (event: Event) =>{
    const inputFile = event.target as HTMLInputElement

    if(inputFile.files != null){
    
        const r = new FileReader()

        r.onload = () =>{
            imgToCrop.value = r.result
        }

        r.readAsDataURL(inputFile.files[0])
    }

    modal.show()

}

defineProps<{
    url_image: string
}>()

</script>

<template>

    <label class="form-label">Selecione uma imagem para a logo </label>

    <Field name="logo_image" class="d-none"  v-slot="{ handleChange, value }">
      <input type="file" ref="inputElement" v-bind="value" class="d-none"  @change="handleChange" />
    </Field>

    <input type="file" class="form-control" @change="onChange" accept="image/png, image/jpeg, image/jpg">

    <!-- Modal -->
    <div ref="modalElement" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <Cropper
                        class="cropper"
                        :src="imgToCrop"
                        :stencil-props="{
                            aspectRatio: 4/4
                        }"
                        ref="cropper"
                    />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="crop">Cortar</button>
                </div>
            </div>
        </div>
    </div>

    <img v-if="imgResult != null || $props.url_image != ''" :src="imgResult ?? $props.url_image" alt="" class="mt-3" style="border-radius: 8px;" width="100" height="100"> 

</template>

<style>
.cropper {
	height: 600px;
	width: 600px;
	background: #DDD;
}
</style>