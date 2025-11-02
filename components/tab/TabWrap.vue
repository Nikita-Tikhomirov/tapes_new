<script setup lang="ts">
const mails = useMails()
const tab = useActiveTab()
const nextTab = useNextTab()
const tabsDesc = useTabsDesc()
const requests = useRequests()
const delivery = useDelivery()
const addressee = useAddressee()
const fastPrint = useFastPrint()
const totalPrice = useTotalPrice()
const selectedAcs = useSelectedAcs()

const trueText = useTrueText()
const trueText2 = useTrueText2()

const error = ref(false)
const isTrue = ref(false)
const isTrue2 = ref(false)

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
  if (tab.value === 'vipuskniki') return tabsDesc.value.vipuskniki
  else if (tab.value === 'school') return tabsDesc.value.school
  else if (tab.value === 'todlers') return tabsDesc.value.todlers
  else if (tab.value === 'firstclass') return tabsDesc.value.firstclass
  else if (tab.value === 'acs') return tabsDesc.value.acs
  else if (tab.value === 'award') return tabsDesc.value.award
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

    if (!isTrue.value || !isTrue2.value) {
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
      :subtitle="trueText"
      @click="isTrue = !isTrue"
    )
    Radio(
      v-if="showIsTrue"
      :active="isTrue2"
      title=""
      :subtitle="trueText2"
      @click="isTrue2 = !isTrue2"
    )

    .next_button.text-right(v-if="tab !== 'start' && tab !== 'delivery'")
      button.btn.thm_btn.red_btn.next_tab.gender-button.buttonsToStepWithAcs(
        v-if="tab !== 'thanks'"
        @click="next"
      )
        span(v-if="tab !== 'delivery'") Дальше
        span(v-if="tab === 'delivery'") Заказать
        i.arrow_right(v-if="tab !== 'delivery'")
</template>