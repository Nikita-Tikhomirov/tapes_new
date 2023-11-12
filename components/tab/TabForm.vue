<script setup lang="ts">
import type { TypeRequest } from "~/composables/types"

const props = defineProps<{
  index: number
  request: TypeRequest
}>()

const colors = useColors()
const print = usePrint()

const activeTab = useActiveTab()

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
      {isChild: true, title: 'Список первоклассников', countTitle: 'Первокласники', slug: 'firstClassMale'},
      {isChild: true, title: 'Список первоклассниц', countTitle: 'Первокласницы', slug: 'firstClassFemale'},
      {isChild: false, title: 'Первый учитель', slug: 'firstTeacher'},
    ]
  } else if (activeTab.value === 'award') {
    return [
      {isChild: false, title: 'Список взрослых номинаций', slug: 'awardAdult'},
      {isChild: true, title: 'Список детских номинаций', slug: 'awardChild'}
    ]
  }
})

function selectPrint(e) {
  const selectOptionIndex = e.target.options.selectedIndex
  props.request.print.isPrice = e.target.options[selectOptionIndex].getAttribute('data-color')
}
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
    input.niceselect.templateSelect(type="text" v-model="request.template")

  .col-md-12.auto-col-2
    .form-group
      label.input_title Цвет ленты
      select.niceselect(v-model="request.color")
        option(
          v-for="color in colors"
          :value="color.color"
        ) {{ color.color }}

    .form-group
      label.input_title Цвет печати
      select.niceselect(v-model="request.print.name" @change="(e) => selectPrint(e)")
        option(
          v-for="color in print"
          :value="color.color"
          :data-color="`${color.price}`"
        ) {{ color.color }}

  inputEL.col-md-12(
    style="margin-bottom: 24px"
    type="textarea"
    placeholder="Дополнительная надпись на ленте"
    title="Дополнительно написать на ленте"
    :subtitle="activeTab !== 'award' ? 'Общая надпись на всех лентах. Вы можете указать класс, школу, город и тд. (можно не указывать, если нет дополнительной информации) ' : 'Общая надпись на всех лентах под номинацией (Название конкурса, дата и т.д)'"
    v-model="request.text"
  )

  Radio(
    v-if="activeTab !== 'award'"
    :active="request.isName"
    :title="activeTab === 'award' ? 'Указать номинации' : 'Именные ленты'"
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