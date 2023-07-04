<script setup lang="ts">
const requests = useRequests()

const delivery = ref<string>('')

const fastPrint = useFastPrint()
const fastPrintPrices = useFastPrintPrices()
const allTapes = useAllTapes()

const fastPrintPrice = computed(() => {
  const onePrice = selectOnePrice(allTapes.value, fastPrintPrices.value, [1, 3, 5, 10, 15, 20, 50, 100, 200])
  return allTapes.value * onePrice
})
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

<template lang="pug">
form.formify_box
  .signup_form.row
    .form-group.col-md-12
      label.input_title Отправка в город
      input.form-control(type="text" placeholder="Город" required)

  Radio(
    :active="delivery === 'sdek'"
    title="СДЭК"
    subtitle="50% предоплата (За ваш заказ)<br>50% при получении + стоимость доставки"
    @click="delivery = 'sdek'"
  )

  Radio(
    :active="delivery === 'post'"
    title="Почта"
    subtitle="Оплата за заказ, и за доставку до заказа - 100%"
    @click="delivery = 'post'"
  )

  .signup_form.row
    .form-group.col-md-12
      label.input_title Получатель
      input.form-control(type="text" placeholder="ФИО, телефон" required)

  .input_title Стоимость вашего заказа

  template(v-for="(request, i) in requests")
    p(v-if="request.price > 0") Заявка №{{ i + 1 }}: <b> {{ request.price }}</b> р.

  p(v-if="acsAllPrice > 0") Аксессуары: <b> {{ acsAllPrice }}</b> р.
  
  p(v-if="mailsPrice > 0") Пригласительные: <b> {{ mailsPrice }}</b> р.

  Radio(
    :active="fastPrint"
    title="Экспресс печать"
    :subtitle="`+${fastPrintPrice}р.`"
    @click="fastPrint = !fastPrint"
  )
</template>

<style scoped>
b {
  margin-left: 8px;
}
</style>