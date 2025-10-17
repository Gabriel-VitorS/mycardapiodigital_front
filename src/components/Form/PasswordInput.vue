<script lang="ts" setup>
import { useField } from 'vee-validate'
import { ref, toRef } from 'vue'

const type = ref('password')

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String , default: '' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const nameRef = toRef(props, 'name')
const { value, errorMessage, } = useField(nameRef)

const changeType = () => {
    type.value = type.value === 'password' ? 'text' : 'password'
}

</script>
<template>
    <label v-if="label" class="form-label">
        {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>

    <div class="input-group">
        <input :type="type" :id="name" v-model="value" :name="name" class="form-control" :placeholder="placeholder" :class="{'is-invalid': errorMessage}"/>
        <div class="input-group-text" @click="changeType" role="button">
            <i v-if="type === 'password'" class="bi bi-eye"></i>
            <i v-else class="bi bi-eye-slash"></i>
        </div>

    </div>

    <div v-if="errorMessage"  class="invalid-feedback"> {{ errorMessage }} </div>
</template>