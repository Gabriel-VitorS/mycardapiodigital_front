<template>

    <div class="col-lg-6">
        <label class="form-label">Selecione uma imagem para a logo:</label>
        <input ref="inputImage" class="form-control" @change="changeInput" accept="image/png, image/jpeg, image/jpg" type="file" >
    </div>
    <div class="col-lg-6">
        <img v-if="imgCropped" :src="imgCropped" class="mt-2 logoImg" width="100" height="100"  />
        <img v-if="url_image && imgCropped == null" :src="`${this.url_image}`" class="mt-2 logoImg" width="100" height="100"  />
    </div>

    <input type="file" className="d-none" name="logo_image"  ref="imageFile" />

    <div ref="modalCrop" data-bs-backdrop="static" data-bs-keyboard="false" class="modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">

            <div class="modal-content">
                <div class="modal-body">
                    <Cropper 
                        ref="cropper"
                        :src="imgToCropp"
                        :stencil-component="CircleStencil"
                        :stencil-props="{
                            aspectRatio: 4/4
                        }"
                        class="cropper" 
                        />
                </div>
                <div class="modal-footer">
                    <button type="button" data-bs-dismiss="modal" @click="clearInput" class="btn btn-secondary">Cancelar</button>
                    <button type="button" @click="cropImage" data-bs-dismiss="modal" class="btn btn-primary">Salvar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Cropper, CircleStencil} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { Modal } from 'bootstrap'
export default{
    name: 'CropImageLogo',
    props:{
        url_image: {type: String, required: false}
    },
    data(){
        return{
            imgToCropp: '',
            imgCropped: null,
            CircleStencil
        }
    },
    components:{Cropper},
    methods:{
        clearInput(){
            let input = this.$refs.inputImage
            input.value = ''
        },
        cropImage(){
            const {canvas} = this.$refs.cropper.getResult()
            new Modal(this.$refs.modalCrop).dispose()
            this.imgCropped = canvas.toDataURL()
            canvas.toBlob( (blob) => {
                const file = new File( [ blob ], "mycanvas.png" ,{ lastModified: new Date().getTime(), type: 'image/png' });
                const dT = new DataTransfer();
                dT.items.add( file );
                this.$refs.imageFile.files = dT.files;
            } );

            
        },
        changeInput(event){
            if(event.target.files[0]){
                this.imgToCropp = URL.createObjectURL(event.target.files[0])

                new Modal(this.$refs.modalCrop).show()
            }
        }
    }
}
</script>

<style>
.cropper {
	height: 500px;
	width: 500px;
	background: #DDD;
}
.logoImg{
    border-radius: 30px;    
}
</style>