<script setup lang="ts">
// const {data} = await useFetch<any>('https://old.schmied.ru/wp-json/wp/v2/posts?_embed')

const acs = [
  {id: 0, title: 'Колокольчик "Красивый"', prices: [75, 68, 64, 59, 54], img: '700-nw.jpg'},
  {id: 1, title: 'Колокольчик "Лучший выпуск"', prices: [100, 93, 89, 84, 79], img: '700-nw.jpg'},
  {id: 2, title: 'Колокольчик "МАЙ"', prices: [55, 53, 50, 45, 42], img: '700-nw.jpg'},
  {id: 3, title: 'Бабочки "Элегант"', prices: [260, 210, 190, 170, 150], img: 'btfl.png'},
  {id: 4, title: 'Бабочки "Выпускник"', prices: [350, 330, 310, 290, 270], img: 'btfl.png'},
  {id: 5, title: 'Бабочки "Кашемир" Премиум', prices: [500, 480, 470, 450, 440], img: 'btfl.png'},
  {id: 6, title: 'Банты "ТОП"(Пара)', prices: [350], img: 'bnt.png'},
  {id: 7, title: 'Банты "ВИП"(Пара)', prices: [400], img: 'bnt.png'},
  {id: 8, title: 'Бант на заколке(за 1шт)', prices: [180], img: 'bnt.png'},
  {id: 9, title: 'Жемчуг', prices: [125], img: 'but.png'},
  {id: 10, title: 'Лайт', prices: [130], img: 'but.png'},
]
</script>

<template lang="pug">
div
  .signup_form.row
    .dops-wrap.col-12
      AcsItem(
        v-for="item in acs"
        :key="item.title"
        :id="item.id"
        :prices="item.prices"
        :img="item.img"
        :title="item.title"
      )
  Mails
</template>

<style>
.mail-counter {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
}
</style>