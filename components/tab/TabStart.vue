<script setup lang="ts">
const nextTab = useNextTab()
const requests = useRequests()

const tabs = [
  { tabName: 'vipuskniki', title: 'Выпускные именные ленты' },
  { tabName: 'school', title: 'Именные ленты для начальной школы' },
  { tabName: 'todlers', title: 'Именные ленты для детского сада' },
  { tabName: 'firstclass', title: 'Именные ленты первоклассникам' },
  { tabName: 'award', title: 'Наградные ленты' },
  { tabName: 'acs', title: 'Только аксессуары без лент' }
]

function selectTab(name:string) {
  nextTab.value = name
}
</script>

<template lang="pug">
.signup_form.frstCsWrap
  Radio(
    v-for="tab in tabs"
    :key="tab.tabName"
    :active="nextTab === tab.tabName"
    :title="tab.title"
    :subtitle="tab.subtitle"
    @click="selectTab(tab.tabName)"
  )
</template>