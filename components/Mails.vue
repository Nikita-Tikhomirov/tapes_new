<script setup lang="ts">
const mailsPrices = useMailsPrices()
const mailsDiscount = useMailsDiscount()
const mailsPriceEdit = useMailsPriceEdit()
const mailsPriceName = useMailsPriceName()
const mails = useMails()

function add(type:string) {
  if (type === 'standart') {
    mails.value.standart.count++
    const onePrice = selectOnePrice(mails.value.standart.count, mailsPrices.value, mailsDiscount.value)
    mails.value.standart.price = onePrice
  }

  if (type === 'edit') {
    mails.value.edit.count++
    const onePrice = selectOnePrice(mails.value.edit.count, mailsPrices.value, mailsDiscount.value)
    mails.value.edit.price = onePrice + mailsPriceEdit.value
  }

  if (type === 'names') {
    mails.value.names.count++
    const onePrice = selectOnePrice(mails.value.names.count, mailsPrices.value, mailsDiscount.value)
    mails.value.names.price = onePrice + mailsPriceName.value
  }
}

function remove(type:string) {
  if (type === 'standart') {
    mails.value.standart.count--
    const onePrice = selectOnePrice(mails.value.standart.count, mailsPrices.value, mailsDiscount.value)
    mails.value.standart.price = onePrice
  }

  if (type === 'edit') {
    mails.value.edit.count--
    const onePrice = selectOnePrice(mails.value.edit.count, mailsPrices.value, mailsDiscount.value)
    mails.value.edit.price = onePrice + mailsPriceEdit.value
  }

  if (type === 'names') {
    mails.value.names.count--
    const onePrice = selectOnePrice(mails.value.names.count, mailsPrices.value, mailsDiscount.value)
    mails.value.names.price = onePrice + mailsPriceName.value
  }
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
        @remove="remove('standart')"
        @add="add('standart')"
        v-model="mails.standart.count"
      )
    
    .form-group.mail-counter
      label.input_title На выпускной
      InputCounter(
        @remove="remove('standart')"
        @add="add('standart')"
        v-model="mails.standart.count"
      )
  .form-group
    div(style="margin:32px 0 16px")
      label.input_title Пригласительные с дополнительным общим текстом
      p(style="font-size:14px") (не именные)

    .form-group.mail-counter
      label.input_title На последний звонок
      InputCounter(
        @remove="remove('edit')"
        @add="add('edit')"
        v-model="mails.edit.count"
      )
    
    .form-group.mail-counter
      label.input_title На выпускной
      InputCounter(
        @remove="remove('edit')"
        @add="add('edit')"
        v-model="mails.edit.count"
      )
    div
      p(style="font-size:14px; margin:24px 0 6px") Если вы хотите добавить дату или место, то введите сюда текст
      textarea.form-control.textToMail(placeholder="Текст" rows="6" v-model='mails.editText')

  .form-group
    .mail-counter
      label.input_title Пригласительные именные
      InputCounter(
        @remove="remove('names')"
        @add="add('names')"
        v-model="mails.names.count"
      )
    div
      p(style="font-size:14px; margin-bottom:6px") Перечислите имена отдельно
      textarea.form-control.textToMail(placeholder="Уважаемый/Уважаемая ФИО" rows="6" v-model='mails.namesText')
      input.form-control.textToMail(placeholder="Дата" v-model="mails.date")
      input.form-control.textToMail(placeholder="Место проведения" v-model="mails.place")
</template>