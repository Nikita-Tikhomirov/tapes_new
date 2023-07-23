<script setup lang="ts">
defineProps<{
  active: boolean
  title: string
  subtitle?: string
}>()
</script>

<template lang="pug">
.customRadio(:class="{ 'active' : active}")
  .customRadio__checkbox
  .customRadio__text
    .customRadio__title {{ title }}
    .customRadio__subtitle(v-if="subtitle" v-html="subtitle")
</template>

<style scoped lang="stylus">
.customRadio
  cursor pointer
  display grid
  grid-template-columns 22px 1fr
  gap 10px

  &__checkbox
    display flex
    align-items center
    justify-content center
    width 22px
    height 22px
    background-color #fff
    border-radius 50%
    border 2px solid #0055fb
    transform translateY(4px)

    &:before
      content ''
      display block
      width 16px
      height 16px
      border-radius 50%
      background-color transparent
      transition 0.3s

      ^[0].active &
        background-color #0055fb

  &__title
    font-weight 600
    font-size 20px

  &__subtitle
    font-size: 14px
</style>