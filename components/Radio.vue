<script setup lang="ts">
defineProps<{
  active: string
  title: string
  subtitle?: string
}>()
</script>

<template>
<div class="customRadioWrap" :class="{ 'active' : active} ">
  <div class="customRadio"></div>
  <div class="customRadioText-wrap">
    <span>{{ title }}</span>
    <span v-if="subtitle" v-html="subtitle"></span>
  </div>
</div>
</template>