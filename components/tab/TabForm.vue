<script setup lang="ts">
defineProps<{
  request: number
}>()

const activeTab = useActiveTab()
const isPriceColor = usePriceColor()
const isPricePrint = usePricePrint()

const listPeople = computed(()=> {
  if (activeTab.value === 'vipuskniki' || activeTab.value === 'school') {
    return [
      {isChild: true, title: 'Список выпускников'},
      {isChild: true, title: 'Список выпускниц'},
      {isChild: false, title: 'Классный руководитель'},
      {isChild: false, title: 'Первый учитель'},
      {isChild: false, title: 'Директор'},
    ]
  } else if (activeTab.value === 'todlers') {
    return [
      {isChild: true, title: 'Список выпускников'},
      {isChild: true, title: 'Список выпускниц'},
      {isChild: false, title: 'Воспитатель'},
      {isChild: false, title: 'Помошник воспитателя'},
      {isChild: false, title: 'Младший воспитатель'},
    ]
  } else if (activeTab.value === 'firstclass') {
    return [
      {isChild: true, title: 'Список первоклассников'},
      {isChild: true, title: 'Список первоклассниц'},
      {isChild: false, title: 'Первый учитель'},
    ]
  }
})

const color = ref()
const print = ref()

const AllAdultRequst = ref(0)
const AllChildRequst = ref(0)

function add (isChild:boolean) {
  if (isChild && activeTab.value !== 'vipuskniki') AllChildRequst.value++
  else AllAdultRequst.value++
}

function remove (isChild:boolean) {
  if (isChild && activeTab.value !== 'vipuskniki') AllChildRequst.value--
  else AllAdultRequst.value--
}

function changeColor() {
  if (color.value.options[color.value.options.selectedIndex].getAttribute('data-color') === 'true') {
    isPriceColor.value = true
  } else {
    isPriceColor.value = false
  }
}
function changePrint() {
  if (print.value.options[color.value.options.selectedIndex].getAttribute('data-color') === 'true') {
    isPricePrint.value = true
  } else {
    isPricePrint.value = false
  }
}
</script>

<template>
<div class="signup_form row">
  <div class="col-md-12">
    <h5>Заявка № <span class="requestCount">{{ request }}</span></h5>
  </div>

  <div class="form-group col-md-12" v-if="activeTab !== 'vipuskniki'">
    <label class="input_title">Количество детских лент</label>
    <input type="number" class="form-control" placeholder="10" required :value="AllChildRequst" min="0">
  </div>

  <div class="form-group col-md-12">
    <label class="input_title" v-if="activeTab === 'vipuskniki'">Количество</label>
    <label class="input_title" v-else>Количество взрослых</label>
    <input type="number" class="form-control" placeholder="10" required :value="AllAdultRequst" min="0">
  </div>

  <div class="form-group col-md-12">
    <label class="input_title">Номер шаблона</label>
    <select class="niceselect gender-select templateSelect">
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
    </select>
  </div>

  <div class="form-group col-md-12">
    <label class="input_title">Цвет ленты</label>
    <select class="niceselect gender-select colorSelect" ref="color" @change="changeColor">
      <option value="Бордо" selected data-color="false">Не Цветная</option>
      <option value="Золото" data-color="true">Цветная</option>
    </select>
  </div>

  <div class="form-group col-md-12">
    <label class="input_title">Цвет печати</label>
    <select class="niceselect gender-select printColor" ref="print" @change="changePrint">
      <option value="Золото" selected data-color="false">Не Цветная</option>
      <option value="Бордо" data-color="true">Цветная</option>
    </select>
  </div>

  <div class="form-group col-md-12">
    <label class="input_title" for="inputName">Дополнительно написать на ленте
      <span>класс, школа, город и тд. Можно не указывать</span>
    </label>
    <textarea class="form-control" id="inputName" placeholder="Дополнительно написать на ленте"
      required value="" cols="30" rows="2" style="height:auto"></textarea>
  </div>

  <ListPeople
    v-for="people in listPeople"
    :isChild="people.isChild"
    :title="people.title"
    @add="add(people.isChild)"
    @remove="remove(people.isChild)"
  ></ListPeople>

</div>
</template>