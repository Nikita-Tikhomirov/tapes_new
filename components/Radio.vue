<script setup lang="ts">
defineProps<{
  active: boolean
  title: string
  subtitle?: string
}>()
</script>

<template lang="pug">
.customRadioWrap(:class="{ 'active' : active}")
  .customRadio
  .customRadioText-wrap
    span {{ title }}
    span(v-if="subtitle" v-html="subtitle")
</template>