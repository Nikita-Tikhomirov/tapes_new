<script setup lang="ts">
const props = defineProps<{
  type: string
  placeholder: string
  title: string
  subtitle?: string
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value:string]
}>()

function updateValue(e:Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template lang="pug">
label.form-group
  p.input_title {{ title }}
  p.input_subtitle(v-if="subtitle") {{ subtitle }}
  input.form-control(
    v-if="type !== 'textarea'"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateValue"
  )
  textarea.form-control(
    v-else
    style="height:auto"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateValue"
  )
</template>