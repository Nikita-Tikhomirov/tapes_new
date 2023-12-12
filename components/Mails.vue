<script setup lang="ts">
const mailsPrices = useMailsPrices()
const mailsDiscount = useMailsDiscount()
const mailsPriceEdit = useMailsPriceEdit()
const mailsPriceName = useMailsPriceName()
const mails = useMails()

function add(type:string) {
  if (type === 'standartLastCall' || type === 'standartFinal') {
    mails.value[type].count++
    const onePrice = selectOnePrice(mails.value[type].count, mailsPrices.value, mailsDiscount.value)
    mails.value[type].price = onePrice
  }

  if (type === 'editLastCall' || type === 'editFinal') {
    mails.value[type].count++
    const onePrice = selectOnePrice(mails.value[type].count, mailsPrices.value, mailsDiscount.value)
    mails.value[type].price = onePrice + mailsPriceEdit.value
  }

  if (type === 'namesLastCall' || type === 'namesFinal') {
    mails.value[type].count++
    const onePrice = selectOnePrice(mails.value[type].count, mailsPrices.value, mailsDiscount.value)
    mails.value[type].price = onePrice + mailsPriceName.value
  }
}

function remove(type:string) {
  if (type === 'standartLastCall' || type === 'standartFinal') {
    mails.value[type].count--
    const onePrice = selectOnePrice(mails.value[type].count, mailsPrices.value, mailsDiscount.value)
    mails.value[type].price = onePrice
  }

  if (type === 'editLastCall' || type === 'editFinal') {
    mails.value[type].count--
    const onePrice = selectOnePrice(mails.value[type].count, mailsPrices.value, mailsDiscount.value)
    mails.value[type].price = onePrice + mailsPriceEdit.value
  }

  if (type === 'namesLastCall' || type === 'namesFinal') {
    mails.value[type].count--
    const onePrice = selectOnePrice(mails.value[type].count, mailsPrices.value, mailsDiscount.value)
    mails.value[type].price = onePrice + mailsPriceName.value
  }
}

function update(type:string, value:string) {
  mails.value[type].count = +value
  const onePrice = selectOnePrice(mails.value[type].count, mailsPrices.value, mailsDiscount.value)

  if (type === 'standartLastCall' || type === 'standartFinal') mails.value[type].price = onePrice
  if (type === 'editLastCall' || type === 'editFinal')  mails.value[type].price = onePrice + mailsPriceEdit.value
  if (type === 'namesLastCall' || type === 'namesFinal') mails.value[type].price = onePrice + mailsPriceName.value
}
</script>

<template lang="pug">
div
  div
    div(style="margin-bottom:16px")
      label.input_title Пригласительные "Стандарт"
      p(style="font-size:14px") Вы их заполняете сами (не именные)

    .form-group.mail-counter
      label.input_title На последний звонок
      InputCounter(
        @remove="remove('standartLastCall')"
        @add="add('standartLastCall')"
        @update:modelValue="(value) => update('standartLastCall', value)"
        v-model="mails.standartLastCall.count"
      )
    
    .form-group.mail-counter
      label.input_title На выпускной
      InputCounter(
        @remove="remove('standartFinal')"
        @add="add('standartFinal')"
        @update:modelValue="(value) => update('standartFinal', value)"
        v-model="mails.standartFinal.count"
      )
  .form-group
    div(style="margin:32px 0 16px")
      label.input_title Пригласительные с дополнительным общим текстом
      p(style="font-size:14px") (не именные)

    .form-group.mail-counter
      label.input_title На последний звонок
      InputCounter(
        @remove="remove('editLastCall')"
        @add="add('editLastCall')"
        @update:modelValue="(value) => update('editLastCall', value)"
        v-model="mails.editLastCall.count"
      )
    
    .form-group.mail-counter
      label.input_title На выпускной
      InputCounter(
        @remove="remove('editFinal')"
        @add="add('editFinal')"
        @update:modelValue="(value) => update('editFinal', value)"
        v-model="mails.editFinal.count"
      )
    div
      p(style="font-size:14px; margin:24px 0 6px") Если вы хотите добавить дату или место, то введите сюда текст
      textarea.form-control.textToMail(placeholder="Текст" rows="6" v-model='mails.editText')

  .form-group
    label.input_title Пригласительные именные
  .form-group.mail-counter
    label.input_title На последний звонок
    InputCounter(
      @remove="remove('namesLastCall')"
      @add="add('namesLastCall')"
      @update:modelValue="(value) => update('namesLastCall', value)"
      v-model="mails.namesLastCall.count"
    )
  .form-group.mail-counter
    label.input_title На выпускной
    InputCounter(
      @remove="remove('namesFinal')"
      @add="add('namesFinal')"
      @update:modelValue="(value) => update('namesFinal', value)"
      v-model="mails.namesFinal.count"
    )
  .form-group
    p(style="font-size:14px; margin-bottom:6px") Перечислите имена отдельно
    textarea.form-control.textToMail(placeholder="Уважаемый/Уважаемая ФИО" rows="6" v-model='mails.namesText')
    input.form-control.textToMail(placeholder="Дата" v-model="mails.date")
    input.form-control.textToMail(placeholder="Место проведения" v-model="mails.place")
</template>