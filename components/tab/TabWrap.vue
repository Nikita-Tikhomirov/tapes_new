<script setup lang="ts">
const tab = useActiveTab()
const nextTab = useNextTab()
const requests = useRequests()

const error = ref(false)

function isError() {
  requests.value.forEach(el => {
    if (el.isName && (el.names.child < el.childCount || el.names.adult < el.adultCount)) {
      error.value = true
    }
  })  
}

const title = computed(() => {
  if (tab.value === 'start') return 'Для кого <span>заказываем ленты</span>'
  else if (tab.value === 'acs') return 'Дополнительные <span>товары</span>'
  else if (tab.value === 'delivery') return '<span>Заказать</span>'
  else if (tab.value === 'award') return 'Наградные <span>ленты</span>'
  else return 'Выпускные <span>ленты</span>'
})

const subtitle = computed(() => {
  if (tab.value === 'vipuskniki') return 'Выпускники школ, колледжей и т.д.'
  else if (tab.value === 'school') return 'Для начальной школы'
  else if (tab.value === 'todlers') return 'Для детского сада'
  else if (tab.value === 'firstclass') return 'Первоклассникам'
  else if (tab.value === 'acs') return 'Описание для допов'
  else if (tab.value === 'award') return 'Для мероприятий, праздников'
})

function next() {
  error.value = false

  if (!nextTab.value) {
    alert('Выберете для кого заказываете ленты')
    return 
  }

  if (tab.value !== 'start') isError()
  
  if (!error.value) {
    if (tab.value === 'start') tab.value = nextTab.value
    else if (tab.value === 'acs') tab.value = 'delivery'
    else if (tab.value !== 'delivery') tab.value = 'acs'
    return
  }

  alert('Имен добавлено меньше чем лент')
}
</script>

<template lang="pug">
.tab-content
  .formify_box
    h4.form_title(v-html="title")
    h3.form_subtitle(v-if="subtitle") {{ subtitle }}

    slot

    .next_button.text-right
      button.btn.thm_btn.red_btn.next_tab.gender-button.buttonsToStepWithAcs(@click="next")
        span(v-if="tab !== 'delivery'") Дальше
        span(v-if="tab === 'delivery'") Заказать 
        i.arrow_right(v-if="tab !== 'delivery'")
</template>