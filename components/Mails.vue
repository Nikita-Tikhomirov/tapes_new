<script setup lang="ts">
const mails = useMails()
</script>

<template lang="pug">
div
  .form-group.col-md-12.mail-counter
    div
      label.input_title Пригласительные "Стандарт"
      p(style="font-size:14px") Вы их заполняете сами (не именные)
    InputCounter(
      @remove="mails.countStandart--"
      @add="mails.countStandart++"
      v-model="mails.countStandart"
    )
  .form-group.col-md-12
    .mail-counter
      div
        label.input_title Пригласительные с дополнительным общим текстом
        p(style="font-size:14px") (не именные)
      InputCounter(
        @remove="mails.countEdit--"
        @add="mails.countEdit++"
        v-model="mails.countEdit"
      )
    div
      p(style="font-size:14px; margin-bottom:6px") Если вы хотите добавить дату или место, то введите сюда текст
      textarea.form-control.textToMail(placeholder="Текст" cols="10" rows="4" v-model='mails.text')

  .form-group.col-md-12
    .mail-counter
      label.input_title Пригласительные именные
      InputCounter(
        @remove="mails.countNames--"
        @add="mails.countNames++"
        v-model="mails.countNames"
      )
    div
      p(style="font-size:14px; margin-bottom:6px") Перечислите имена отдельно
      textarea.form-control.textToMail(placeholder="Уважаемый/Уважаемая ФИО" cols="10" rows="4" v-model='mails.text')
      input.form-control.textToMail(placeholder="Дата")
      input.form-control.textToMail(placeholder="Место проведения")
</template>