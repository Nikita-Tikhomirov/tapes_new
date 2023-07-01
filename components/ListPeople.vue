<script setup lang="ts">
const props = defineProps<{
  title: string
  isChild?: boolean,
}>()

const emits = defineEmits<{
  add: []
  remove: []
}>()

const activeTab = useActiveTab()

const adult = useAllAdult()
const child = useAllChild()

const countPeople = ref<number>(0)

function add() {
  countPeople.value++
  emits('add')

  if (props.isChild && activeTab.value !== 'vipuskniki') child.value++
  else adult.value++
}

function remove() {
  countPeople.value--
  emits('remove')

  if (props.isChild && activeTab.value !== 'vipuskniki') child.value--
  else adult.value--
}
</script>

<template>
<div class="form-group col-md-12 mb-4">
  <label class="input_title" for="inputName">{{ title }}</label>
  <input type="hidden" name="mansList">
  <div class="mansList">
    <div class="manListItems">
      <div class="manListItemWrap" v-for="i in countPeople">
        <div class="manListItemCounter">{{ i }})</div>
        <div class="manListItem" contenteditable="true"></div>
        <div class="manListItemMinus" @click="remove"></div>
      </div>
    </div>
    <div class="mansListAddBtn" @click="add">
      <span>Добавить</span>
      <span></span>
    </div>
  </div>
</div>
</template>