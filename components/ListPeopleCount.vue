<script setup lang="ts">
import type { TypeRequest } from "~/composables/types"

const props = defineProps<{
  title: string
  isChild: boolean
  request: TypeRequest
  slug: string
}>()

const activeTab = useActiveTab()

const isChildCounter = computed(()=> props.isChild && activeTab.value !== 'vipuskniki')

function add() {
  if (!props.request.names[props.slug]) props.request.names[props.slug] = []
  
  if (isChildCounter.value) {
    if (props.request.namesCount.child < props.request.childCount) props.request.namesCount.child++, props.request.names[props.slug].push('')
  } else {
    if (props.request.namesCount.adult < props.request.adultCount) props.request.namesCount.adult++, props.request.names[props.slug].push('')
  }
}

function remove() {
  props.request.names[props.slug].pop()

  if (isChildCounter.value) {
    props.request.namesCount.child--
  } else {
    props.request.namesCount.adult--
  }
}
</script>

<template lang="pug">
.form-group.col-md-12.mail-counter
  .input_title {{ title }}
  InputCounter(
    @remove="remove"
    @add="add"
    :modelValue="request.names[props.slug] ? request.names[props.slug].length : 0"
    readonly
  )
</template>