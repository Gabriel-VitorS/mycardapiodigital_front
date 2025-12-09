<script setup lang="ts">
import ThemeProvider from './components/layout/ThemeProvider.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import AdminLayout from './components/layout/AdminLayout.vue';

const route = useRoute()

const isAdm = computed(()=> route.path.includes("gestor"))
</script>

<template>
  <ThemeProvider v-if="isAdm">
    <AdminLayout>
      <router-view />
    </AdminLayout>
  </ThemeProvider>

  <router-view v-else />
</template>

<style scoped></style>
