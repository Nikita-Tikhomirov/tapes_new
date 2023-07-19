<script setup lang="ts">
import type { TypeRequest } from "~/composables/types"

const props = defineProps<{
  index: number
  request: TypeRequest
}>()

const activeTab = useActiveTab()
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

function changePrint() {
  if (print.value.options[print.value.options.selectedIndex].getAttribute('data-color') === 'true') {
    props.request.print = 'true'
  } else {
    props.request.print = 'false'
  }
}
</script>

<template lang="pug">
.signup_form.row
  .col-md-12
    h5 Заявка № 
      span.requestCount  {{ index + 1 }}
  .col-md-12.auto-col-2
    .form-group(v-if="activeTab !== 'vipuskniki'")
      label.input_title Количество детских лент
      p(style="font-size:14px; margin-bottom:6px" v-if="activeTab === 'award'") Ширина 8 см, длина 150 см
      input.form-control(type="number" placeholder="10" v-model="request.childCount" min="0")

    .form-group(:class="{ 'order' : activeTab === 'award' }")
      label.input_title(v-if="activeTab === 'vipuskniki'") Количество
      label.input_title(v-else) Количество взрослых
      p(style="font-size:14px; margin-bottom:6px" v-if="activeTab === 'award'") Ширина 10 см, длина 190 см +-1 см
      input.form-control(type="number" placeholder="10" v-model="request.adultCount" min="0")

  .form-group.col-md-12
    label.input_title Номер шаблона
    select.niceselect.gender-select.templateSelect(v-model="request.template")
      option(value="1" selected) 1
      option(value="2") 2
      option(value="3") 3
      option(value="4") 4
      option(value="5") 5
      option(value="6") 6

  .col-md-12.auto-col-2
    .form-group
      label.input_title Цвет ленты
      select.niceselect.gender-select(v-model="request.color")
        option(value="Темно-бежевый" selected) Темно-бежевый
        option(value="Золотистый") Золотистый
        option(value="Малиновый") Малиновый
        option(value="Темно-красный") Темно-красный
        option(value="Бордовый") Бордовый
        option(value="Ярко-синий") Ярко-синий
        option(value="Синий") Синий
        option(value="Бирюзовый") Бирюзовый
        option(value="Ярко-зеленый") Ярко-зеленый
        option(value="Изумрудный") Изумрудный
        option(value="Оранжевый") Оранжевый
        option(value="Бежевый") Бежевый
        option(value="Малиново-коралловый") Малиново-коралловый
        option(value="Красный") Красный
        option(value="Розовый") Розовый
        option(value="Белый") Белый
        option(value="Серебристый") Серебристый
        option(value="Голубой") Голубой
        option(value="Светло-сиреневый") Светло-сиреневый
        option(value="Фиолетовый") Фиолетовый
        option(value="Сиреневый") Сиреневый
        option(value="Темно-зеленый") Темно-зеленый
        option(value="Темно-синий") Темно-синий
        option(value="Три колор") Три колор
        option(value="Мятный") Мятный
        option(value="Персиковый") Персиковый
        option(value="Серый") Серый
        option(value="Бледно-розовый") Бледно-розовый

    .form-group
      label.input_title Цвет печати
      select.niceselect.gender-select(ref="print" @change="changePrint")
        option(value="Золото" selected data-color="false") Золото 
        option(value="Серебро" data-color="false") Серебро 
        option(value="Черный" data-color="false") Черный 
        option(value="Красный (матовый)" data-color="true") Красный (матовый)
        option(value="Красный (металлик)" data-color="true") Красный (металлик)
        option(value="Голубой (матовый)" data-color="true") Голубой (матовый)
        option(value="Синий (металлик)" data-color="true") Синий (металлик)
        option(value="Зеленый (матовый)" data-color="true") Зеленый (матовый)

  
  .form-group.col-md-12
    label.input_title(for="inputName") Дополнительно написать на ленте 
    p(style="font-size:14px; margin-bottom:6px") класс, школа, город и тд. Можно не указывать, если нет дополнительной информации
    textarea.form-control(
      placeholder="Дополнительная надпись на ленте"
      cols="30" rows="2" style="height:auto"
      v-model="request.text"
    )

  ListPeople(
    v-for="people in listPeople"
    :key="people.slug"
    :isChild="people.isChild"
    :title="people.title"
    :request="request"
    :slug="people.slug"
  )
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