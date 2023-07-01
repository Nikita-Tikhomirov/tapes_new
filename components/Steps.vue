<script setup lang="ts">
const type = useSelectedTab()
</script>

<template>
<ul class="nav nav-tabs form_tab" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link show active">
      <span>1</span>
      Для кого
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :class="{ 'active': type !== 'start'  }">
      <span>2</span>
      Основные параметры
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :class="{ 'active': type === 'acs' || type === 'delivery' }">
      <span>3</span>
      Дополнительные товары
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :class="{ 'active': type === 'delivery' }">
      <span>4</span>
      Заказать
    </a>
  </li>
</ul>
</template>