<template>
    <section>
        <div class="d-flex align-items-center ">
            <button v-if="hasHighlight" @click="goToSection(0)" class="ms-3 me-3" >Destaques</button>
            <button v-for="category in categories" @click="goToSection(category.id)" class="ms-3 me-3" :key="category.id">{{ category.name }}</button>
        </div>
    </section>
</template>

<script>
export default{
    name: 'ButtonsArea',
    props:{
        categories: {type: Array, required: true},
        hasHighlight: {type: Boolean, defaults: true},
    },
    methods:{
        goToSection(id){
            document.getElementById(`${id}`).scrollIntoView({behavior: 'smooth', block: 'start'})
        }
    }
}
</script>

<style scoped>
section{
    height: 81px;
    border-radius: 15px 15px 0px 0px;
    background-color: white;
    width: 100vw;   
    position: fixed;
    bottom: 0px;
    box-shadow: 0px -1px 30px 1px rgba(0, 0, 0, 0.25);
}

section > div{    
    height: 100%;
    width: 100vw;
    overflow-x: auto;
}

button{
    background: var(--main-color);
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    border: none;
}

</style>