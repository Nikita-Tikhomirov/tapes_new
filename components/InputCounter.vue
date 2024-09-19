<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number
  numbers?: boolean
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value:string]
  'update': [value:string]
  'remove': []
  'add': [value:number]
}>()

function updateValue(e:Event) { 
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function remove(value) {
  if (props.modelValue > '0') emit('remove', value)
}

function add(value) {
  emit('add', value)
}
</script>

<template lang="pug">
.inputCounter

  template(v-if="numbers")
    .inputCounter__change(@click="remove(5)") -5
    .inputCounter__change(@click="remove(1)") -1
  template(v-else)
    .inputCounter__change(@click="remove(1)") -
  input.inputCounter__input.form-control(
    type="number"
    min="0"
    placeholder="0"
    :value="modelValue"
    :readonly="readonly"
    @input="updateValue"
  )
  template(v-if="numbers")
    .inputCounter__change(@click="add(1)") +1
    .inputCounter__change(@click="add(5)") +5
  template(v-else)
    .inputCounter__change(@click="add(1)") +
</template>

<style scoped lang="stylus">
.inputCounter
  display flex
  align-items center
  justify-content space-between
  gap 6px

  &__input
    width 100%
    height 30px

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
    font-size 16px
    line-height 1
    transition 0.3s
    cursor pointer

    &:hover
      background #f7345e
</style>
