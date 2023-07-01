<script setup lang="ts">
// const {data} = await useFetch<any>('https://old.schmied.ru/wp-json/wp/v2/posts?_embed')
</script>

<template>
<div>
  <div class="signup_form row">
    <div class="dops-wrap col-12">
      <!-- <AcsItem
        v-for="post in data"
        :id="post.id"
        :prices="[75, 68, 64, 59, 54]"
        img=""
        :title="post.title.rendered"
      ></AcsItem> -->

      <!-- Колокольчики -->

      <AcsItem
        :id="0"
        :prices="[75, 68, 64, 59, 54]"
        img="700-nw.jpg"
        title='Колокольчик "Красивый"'
      ></AcsItem>
      <AcsItem
        :id="1"
        :prices="[100, 93, 89, 84, 79]"
        img="700-nw.jpg"
        title='Колокольчик "Лучший выпуск"'
      ></AcsItem>
      <AcsItem
        :id="2"
        :prices="[55, 53, 50, 45, 42]"
        img="700-nw.jpg"
        title='Колокольчик "МАЙ"'
      ></AcsItem>

      <!-- БАБОЧКИ -->

      <AcsItem
        :id="3"
        :prices="[260, 210, 190, 170, 150]"
        img="btfl.png"
        title='Бабочки "Элегант"'
      ></AcsItem>
      <AcsItem
        :id="4"
        :prices="[350, 330, 310, 290, 270]"
        img="btfl.png"
        title='Бабочки "Выпускник"'
      ></AcsItem>
      <AcsItem
        :id="5"
        :prices="[500, 480, 470, 450, 440]"
        img="btfl.png"
        title='Бабочки "Кашемир" Премиум'
      ></AcsItem>

      <!-- БАНТЫ -->

      <AcsItem
        :id="6"
        :prices="[350]"
        img="bnt.png"
        title='Банты "ТОП"(Пара)'
      ></AcsItem>
      <AcsItem
        :id="7"
        :prices="[400]"
        img="bnt.png"
        title='Банты "ВИП"(Пара)'
      ></AcsItem>
      <AcsItem
        :id="8"
        :prices="[180]"
        img="bnt.png"
        title='Бант на заколке(за 1шт)'
      ></AcsItem>

      <!-- БУТОНЬЕРКИ -->

      <AcsItem
        :id="9"
        :prices="[125]"
        img="but.png"
        title='Жемчуг'
      ></AcsItem>
      <AcsItem
        :id="10"
        :prices="[130]"
        img="but.png"
        title='Лайт'
      ></AcsItem>

    </div>
  </div>
  <div class="form-group col-md-12">
    <label class="input_title">Пригласительные письма</label>
    <input type="number" class="form-control mailsInput" id="" placeholder="10" required value=""
      data-price="53">
    <textarea class="form-control textToMail" id="" placeholder="Текст" required value="" cols="10"
      rows="4"></textarea>
  </div>
</div>
</template>