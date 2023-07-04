<script setup lang="ts">
const props = defineProps<{
  title: string
  isChild: boolean
  list: { [key: string]: string[] }
  slug: string
}>()

const emits = defineEmits<{
  add: []
  remove: []
}>()

function add() {
  if (!props.list[props.slug]) props.list[props.slug] = []
  props.list[props.slug].push('')
  emits('add')
}

function remove(index:number) {
  props.list[props.slug] = props.list[props.slug].filter((el, i) => i !== index)
  emits('remove')
}
</script>

<template lang="pug">
.form-group.col-md-12.mb-4
  label.input_title {{ title }}
  .mansList
    .manListItems
      .manListItemWrap(v-for="(name, i) in list[slug]" :key="i")
        .manListItemCounter {{ i+1 }})
        <input type="text" class="form-control" v-model="list[slug][i]">
        .manListItemMinus(@click="remove(i)")
  
    .mansListAddBtn(@click="add")
      span Добавить
      span
</template>