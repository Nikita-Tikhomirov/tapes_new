<script setup lang="ts">
const {data} = await useFetch<any>('https://tapes-wp.tihomirov.pro/wp-json/wp/v2/posts?_embed')
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
