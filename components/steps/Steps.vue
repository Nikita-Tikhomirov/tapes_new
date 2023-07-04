<script setup lang="ts">
const activeTab = useActiveTab()
const nextTab = useNextTab()
</script>

<template lang="pug">
ul.nav.nav-tabs.form_tab(style="margin-top: 16px;")
  StepsItem(
    :active="true"
    step="1"
    text="Для кого"
    @back="activeTab = 'start'"
  )
  StepsItem(
    :active="activeTab !== 'start'"
    step="2"
    text="Основные параметры"
    @back="activeTab = nextTab"
  )
  StepsItem(
    :active="activeTab === 'acs' || activeTab === 'delivery'"
    step="3"
    text="Дополнительные товары"
    @back="activeTab = 'acs'"
  )
  StepsItem(
    :active="activeTab === 'delivery'"
    step="4"
    text="Заказать"
  )
</template>
