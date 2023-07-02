<script setup lang="ts">
const nextTab = useNextTab()
</script>

<template>
<div class="signup_form frstCsWrap">
  <Radio
    :active="nextTab === 'vipuskniki'"
    title="Выпускные ленты"
    subtitle="Выпускники школ"
    @click="nextTab = 'vipuskniki'"
  ></Radio>

  <Radio
    :active="nextTab === 'school'"
    title="Для начальной школы"
    @click="nextTab = 'school'"
  ></Radio>

  <Radio
    :active="nextTab === 'todlers'"
    title="Для детского сада"
    @click="nextTab = 'todlers'"
  ></Radio>

  <Radio
    :active="nextTab === 'firstclass'"
    title="Первоклассникам"
    @click="nextTab = 'firstclass'"
  ></Radio>

  <Radio
    :active="nextTab === 'award'"
    title="Наградные"
    subtitle="Для мероприятий, праздников"
    @click="nextTab = 'award'"
  ></Radio>

  <Radio
    :active="nextTab === 'acs'"
    title="Только аксессуары"
    subtitle="Без лент"
    @click="nextTab = 'acs'"
  ></Radio>
</div>
</template>