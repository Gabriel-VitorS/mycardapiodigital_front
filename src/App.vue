<template>  
  <router-view> </router-view>
</template>

<script>


export default {
  name: 'App',
}
</script>
<style>
main{
  height: 100vh;
}

body {
  position: fixed;
  width: 100vw;
  /* prevent overscroll bounce*/
  
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  /* iOS velocity scrolling */
}
</style>
