<script setup lang="ts">
const mails = useMails()
</script>

<template lang="pug">
div
  .form-group.col-md-12
    //- label.input_title Пригласительные письма
    //- input.form-control.mailsInput(type="number" placeholder="10" v-model="mails.count")
    //- textarea.form-control.textToMail(placeholder="Текст" cols="10" rows="4" v-model='mails.text')

  //- Radio(
  //-   :active="mails.type === 'standart'"
  //-   title='Пригласительные "Стандарт"'
  //-   @click="mails.type = 'standart'"
  //- )
  //- Radio(
  //-   :active="mails.type === 'edit'"
  //-   title='Пригласительные c изменениями'
  //-   @click="mails.type = 'edit'"
  //- )
  //- Radio(
  //-   :active="mails.type === 'names'"
  //-   title='Пригласительные именные'
  //-   @click="mails.type = 'names'"
  //- )

  .form-group.col-md-12.mail-counter
    div
      label.input_title Пригласительные "Стандарт"
      p(style="font-size:14px") Вы их заполняете сами (не именные)

    .dop__controls-wrap
      .dop__minus(@click="mails.countStandart--") -
      input.dop__counter.form-control(
        type="number"
        min="0"
        placeholder="0"
        v-model="mails.countStandart"
        @input=""
      )
      .dop__plus(@click="mails.countStandart++") +

  .form-group.col-md-12
    .mail-counter
      div
        label.input_title Пригласительные с дополнительным общим текстом
        p(style="font-size:14px") (не именные)
      .dop__controls-wrap
        .dop__minus(@click="mails.countEdit--") -
        input.dop__counter.form-control(
          type="number"
          min="0"
          placeholder="0"
          v-model="mails.countEdit"
          @input=""
        )
        .dop__plus(@click="mails.countEdit++") +
    div
      p(style="font-size:14px; margin-bottom:6px") Если вы хотите добавить дату или место, то введите сюда текст
      textarea.form-control.textToMail(placeholder="Текст" cols="10" rows="4" v-model='mails.text')

  .form-group.col-md-12
    .mail-counter
      label.input_title Пригласительные именные
      .dop__controls-wrap
        .dop__minus(@click="mails.countNames--") -
        input.dop__counter.form-control(
          type="number"
          min="0"
          placeholder="0"
          v-model="mails.countNames"
          @input=""
        )
        .dop__plus(@click="mails.countNames++") +
    div
      p(style="font-size:14px; margin-bottom:6px") Перечислите имена отдельно
      textarea.form-control.textToMail(placeholder="Уважаемый/Уважаемая ФИО" cols="10" rows="4" v-model='mails.text')
      input.form-control.textToMail(placeholder="Дата")
      input.form-control.textToMail(placeholder="Место проведения")
</template>