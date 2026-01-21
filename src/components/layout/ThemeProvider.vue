<script setup lang="ts">
import { ref, watch, provide, computed, onMounted } from 'vue'

const theme = ref('light')
const isDarkMode = computed(() => theme.value === 'dark')


watch(theme, () => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  localStorage.setItem('theme', theme.value)
})

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

provide('theme', {
  isDarkMode,
  toggleTheme,
})

onMounted(()=>{
  if(localStorage.getItem('theme') === null)
    localStorage.setItem('theme', 'light')
  else{
    document.documentElement.setAttribute('data-bs-theme', localStorage.getItem('theme')!)
    theme.value = localStorage.getItem('theme')!

  }
})

</script>

<script lang="ts">
import { inject } from 'vue'
import type {Ref} from 'vue'

interface UseThemeReturn {
  isDarkMode: Ref<boolean>
  toggleTheme: () => void
}

export function useTheme():UseThemeReturn {
  const theme: UseThemeReturn = inject('theme')!

  return theme
}
</script>

<template>
  <slot></slot>
</template>
