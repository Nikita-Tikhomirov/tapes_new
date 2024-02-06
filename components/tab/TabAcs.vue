<script setup lang="ts">
const {data} = await useFetch<any>('https://maytimelenta.ru/wp-json/wp/v2/posts?_embed&per_page=100&orderby=menu_order&order=asc')
// const {data} = await useFetch<any>('https://test.tihomirov.pro/wp-json/wp/v2/posts?_embed&per_page=100')

</script>

<template lang="pug">
div
  .signup_form.row
    .dops-wrap.col-12
      AcsItem(
        v-for="(item, index) in data"
        :key="item.title.render"
        :index="index"
        :prices="item.acf.prices"
        :counts="item.acf.counts"
        :img="item._embedded['wp:featuredmedia'][0]?.source_url"
        :title="item.title.rendered"
      )
  Mails
</template>