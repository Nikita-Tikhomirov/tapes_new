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
      {isChild: true, title: 'Список выпускников', countTitle: 'Выпускники', slug: 'graduatesMale'},
      {isChild: true, title: 'Список выпускниц', countTitle: 'Выпускницы', slug: 'graduatesFemale'},
      {isChild: false, title: 'Классный руководитель', slug: 'teacher'},
      {isChild: false, title: 'Первый учитель', slug: 'firstTeacher'},
      {isChild: false, title: 'Директор', slug: 'director'},
    ]
  } else if (activeTab.value === 'todlers') {
    return [
      {isChild: true, title: 'Список выпускников', countTitle: 'Выпускники', slug: 'graduatesMale'},
      {isChild: true, title: 'Список выпускниц', countTitle: 'Выпускницы', slug: 'graduatesFemale'},
      {isChild: false, title: 'Воспитатель', slug: 'caregiver'},
      {isChild: false, title: 'Помошник воспитателя', slug: 'assistant'},
      {isChild: false, title: 'Младший воспитатель', slug: 'juniorCaregiver'},
    ]
  } else if (activeTab.value === 'firstclass') {
    return [
      {isChild: true, title: 'Список первоклассников', countTitle: 'Первокласники', slug: 'graduatesMale'},
      {isChild: true, title: 'Список первоклассниц', countTitle: 'Первокласницы', slug: 'graduatesFemale'},
      {isChild: false, title: 'Первый учитель', slug: 'firstTeacher'},
    ]
  } else if (activeTab.value === 'award') {
    return [
      {isChild: false, title: 'Список взрослых наминаций', slug: 'awardAdult'},
      {isChild: true, title: 'Список детских наминаций', slug: 'awardChild'}
    ]
  }
})
</script>

<template lang="pug">
.signup_form.row
  .col-md-12
    h5 Заявка № 
      span.requestCount  {{ index + 1 }}
  .col-md-12.auto-col-2
    inputEL(
      v-if="activeTab !== 'vipuskniki'"
      type="number"
      placeholder="0"
      title="Количество детских лент"
      subtitle="Ширина 8 см, длина 150 см"
      v-model="request.childCount"
    )

    inputEL(
      :class="{ 'order' : activeTab === 'award' }"
      type="number"
      placeholder="0"
      :title="activeTab === 'vipuskniki' ? 'Количество' : 'Количество взрослых'"
      :subtitle="activeTab === 'vipuskniki' ? 'Общее количество лент в заказе, включая учителей' : 'Ширина 10 см, длина 190 см +-1 см'"
      v-model="request.adultCount"
    )

  .form-group.col-md-12
    label.input_title Номер шаблона
    select.niceselect.templateSelect(v-model="request.template")
      option(value="1" selected) 1
      option(value="2") 2
      option(value="3") 3
      option(value="4") 4
      option(value="5") 5
      option(value="6") 6

  .col-md-12.auto-col-2
    .form-group
      label.input_title Цвет ленты
      select.niceselect(v-model="request.color")
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
      select.niceselect(v-model="request.print")
        option(value="Золото" selected data-color="false") Золото 
        option(value="Серебро" data-color="false") Серебро 
        option(value="Черный" data-color="false") Черный 
        option(value="Красный (матовый)" data-color="true") Красный (матовый)
        option(value="Красный (металлик)" data-color="true") Красный (металлик)
        option(value="Голубой (матовый)" data-color="true") Голубой (матовый)
        option(value="Синий (металлик)" data-color="true") Синий (металлик)
        option(value="Зеленый (матовый)" data-color="true") Зеленый (матовый)

  inputEL.col-md-12(
    style="margin-bottom: 24px"
    type="textarea"
    placeholder="Дополнительная надпись на ленте"
    title="Дополнительно написать на ленте"
    :subtitle="activeTab !== 'award' ? 'класс, школа, город и тд. Можно не указывать, если нет дополнительной информации' : 'Надписи, которые будут на всех лентах под номинацией (Название конкурса, дата и т.д)'"
    v-model="request.text"
  )

  Radio(
    v-if="activeTab !== 'award'"
    :active="request.isName"
    :title="activeTab === 'award' ? 'Указать наминации' : 'Именные ленты'"
    @click="request.isName = !request.isName"
  )
  Radio(
    v-if="activeTab !== 'award'"
    style="margin-left: 24px"
    :active="!request.isName"
    title="Не именные ленты"
    @click="request.isName = !request.isName"
  )

  template(v-if="request.isName || activeTab === 'award'")
    ListPeople(
      v-for="people in listPeople"
      :key="people.slug"
      :isChild="people.isChild"
      :title="people.title"
      :request="request"
      :slug="people.slug"
    )
  
  template(v-else-if="activeTab !== 'award'")
    ListPeopleCount(
      v-for="people in listPeople"
      :key="people.slug"
      :isChild="people.isChild"
      :title="people.countTitle ? people.countTitle : people.title"
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