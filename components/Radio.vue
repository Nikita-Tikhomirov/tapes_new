<script setup lang="ts">
defineProps<{
  tab: string
  title: string
  subtitle?: string
}>()

const nextTab = useNextTab()
</script>

<template>
<div class="customRadioWrap" :class="{ 'active' : tab === nextTab } ">
  <div class="customRadio"></div>
  <div class="customRadioText-wrap">
    <span>{{ title }}</span>
    <span v-if="subtitle">{{ subtitle }}</span>
  </div>
</div>
</template>