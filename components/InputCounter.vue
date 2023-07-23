<script setup lang="ts">
const props = defineProps<{
  type: string
  placeholder: string
  title: string
  subtitle?: string
  modelValue: string
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value:string]
  'remove': []
  'add': []
}>()

function updateValue(e:Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template lang="pug">
.inputCounter
  .inputCounter__change(@click="emit('remove')") -
  input.inputCounter__input.form-control(
    type="number"
    min="0"
    placeholder="0"
    :value="modelValue"
    :readonly="readonly"
    @input="updateValue"
  )
  .inputCounter__change(@click="emit('add')") +
</template>

<style scoped lang="stylus">
.inputCounter
  display flex
  align-items center
  justify-content space-between

  &__input
    width 100%
    height 30px
    margin-left 10px
    margin-right 10px

    &[readonly]:focus
      outline none
      box-shadow none
      border-color: transparent

  &__change
    display flex
    align-items center
    justify-content center
    text-align center
    min-width 30px
    width 30px
    height 30px
    color #fff
    background #0055fb
    font-size 20px
    line-height 1
    transition 0.3s
    cursor pointer

    &:hover
      background #f7345e
</style>
