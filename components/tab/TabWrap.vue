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

  if (tab.value === 'start') {
    if (!nextTab.value) {
      alert('Выберете для кого заказываете ленты')
      return
    }
    tab.value = nextTab.value
    return
  }

  if (tab.value === 'acs'){
    tab.value = 'delivery'
    return
  }

  if (tab.value === 'delivery') {
    let formData = ''
    
    requests.value.forEach((item, i) => {
      if (item.adultCount > 0 || item.childCount > 0) {
        formData += `Заявка №${i+1}:\n`

        if (item.adultCount > 0) formData += `Взрослые ленты: ${item.adultCount}\n`
        if (item.childCount > 0) formData += `Детские ленты: ${item.childCount}\n`

        formData += `Шаблон: ${item.template}\nЦвет ленты: ${item.color}\nЦвет печати: ${item.print}\n`

        if (item.text) formData += `Доп. надпись на ленте: ${item.text}\n`

        formData += listPeople(item.names.graduatesMale, item.isName, 'Выпускники')
        formData += listPeople(item.names.graduatesFemale, item.isName, 'Выпускницы')
        formData += listPeople(item.names.teacher, item.isName, 'Классный руководитель')
        formData += listPeople(item.names.firstTeacher, item.isName, 'Первый учитель')
        formData += listPeople(item.names.director, item.isName, 'Директор')
        formData += listPeople(item.names.caregiver, item.isName, 'Воспитатель')
        formData += listPeople(item.names.assistant, item.isName, 'Помошник воспитателя')
        formData += listPeople(item.names.juniorCaregiver, item.isName, 'Младший воспитатель')
        formData += listPeople(item.names.firstClassMale, item.isName, 'Первокласники')
        formData += listPeople(item.names.firstClassFemale, item.isName, 'Первокласницы')
        formData += listPeople(item.names.firstTeacher, item.isName, 'Первый учитель')
        formData += listPeople(item.names.awardAdult, item.isName, 'Взрослые наминации')
        formData += listPeople(item.names.awardChild, item.isName, 'Детские наминации')

        formData += '\n-------------------\n\n'
      }
    })
    
    let acs = ''
    selectedAcs.value.forEach(item => {
      if (item.count > 0) acs += `${item.title}: ${item.count}\n`
    })

    if (acs) {
      formData += `Аксессуары:\n ${acs}`
      formData += '\n-------------------\n\n'
    }

    let mailsText = ''
    if (mails.value.countStandart) mailsText += `Пригласительные "Стандарт": ${mails.value.countStandart}\n`
    if (mails.value.countEdit) mailsText += `Пригласительные с доп. текстом: ${mails.value.countEdit}\n`
    if (mails.value.countNames) mailsText += `Именные пригласительные: ${mails.value.countNames}\n`
    if (mails.value.editText) mailsText += `Доп. текст:\n${mails.value.editText}\n`
    if (mails.value.namesText) mailsText += `Список имен:\n${mails.value.namesText}\n`
    if (mails.value.date) mailsText += `Дата проведения: ${mails.value.date}\n`
    if (mails.value.place) mailsText += `Место проведения: ${mails.value.place}\n`

    if (mailsText) {
      formData += `${mailsText}`
      formData += '\n-------------------\n\n'
    }

    if (delivery.value === 'post') {
      formData += `Отправка: Почта россии`
      formData += '\n-------------------\n\n'
    } else if (delivery.value === 'sdek') {
      formData += `Отправка: СДЕК`
      formData += '\n-------------------\n\n'
    }

    formData += `Получатель:\n`
    formData += `${addressee.value.city}\n`
    formData += `${addressee.value.point}\n`
    formData += `${addressee.value.name}\n`
    formData += `${addressee.value.phone}\n`
    formData += `${addressee.value.vk}\n`
    if (addressee.value.text) formData += `Коментарий к заказу: ${addressee.value.text}\n`
    formData += '\n-------------------\n\n'

    if (fastPrint.value) {
      formData += `Экспресс печать: Да\n`
      formData += '\n-------------------\n\n'
    }

    formData += `Цена: ${totalPrice.value}`
    
    useFetch('https://tapes-wp.tihomirov.pro/mail.php', {
      method: 'POST',
      body: formData
    })
    tab.value = 'thanks'
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

function listPeople (item, isName, title) {
  if (item && item.length > 0) {
    if (!isName) return `${title}: ${item.length}\n`
    
    let string = `${title}:\n`
    for (let i = 0; i < item.length; i++) {
      string += `${item[i]}\n`
    }

    return string
  }

  return ''
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

    .next_button.text-right
      button.btn.thm_btn.red_btn.next_tab.gender-button.buttonsToStepWithAcs(@click="next" v-if="tab !== 'thanks'")
        span(v-if="tab !== 'delivery'") Дальше
        span(v-if="tab === 'delivery'") Заказать
        i.arrow_right(v-if="tab !== 'delivery'")
</template>