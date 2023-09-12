<template>
    <div class="cardapio_card cursorPointer" @click="click">
        
        <section class="infoArea">
            <div class="text-start">
                <span class="fs-5">{{name}}</span> 
            </div>
            <div>
                <strong>{{ valueProduct }}</strong>
            </div>
        </section>

        <section class="d-flex justify-content-center align-items-center" style="width: calc(100% - 200px);">
            <img :src="imageProduct" width="100" class="rounded" height="100" alt="">
        </section>
    </div>
</template>

<script>
export default{
    name: 'CardComponent',
    props:{
        name: {type: String, required: true},
        value: {type: Number, required: true},
        image: {type: String, required: true},
    },
    computed:{
        valueProduct(){
            return Number(this.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        },
        imageProduct(){
            return `${this.image}?lastmod=${new Date() / 1})`
        }
    },
    methods:{
        click(){ this.$emit('detailProduct')}
    }
}
</script>

<style scoped>
.cardapio_card{
    height: 130px;
    width: 330px;
    border-radius: 10px;
    box-shadow: 0px 3px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    margin-bottom: 20px;
}

.infoArea{
    width: 200px;
    padding: 10px;
}

.infoArea > .text-start{
    max-height: 75%;
    height: 75%;
}
</style>