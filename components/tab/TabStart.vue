<script setup lang="ts">
const nextTab = useNextTab()
</script>

<template>
<div class="signup_form frstCsWrap">
  <Radio
    tab="vipuskniki"
    title="Выпускные ленты"
    subtitle="Выпускники школ"
    @click="nextTab = 'vipuskniki'"
  ></Radio>

  <Radio
    tab="school"
    title="Для начальной школы"
    @click="nextTab = 'school'"
  ></Radio>

  <Radio
    tab="todlers"
    title="Для детского сада"
    @click="nextTab = 'todlers'"
  ></Radio>

  <Radio
    tab="firstclass"
    title="Первоклассникам"
    @click="nextTab = 'firstclass'"
  ></Radio>

  <Radio
    tab="acs"
    title="Только аксессуары"
    subtitle="Без лент"
    @click="nextTab = 'acs'"
  ></Radio>
</div>
</template>