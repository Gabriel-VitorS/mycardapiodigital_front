<script lang="ts" setup>
import { useField } from 'vee-validate'
import { toRef, } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String , default: '' },
  disabled: { type: Boolean, default: false },
});

const nameRef = toRef(props, 'name')
const {value} = useField<boolean>(nameRef, undefined, {
  type: 'checkbox',
  initialValue: false,
})

</script>
<template>
    <div class="form-check form-switch">
      <label v-if="label" class="form-check-label">
        {{ label }} 
      </label>
      
      <input type="checkbox" :id="name" v-model="value" :name="name" class="form-check-input" />

    </div>

</template>