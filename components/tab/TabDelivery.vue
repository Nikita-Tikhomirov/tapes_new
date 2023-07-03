<script setup lang="ts">
const requests = useRequests()

const delivery = ref<string>('')

//-------------------- Цена аксессуаров --------------------//

const totalPriceAcs = useAllPricesAcs()
const acsAllPrice = computed(() => {
  if(totalPriceAcs.value.length > 0) return totalPriceAcs.value.reduce((a,b)=>b+a)
  return 0
})

//-------------------- Цена Писем --------------------//

const mailsPrices = useMailsPrices()
const mails = useMails()
const mailsPrice = computed(() => {
  let onePrice = selectOnePrice(mails.value.count, mailsPrices.value, [3, 10, 30, 70, 100])
  if (mails.value.text) onePrice += 20 
  return onePrice * mails.value.count
})

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
  <template v-for="(request, i) in requests">
      <p v-if="request.price > 0">
        Заявка №{{ i + 1 }}: <b> {{ request.price }}</b> р.
      </p>
  </template>

  <template v-if="acsAllPrice > 0">
    <p>
      Аксессуары: <b> {{ acsAllPrice }}</b> р.
    </p>
  </template>
  
  <template v-if="mailsPrice > 0">
    <p>
      Пригласительные: <b> {{ mailsPrice }}</b> р.
    </p>
  </template>
</form>
</template>

<style scoped>
b {
  margin-left: 8px;
}
</style>