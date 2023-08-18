<script setup lang="ts">
const nextTab = useNextTab()
const activeTab = useActiveTab()

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

function activateTab() {
  if (!nextTab.value) {
    alert('Выберете для кого заказываете ленты')
    return
  }

  activeTab.value = nextTab.value
  return
}
</script>

<template lang="pug">
.tabStart
  Radio(
    v-for="tab in tabs"
    :key="tab.tabName"
    :active="nextTab === tab.tabName"
    :title="tab.title"
    :subtitle="tab.subtitle"
    @click="selectTab(tab.tabName)"
  )

  .next_button.text-right
    button.btn.thm_btn.red_btn.next_tab.gender-button.buttonsToStepWithAcs(@click="activateTab")
      span Дальше
      i.arrow_right
</template>

<style scoped>
.tabStart {
  display: grid;
  grid-gap: 15px;
}
</style>