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

function remove(index:number) {
  props.request.names[props.slug] = props.request.names[props.slug].filter((el, i) => i !== index)
  if (isChildCounter.value) {
    props.request.namesCount.child--
  } else {
    props.request.namesCount.adult--
  }
}
</script>

<template lang="pug">
.form-group.col-md-12.mb-4
  label.input_title {{ title }}
  .mansList
    .manListItems
      .manListItemWrap(v-for="(name, i) in props.request.names[slug]" :key="i")
        .manListItemCounter {{ i+1 }})
        input.form-control(type="text" v-model="props.request.names[slug][i]")
        .manListItemMinus(@click="remove(i)")
  
    .mansListAddBtn(@click="add")
      span Добавить
      span
</template>