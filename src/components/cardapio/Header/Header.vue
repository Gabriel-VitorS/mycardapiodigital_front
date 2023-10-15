<template>
    <header style="margin-bottom: 50px;">
        <section :style="banner" class="banner"></section>

        <section class="d-flex justify-content-center position-relative" style="top: -50px; margin-bottom: -20px;">
            <img :src="logo" width="100" class="logo" height="100">
        </section>

        <section class="text-center">
            <span class="fs-1">{{ nameCompany }}</span>
        </section>
    </header>
</template>

<script>
export default{
    name: 'HeaderComponent',
    props: {
        urlBanner:{type: String, required: true},
        urlLogo: {type: String, required: true},
        nameCompany: {type: String, required: true}
    },
    computed:{
        banner(){
            return{'background-image': `url(${this.urlBanner}?lastmod=${new Date() / 1})`,}
        },
        logo(){
            return `${this.urlLogo}?lastmod=${new Date() / 1})`
        }
    }
}
</script>

<style scoped>
.banner{
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.logo{
    border-radius: 30px;
    background-color: var(--main-color);
}
</style>