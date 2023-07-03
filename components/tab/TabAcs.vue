<script setup lang="ts">
// const {data} = await useFetch<any>('https://old.schmied.ru/wp-json/wp/v2/posts?_embed')

const mails = useMails()
</script>

<template lang="pug">
div
  .signup_form.row
    .dops-wrap.col-12

      //- Колокольчики

      AcsItem(
        :id="0"
        :prices="[75, 68, 64, 59, 54]"
        img="700-nw.jpg"
        title='Колокольчик "Красивый"'
      )
      AcsItem(
        :id="1"
        :prices="[100, 93, 89, 84, 79]"
        img="700-nw.jpg"
        title='Колокольчик "Лучший выпуск"'
      )
      AcsItem(
        :id="2"
        :prices="[55, 53, 50, 45, 42]"
        img="700-nw.jpg"
        title='Колокольчик "МАЙ"'
      )

      //- БАБОЧКИ

      AcsItem(
        :id="3"
        :prices="[260, 210, 190, 170, 150]"
        img="btfl.png"
        title='Бабочки "Элегант"'
      )
      AcsItem(
        :id="4"
        :prices="[350, 330, 310, 290, 270]"
        img="btfl.png"
        title='Бабочки "Выпускник"'
      )
      AcsItem(
        :id="5"
        :prices="[500, 480, 470, 450, 440]"
        img="btfl.png"
        title='Бабочки "Кашемир" Премиум'
      )

      //- БАНТЫ

      AcsItem(
        :id="6"
        :prices="[350]"
        img="bnt.png"
        title='Банты "ТОП"(Пара)'
      )
      AcsItem(
        :id="7"
        :prices="[400]"
        img="bnt.png"
        title='Банты "ВИП"(Пара)'
      )
      AcsItem(
        :id="8"
        :prices="[180]"
        img="bnt.png"
        title='Бант на заколке(за 1шт)'
      )

      //- БУТОНЬЕРКИ

      AcsItem(
        :id="9"
        :prices="[125]"
        img="but.png"
        title='Жемчуг'
      )
      AcsItem(
        :id="10"
        :prices="[130]"
        img="but.png"
        title='Лайт'
      )

  .form-group.col-md-12
    label.input_title Пригласительные письма
    input.form-control.mailsInput(type="number" placeholder="10" v-model="mails.count")
    textarea.form-control.textToMail(placeholder="Текст" cols="10" rows="4" v-model='mails.text')
</template>