<script setup lang="ts">
import type { TypeRequest } from "~/composables/types"

const props = defineProps<{
  index: number
  request: TypeRequest
}>()

const activeTab = useActiveTab()
const color = ref()
const print = ref()

const listPeople = computed(()=> {
  if (activeTab.value === 'vipuskniki' || activeTab.value === 'school') {
    return [
      {isChild: true, title: 'Список выпускников', slug: 'graduatesMale'},
      {isChild: true, title: 'Список выпускниц', slug: 'graduatesFemale'},
      {isChild: false, title: 'Классный руководитель', slug: 'teacher'},
      {isChild: false, title: 'Первый учитель', slug: 'firstTeacher'},
      {isChild: false, title: 'Директор', slug: 'director'},
    ]
  } else if (activeTab.value === 'todlers') {
    return [
      {isChild: true, title: 'Список выпускников', slug: 'graduatesMale'},
      {isChild: true, title: 'Список выпускниц', slug: 'graduatesFemale'},
      {isChild: false, title: 'Воспитатель', slug: 'caregiver'},
      {isChild: false, title: 'Помошник воспитателя', slug: 'assistant'},
      {isChild: false, title: 'Младший воспитатель', slug: 'juniorCaregiver'},
    ]
  } else if (activeTab.value === 'firstclass') {
    return [
      {isChild: true, title: 'Список первоклассников', slug: 'graduatesMale'},
      {isChild: true, title: 'Список первоклассниц', slug: 'graduatesFemale'},
      {isChild: false, title: 'Первый учитель', slug: 'firstTeacher'},
    ]
  } else if (activeTab.value === 'award') {
    return [
      {isChild: false, title: 'Список взрослых наминаций', slug: 'awardAdult'},
      {isChild: true, title: 'Список детских наминаций', slug: 'awardChild'}
    ]
  }
})

function add(isChild:boolean) {
  if (isChild && activeTab.value !== 'vipuskniki') props.request.childCount++
  else props.request.adultCount++
}

function remove(isChild:boolean) {
  if (isChild && activeTab.value !== 'vipuskniki') props.request.childCount--
  else props.request.adultCount--
}

function changeColor() {
  if (color.value.options[color.value.options.selectedIndex].getAttribute('data-color') === 'true') {
    props.request.color = 'true'
  } else {
    props.request.color = 'false'
  }
}

function changePrint() {
  if (print.value.options[print.value.options.selectedIndex].getAttribute('data-color') === 'true') {
    props.request.print = 'true'
  } else {
    props.request.print = 'false'
  }
}
</script>

<template>
<div class="signup_form row">
  <div class="col-md-12">
    <h5>Заявка № <span class="requestCount">{{ index + 1 }}</span></h5>
  </div>
  <div class="col-md-12 auto-col-2">
    <div class="form-group" v-if="activeTab !== 'vipuskniki'">
      <label class="input_title">Количество детских лент</label>
      <input type="number" class="form-control" placeholder="10" required v-model="request.childCount" min="0">
    </div>

    <div class="form-group" :class="{ 'order' : activeTab === 'award' }">
      <label class="input_title" v-if="activeTab === 'vipuskniki'">Количество</label>
      <label class="input_title" v-else>Количество взрослых</label>
      <input type="number" class="form-control" placeholder="10" required v-model="request.adultCount" min="0">
    </div>
  </div>
  <div class="form-group col-md-12">
    <label class="input_title">Номер шаблона</label>
    <select class="niceselect gender-select templateSelect" v-model="request.template">
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
    </select>
  </div>

  <div class="col-md-12 auto-col-2">
    <div class="form-group">
      <label class="input_title">Цвет ленты</label>
      <select class="niceselect gender-select" ref="color" @change="changeColor">
        <option value="Бордо" selected data-color="false">Не Цветная</option>
        <option value="Золото" data-color="true">Цветная</option>
      </select>
    </div>

    <div class="form-group">
      <label class="input_title">Цвет печати</label>
      <select class="niceselect gender-select" ref="print" @change="changePrint">
        <option value="Золото" selected data-color="false">Не Цветная</option>
        <option value="Бордо" data-color="true">Цветная</option>
      </select>
    </div>
  </div>

  <div class="form-group col-md-12">
    <label class="input_title" for="inputName">Дополнительно написать на ленте
      <span>класс, школа, город и тд. Можно не указывать</span>
    </label>
    <textarea
      class="form-control"
      placeholder="Дополнительная надпись на ленте"
      cols="30" rows="2" style="height:auto"
      v-model="request.text"
    ></textarea>
  </div>

  <ListPeople
    v-for="people in listPeople"
    :key="people.slug"
    :isChild="people.isChild"
    :title="people.title"
    :list="request.names"
    :slug="people.slug"
    @add="add(people.isChild)"
    @remove="remove(people.isChild)"
  ></ListPeople>

</div>
</template>

<style scoped>
.order {
  order: -1
}

.auto-col-2 {
  display: grid;
  column-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>