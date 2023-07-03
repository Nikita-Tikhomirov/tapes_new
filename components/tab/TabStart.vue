<script setup lang="ts">
const nextTab = useNextTab()

const tabs = [
  { tabName: 'vipuskniki', title: 'Выпускные ленты', subtitle: 'Выпускники школ' },
  { tabName: 'school', title: 'Для начальной школы' },
  { tabName: 'todlers', title: 'Для детского сада' },
  { tabName: 'firstclass', title: 'Первоклассникам' },
  { tabName: 'award', title: 'Наградные', subtitle: 'Для мероприятий, праздников' },
  { tabName: 'acs', title: 'Только аксессуары', subtitle: 'Без лент' }
]
</script>

<template lang="pug">
.signup_form.frstCsWrap
  Radio(
    v-for="tab in tabs"
    :key="tab.tabName"
    :active="nextTab === tab.tabName"
    :title="tab.title"
    :subtitle="tab.subtitle"
    @click="nextTab = tab.tabName"
  )
</template>