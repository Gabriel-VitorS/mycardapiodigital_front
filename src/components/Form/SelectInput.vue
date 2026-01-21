<script lang="ts" setup>
import { useField } from 'vee-validate'
import { toRef, } from 'vue'

interface IOptions {
  value: string;
  label: string;
}


const props = defineProps({
  options: {
    type: Array<IOptions>,
    required: false,
    default: () => [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date' },
      { value: 'elderberry', label: 'Elderberry' },
      { value: 'graphs', label: 'Graphs' },
    ],
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  required: { type: Boolean, default: false },
})

const nameRef = toRef(props, 'name')
const { value, errorMessage, } = useField(nameRef)

if(value.value === undefined) {
  value.value = ''
}

</script>
<template>
    <label v-if="label" class="form-label">
        {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>

    <select :name="name" :id="name" v-model="value" class="form-select" :class="{'is-invalid': errorMessage}">
        <option value="" disabled >Selecione uma opção</option>
        <option v-for="option in props.options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>

    <div v-if="errorMessage"  class="invalid-feedback">{{ errorMessage }}</div>
</template>