<script setup lang="ts">
const requests = useRequests()

const delivery = ref<string>('')
</script>

<template>
<form class="formify_box">
  <div class="signup_form row">
    <div class="form-group col-md-12">
      <label class="input_title">Отправка в город</label>
      <input type="text" class="form-control" placeholder="Город" required>
    </div>
  </div>
  <Radio
    :active="delivery === 'sdek'"
    title="СДЭК"
    subtitle="50% предоплата (За ваш заказ)<br>50% при получении + стоимость доставки"
    @click="delivery = 'sdek'"
  ></Radio>
  <Radio
    :active="delivery === 'post'"
    title="Почта"
    subtitle="Оплата за заказ, и за доставку до заказа - 100%"
    @click="delivery = 'post'"
  ></Radio>
  <div class="signup_form row">
    <div class="form-group col-md-12">
      <label class="input_title">Получатель</label>
      <input type="text" class="form-control" placeholder="ФИО, телефон" required>
    </div>
  </div>
  <p class="input_title">Стоимость вашего заказа</p>
  <div v-for="(request, i) in requests">
    <p>Заявка №{{ i + 1 }}</p>
    <p>Цена: {{ request.price }}</p>
  </div>
</form>
</template>