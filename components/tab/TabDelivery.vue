<script setup lang="ts">
const requests = useRequests()
const addressee = useAddressee()
const activeTab = useActiveTab()

const fastPrint = useFastPrint()
const fastPrintPrices = useFastPrintPrices()
const allTapes = useAllTapes()
const totalPrice = useTotalPrice()
const delivery = useDelivery()

const sdekPrice = ref(0)

const subtitleSdek = computed(()=> {
  if (delivery.value === 'sdek') {
    return `${ totalPrice.value / 2 }р. предоплата (За ваш заказ)<br>Остаток 50% и сумму за доставку (${sdekPrice.value}р.) вы оплачиваете в пункте выдачи СДЭК, адрес которого вы указываете`
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
const mailsDiscount = useMailsDiscount()
const mailsPriceEdit = useMailsPriceEdit()
const mailsPriceName = useMailsPriceName()
const mails = useMails()

const mailsPrice = computed(() => {
  const count = mails.value.countStandart + mails.value.countEdit + mails.value.countNames

  let onePrice = selectOnePrice(count, mailsPrices.value, mailsDiscount.value)
  let onePriceEdit = onePrice + mailsPriceEdit.value
  let onePriceNames = onePrice + mailsPriceName.value

  return (onePrice * mails.value.countStandart) + (onePriceEdit * mails.value.countEdit) + (onePriceNames * mails.value.countNames)
})


//-------------------- sdek --------------------//

let sdekWidjet = false

function deliverySdek() {
  delivery.value = 'sdek'

  if (!sdekWidjet) {
    const ourWidjet = new ISDEKWidjet({
      hidedelt: true,
      defaultCity: 'Москва',
      cityFrom: 'Томск',
      country: 'Россия',
      goods: [
        { length : 1, width : 1, height : 1, weight : 1 },
      ],
      link: 'forpvz',
      path: 'https://maytimelenta.ru/widget/scripts/',
      servicepath: 'https://maytimelenta.ru/service.php',
      onChoose: onChoose,
    })

    sdekWidjet = true
  }

  function onChoose(wat) {
    console.log(wat.cityName);
    console.log(`оригинал: ${wat.price}`);
    
    if (wat.cityName === 'Москва' || wat.cityName === 'Санкт-Петербург') { sdekPrice.value = 350 }
    else if (+wat.price <= 230) sdekPrice.value = 250
    else if (+wat.price <= 290) sdekPrice.value = 300
    else if (+wat.price <= 335) sdekPrice.value = 350
    else if (+wat.price <= 395) sdekPrice.value = 395
    else if (+wat.price <= 600) sdekPrice.value = +wat.price
    else if (+wat.price > 600) sdekPrice.value = +wat.price + (+totalPrice.value * 0.03)

    console.log(`Вычеслинная: ${sdekPrice.value}`);

    addressee.value.point = wat.PVZ.Address
    addressee.value.pointId = wat.id
    addressee.value.city = wat.cityName
  }
}

function order() {
  if (!delivery.value) {
    alert('Выберите способ доставки!')
    return
  }

  if (!addressee.value.city) {
    alert('Введите город доставки')
    return
  }

  if (!addressee.value.point) {
    alert('Введите адрес доставки')
    return
  }

  if (!addressee.value.name) {
    alert('Введите ФИО')
    return
  }

  if (!addressee.value.vk) {
    alert('Вставте ссылку на ваш "Вконтакте"')
    return
  }

  mail()

  if (delivery.value === 'sdek') sdeck()

}

function mail() {
  let formData = ''
    
  requests.value.forEach((item, i) => {
    if (item.adultCount > 0 || item.childCount > 0) {
      formData += `Заявка №${i+1}:\n`

      if (item.adultCount > 0) formData += `Взрослые ленты: ${item.adultCount}\n`
      if (item.childCount > 0) formData += `Детские ленты: ${item.childCount}\n`

      formData += `Шаблон: ${item.template}\nЦвет ленты: ${item.color}\nЦвет печати: ${item.print.name}\n`

      if (item.text) formData += `Доп. надпись на ленте: ${item.text}\n`

      formData += listPeople(item.names.graduatesMale, item.isName, 'Выпускники')
      formData += listPeople(item.names.graduatesFemale, item.isName, 'Выпускницы')
      formData += listPeople(item.names.teacher, item.isName, 'Классный руководитель')
      formData += listPeople(item.names.firstTeacher, item.isName, 'Первый учитель')
      formData += listPeople(item.names.director, item.isName, 'Директор')
      formData += listPeople(item.names.caregiver, item.isName, 'Воспитатель')
      formData += listPeople(item.names.assistant, item.isName, 'Помошник воспитателя')
      formData += listPeople(item.names.juniorCaregiver, item.isName, 'Младший воспитатель')
      formData += listPeople(item.names.firstClassMale, item.isName, 'Первокласники')
      formData += listPeople(item.names.firstClassFemale, item.isName, 'Первокласницы')
      formData += listPeople(item.names.firstTeacher, item.isName, 'Первый учитель')
      formData += listPeople(item.names.awardAdult, item.isName, 'Взрослые наминации')
      formData += listPeople(item.names.awardChild, item.isName, 'Детские наминации')

      formData += '\n-------------------\n\n'
    }
  })
  
  let acs = ''
  selectedAcs.value.forEach(item => {
    if (item.count > 0) acs += `${item.title}: ${item.count}\n`
  })

  if (acs) {
    formData += `Аксессуары:\n ${acs}`
    formData += '\n-------------------\n\n'
  }

  let mailsText = ''
  if (mails.value.countStandart) mailsText += `Пригласительные "Стандарт": ${mails.value.countStandart}\n`
  if (mails.value.countEdit) mailsText += `Пригласительные с доп. текстом: ${mails.value.countEdit}\n`
  if (mails.value.countNames) mailsText += `Именные пригласительные: ${mails.value.countNames}\n`
  if (mails.value.editText) mailsText += `Доп. текст:\n${mails.value.editText}\n`
  if (mails.value.namesText) mailsText += `Список имен:\n${mails.value.namesText}\n`
  if (mails.value.date) mailsText += `Дата проведения: ${mails.value.date}\n`
  if (mails.value.place) mailsText += `Место проведения: ${mails.value.place}\n`

  if (mailsText) {
    formData += `${mailsText}`
    formData += '\n-------------------\n\n'
  }

  if (delivery.value === 'post') {
    formData += `Отправка: Почта россии`
    formData += '\n-------------------\n\n'
  } else if (delivery.value === 'sdek') {
    formData += `Отправка: СДЕК`
    formData += '\n-------------------\n\n'
  }

  formData += `Получатель:\n`
  formData += `${addressee.value.city}\n`
  formData += `${addressee.value.point}\n`
  formData += `${addressee.value.name}\n`
  formData += `${addressee.value.phone}\n`
  formData += `${addressee.value.vk}\n`
  if (addressee.value.text) formData += `Коментарий к заказу: ${addressee.value.text}\n`
  formData += '\n-------------------\n\n'

  if (fastPrint.value) {
    formData += `Экспресс печать: Да\n`
    formData += '\n-------------------\n\n'
  }

  formData += `Цена: ${totalPrice.value}`

  let str = formData.replace(/&#171;/g, "«")
  str = str.replace(/&#187;/g, "»")
  
  useFetch('https://maytimelenta.ru/mail.php', {
    method: 'POST',
    body: str
  })

  activeTab.value = 'thanks'
}

async function sdeck () {
  const { data } = await useFetch<any>('https://maytimelenta.ru/sdek.php', {
    method: 'POST',
    body: {
      price: totalPrice.value / 2,
      delivery_price: sdekPrice.value,
      delivery_point: addressee.value.pointId,
      name: addressee.value.name,
      phone: addressee.value.phone,
    }
  })
}

function listPeople (item, isName, title) {
  if (item && item.length > 0) {
    if (!isName) return `${title}: ${item.length}\n`
    
    let string = `${title}:\n`
    for (let i = 0; i < item.length; i++) {
      string += `${item[i]}\n`
    }

    return string
  }

  return ''
}
</script>

<template lang="pug">
.formify_box
  .input_title(style="margin-bottom: 12px") Способ доставки
  Radio(
    :active="delivery === 'sdek'"
    title="СДЭК"
    :subtitle="subtitleSdek"
    @click="deliverySdek"
  )

  Radio(
    :active="delivery === 'post'"
    title="Почта"
    :subtitle="subtitlePost"
    @click="delivery = 'post'"
  )

  .input_title(v-show="delivery === 'sdek'" style="margin: 12px 0") Выберите адрес
  #forpvz(v-show="delivery === 'sdek'" style="width:100%; height:350px")

  .signup_form
    inputEL(
      type="text"
      title="Отправка в город"
      placeholder="Город"
      v-model="addressee.city"
    )
    inputEL(
      type="text"
      placeholder="Адрес"
      v-model="addressee.point"
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

  p(v-if="delivery === 'post'") Доставка: <b>500</b>р.
  p(v-if="delivery === 'sdek'") Доставка: <b>{{ sdekPrice }}</b>

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

  .next_button.text-right
    button.btn.thm_btn.red_btn.next_tab.gender-button.buttonsToStepWithAcs(@click="order")
      span Заказать
</template>

<style scoped>
b {
  margin-left: 8px;
}

#forpvz.CDEK-widget__panel-content {
 height: 100%;
}
</style>