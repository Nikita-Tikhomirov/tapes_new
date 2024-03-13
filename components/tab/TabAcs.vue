<script setup lang="ts">
const data = await $fetch('https://maytimelenta.ru/wp-json/wp/v2/posts?_embed&per_page=100&orderby=menu_order&order=asc')
</script>

<template lang="pug">
div
  .signup_form.row(style="margin-top: 40px")
    .dops-wrap.col-12
      AcsItem(
        v-for="(item, index) in data"
        :key="item.title.rendered"
        :index="index"
        :counts="item.acf.counts"
        :prices="item.acf.prices"
        :img="item._embedded['wp:featuredmedia'][0].source_url"
        :title="item.title.rendered"
      )
  Mails
</template>