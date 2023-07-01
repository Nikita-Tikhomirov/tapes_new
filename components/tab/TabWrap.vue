<script setup lang="ts">
const tab = useSelectedTab()
const nextTab = useNextTab()

const title = computed(() => {
  if (tab.value === 'start') return 'Для кого <span>заказываем ленты</span>'
  else if (tab.value === 'acs') return 'Дополнительные <span>товары</span>'
  else if (tab.value === 'delivery') return '<span>Заказать</span>'
  else return 'Выпускные <span>ленты</span>'
})

const subtitle = computed(() => {
  if (tab.value === 'vipuskniki') return 'Выпускники школ, колледжей и т.д.'
  else if (tab.value === 'school') return 'Для начальной школы'
  else if (tab.value === 'acs') return 'Описание для допов'
})

function next() {
  if (tab.value === 'start') tab.value = nextTab.value
  else if (tab.value === 'acs') tab.value = 'delivery'
  else if (tab.value !== 'delivery') tab.value = 'acs'
}
</script>

<template>
<div>
  <div class="formify_box">
    <h4 class="form_title" v-html="title"></h4>
    <h3 class="form_subtitle" v-if="subtitle">{{ subtitle }}</h3>

    <slot></slot>

    <div class="next_button text-right">
      <button class="btn thm_btn red_btn next_tab gender-button buttonsToStepWithAcs" @click="next">
        Дальше <i class="arrow_right"></i>
      </button>
    </div>
  </div>
</div>
</template>