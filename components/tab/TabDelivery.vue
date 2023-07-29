<script setup lang="ts">
const requests = useRequests()
const addressee = useAddressee()

const fastPrint = useFastPrint()
const fastPrintPrices = useFastPrintPrices()
const allTapes = useAllTapes()
const totalPrice = useTotalPrice()
const delivery = useDelivery()

const subtitleSdek = computed(()=> {
  if (delivery.value === 'sdek') {
    return `${ totalPrice.value / 2 }р. предоплата (За ваш заказ)<br>Остаток 50% и сумму за доставку вы оплачиваете в пункте выдачи СДЭК, адрес которого вы указываете`
  } else {
    return '50% предоплата (За ваш заказ)<br>50% при получении + стоимость доставки'
  }
})

const subtitlePost = computed(()=> {
  if (delivery.value === 'post') {
    return 'доставка почтой + 500 рублей.<br>Eсли у вас северный или удаленный регион, возможно цена за доставку Почтой будет чуть выше, более точную информацию о доставке Почтой скажем, когда вы укажите куда именно будет доставка и какой именно будет заказ ( цена зависит от месторасположения и веса заказа )'
  } else {
    return 'Оплата за заказ, и за доставку до заказа - 100%'
  }
})

const fastPrintPrice = computed(() => {
  const onePrice = selectOnePrice(allTapes.value, fastPrintPrices.value, [1, 3, 5, 10, 15, 20, 50, 100, 200])  
  return allTapes.value * onePrice
})
//-------------------- Цена аксессуаров --------------------//

const selectedAcs = useSelectedAcs()
const acsAllPrice = computed(() => {
  if(selectedAcs.value.length > 0) return selectedAcs.value.reduce((a,b)=>a + b.price ,0)
  return 0
})

//-------------------- Цена Писем --------------------//

const mailsPrices = useMailsPrices()
const mails = useMails()

// const standartMails = computed(() => mails.value.countStandart * selectOnePrice(mails.value.countStandart, mailsPrices.value, [3, 10, 30, 70, 100]))
// const editMails = computed(() => mails.value.countEdit  * (selectOnePrice(mails.value.countEdit, mailsPrices.value, [3, 10, 30, 70, 100]) + 10))
// const nameMails = computed(() => mails.value.countNames  * (selectOnePrice(mails.value.countNames, mailsPrices.value, [3, 10, 30, 70, 100]) + 20))

const mailsPrice = computed(() => {
  const count = mails.value.countStandart + mails.value.countEdit + mails.value.countNames

  let onePrice = selectOnePrice(count, mailsPrices.value, [3, 10, 30, 70, 100])
  let onePriceEdit = onePrice + 10
  let onePriceNames = onePrice + 20

  return (onePrice * mails.value.countStandart) + (onePriceEdit * mails.value.countEdit) + (onePriceNames * mails.value.countNames)
})



//-------------------- sdek --------------------//

// const ourWidjet = new ISDEKWidjet({
//   defaultCity: 'Москва', //какой город отображается по умолчанию
//   cityFrom: 'Москва', // из какого города будет идти доставка
//   country: 'Россия', // можно выбрать страну, для которой отображать список ПВЗ
//   link: 'forpvz', // id элемента страницы, в который будет вписан виджет
//   path: 'https://widget.cdek.ru/widget/scripts/', //директория с библиотеками
//   servicepath: 'https://widget.cdek.ru/widget/scripts/service.php', //ссылка на файл service.php на вашем сайте
//   onChooseProfile: onChooseProfile
// })

// function onChooseProfile(wat) {
//   alert(
//     'Выбрана доставка курьером в город ' + wat.cityName + "\n" +
//     'цена ' + wat.price + "\n" +
//     'срок ' + wat.term + ' дн.'
//   );
//   console.log('Выбрана доставка курьером ', wat);
// }
</script>

<template lang="pug">
form.formify_box
  .signup_form
    inputEL(
      type="text"
      title="Отправка в город"
      placeholder="Город"
      v-model="addressee.city"
    )
    inputEL(
      type="text"
      placeholder="Адрес пункта выдачи"
      v-model="addressee.point"
    )
    
  //- #forpvz(v-show="delivery === 'sdek'" style="width:100%; height:200px")

  Radio(
    :active="delivery === 'sdek'"
    title="СДЭК"
    :subtitle="subtitleSdek"
    @click="delivery = 'sdek'"
  )

  Radio(
    :active="delivery === 'post'"
    title="Почта"
    :subtitle="subtitlePost"
    @click="delivery = 'post'"
  )

  .signup_form
    inputEL(
      type="text"
      title="Получатель"
      placeholder="ФИО"
      v-model="addressee.name"
    )
    inputEL(
      type="text"
      placeholder="Телефон"
      v-model="addressee.phone"
    )
    inputEL(
      type="text"
      placeholder="ссылка на Вконтакте"
      v-model="addressee.vk"
    )

  .input_title Стоимость вашего заказа

  template(v-for="(request, i) in requests")
    p(v-if="request.price > 0") Заявка №{{ i + 1 }}: <b> {{ request.price }}</b> р.

  p(v-if="acsAllPrice > 0") Аксессуары: <b> {{ acsAllPrice }}</b> р.
  
  p(v-if="mailsPrice > 0") Пригласительные: <b> {{ mailsPrice }}</b> р.

  p(v-if="delivery === 'post'") Доставка: <b>500</b> р.

  Radio(
    :active="fastPrint"
    title="Экспресс печать"
    :subtitle="`+${fastPrintPrice}р.`"
    @click="fastPrint = !fastPrint"
  )

  inputEL(
    style="margin-top: 24px; width: 100%"
    type="textarea"
    placeholder="Комментарий к заказу"
    title="Комментарий к заказу"
    v-model="addressee.text"
  )
</template>

<style scoped>
b {
  margin-left: 8px;
}
</style>