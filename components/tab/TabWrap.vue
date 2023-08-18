<script setup lang="ts">
const mails = useMails()
const tab = useActiveTab()
const nextTab = useNextTab()
const requests = useRequests()
const delivery = useDelivery()
const addressee = useAddressee()
const fastPrint = useFastPrint()
const totalPrice = useTotalPrice()
const selectedAcs = useSelectedAcs()

const error = ref(false)
const isTrue = ref(false)

const showIsTrue = computed(() => {
  if (tab.value !== 'delivery' && tab.value !== 'start' && tab.value !== 'acs' && tab.value !== 'thanks') { 
    return true
  }
  return false
})

function isError() {
  requests.value.forEach(el => {
    if ((el.childCount === 0 && el.adultCount === 0) || el.names.child < el.childCount || el.names.adult < el.adultCount) {
      error.value = true
    }
  })  
}

const title = computed(() => {
  if (tab.value === 'start') return 'Для кого <span>заказываем ленты</span>'
  else if (tab.value === 'acs') return 'Дополнительные <span>товары</span>'
  else if (tab.value === 'delivery') return '<span>Заказать</span>'
  else if (tab.value === 'award') return 'Наградные <span>ленты</span>'
  else if (tab.value === 'thanks') return 'Cпасибо за ваш заказ'
  else return 'Выпускные <span>ленты</span>'
})

const subtitle = computed(() => {
  if (tab.value === 'vipuskniki') return 'Выпускники школ, колледжей и т.д.'
  else if (tab.value === 'school') return 'Для начальной школы'
  else if (tab.value === 'todlers') return 'Для детского сада'
  else if (tab.value === 'firstclass') return 'Первоклассникам'
  else if (tab.value === 'acs') return 'Описание для допов'
  else if (tab.value === 'award') return 'Для мероприятий, праздников'
  else if (tab.value === 'thanks') return 'В ближайшее время наш менеджер свяжется с вами'
})

function next() {
  error.value = false

  if (tab.value === 'acs'){
    tab.value = 'delivery'
    return
  }

  if (showIsTrue) {
    isError()

    if (error.value) {
      alert('Имен добавлено меньше чем лент')
      return
    }

    if (!isTrue.value) {
      alert('Подвердите правильность данных в заказе')
      return
    }

    tab.value = 'acs'
    return
  }
}
</script>

<template lang="pug">
.tab-content
  .formify_box
    h4.form_title(v-html="title")
    h3.form_subtitle(v-if="subtitle") {{ subtitle }}

    slot

    Radio(
      v-if="showIsTrue"
      :active="isTrue"
      title="Все данные в заказе указаны верно"
      subtitle="Огромная просьба проверить правильность написания имён, наименование школы и т.д. так как мы копируем Ваши данные и вставляем в программу для печати"
      @click="isTrue = !isTrue"
    )

    .next_button.text-right(v-if="tab !== 'start' && tab !== 'delivery'")
      button.btn.thm_btn.red_btn.next_tab.gender-button.buttonsToStepWithAcs(@click="next" v-if="tab !== 'thanks'")
        span(v-if="tab !== 'delivery'") Дальше
        span(v-if="tab === 'delivery'") Заказать
        i.arrow_right(v-if="tab !== 'delivery'")
</template>