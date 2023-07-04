<script setup lang="ts">
const props = defineProps<{
  active: boolean
  text: string
  step: string
}>()

const emits = defineEmits<{
  back: []
}>()

function inBack() {
  if (props.active) emits('back')
}
</script>

<template lang="pug">
li.nav-item(@click="inBack")
  span.nav-link.show(:class="{'active':active}")
    span {{ step }}
    | {{ text }}
</template>

<style scoped>
.nav-link {
  cursor: pointer;
}

.nav-item:first-child .nav-link::after,
.nav-item:first-child .nav-link::before {
  content: none !important
}
</style>