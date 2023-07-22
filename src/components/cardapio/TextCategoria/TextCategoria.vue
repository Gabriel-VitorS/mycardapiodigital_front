<template>
    <div class="text-center" :id="id">
        <span class="fs-3">{{ text }}</span>
        <div>
            <i class="bi bi-caret-down-fill"></i>    
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'TextCategoria',
    props:{
        name: {type: String, required: true},
        id: {type: Number, required:true}
    },
    computed:{
        text(){
            return `${String(this.name)[0].toUpperCase()}${String(this.name).slice(1).toLowerCase()}`
        }
    }
}
</script>

<style scoped>
i{
    color: var(--main-color);
    margin-top: 5px;
    font-size: 21px;
}
</style>