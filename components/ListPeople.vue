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

onMounted(()=> {
  props.list[props.slug] = []
})

function add() {
  props.list[props.slug].push('')
  emits('add')
}

function remove(index:number) {
  props.list[props.slug] = props.list[props.slug].filter((el, i) => i !== index)
  emits('remove')
}
</script>

<template>
<div class="form-group col-md-12 mb-4">
  <label class="input_title">{{ title }}</label>
  <div class="mansList">
    <div class="manListItems">

      <div class="manListItemWrap" v-for="(name, i) in list[slug]" :key="i">
        <div class="manListItemCounter">{{ i+1 }})</div>
        <input type="text" class="form-control" v-model="list[slug][i]">
        <div class="manListItemMinus" @click="remove(i)"></div>
      </div>

    </div>
    <div class="mansListAddBtn" @click="add">
      <span>Добавить</span><span></span>
    </div>
  </div>
</div>
</template>