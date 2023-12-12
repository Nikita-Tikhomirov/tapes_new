<script setup lang="ts">
const requests = useRequests()
const addressee = useAddressee()
const activeTab = useActiveTab()
const activeTabForm = useTabForm()

const fastPrint = useFastPrint()
const fastPrintPrices = useFastPrintPrices()
const fastPrintPricesDiscount = useFastPrintDiscount()
const allTapes = useAllTapes()
const totalPrice = useTotalPrice()
const delivery = useDelivery()

const allChildPrice = useAllChildPrice()
const allAdultPrice = useAllAdultPrice()

const mails = useMails()

const subtitleSdek = computed(()=> {
  if (delivery.value.name === 'sdek') {
    return `${ (totalPrice.value - delivery.value.price) / 2 }р. предоплата (За ваш заказ)<br>Остаток 50% и сумму за доставку (${delivery.value.price}р.) вы оплачиваете в пункте выдачи СДЭК, адрес которого вы указываете`
  } else {
    return '50% предоплата (За ваш заказ)<br>50% при получении + стоимость доставки'
  }
})

const subtitlePost = computed(()=> {
  if (delivery.value.name === 'post') {
    return 'доставка почтой + 500 рублей.<br>Eсли у вас северный или удаленный регион, возможно цена за доставку Почтой будет чуть выше, более точную информацию о доставке Почтой скажем, когда вы укажите куда именно будет доставка и какой именно будет заказ ( цена зависит от месторасположения и веса заказа )'
  } else {
    return 'Оплата за заказ, и за доставку до заказа - 100%'
  }
})

const fastPrintPrice = computed(() => {
  const onePrice = selectOnePrice(allTapes.value, fastPrintPrices.value, fastPrintPricesDiscount.value)  
  console.log(onePrice);
  console.log(allTapes.value);
  
  return allTapes.value * onePrice
})
//-------------------- Цена аксессуаров --------------------//

const selectedAcs = useSelectedAcs()
const acsAllPrice = computed(() => {
  if(selectedAcs.value.length > 0) return selectedAcs.value.reduce((a,b)=>a + b.price ,0)
  return 0
})

//-------------------- sdek --------------------//

let sdekWidjet = false

function deliveryPost() {
  delivery.value.name = 'post'
  delivery.value.price = 500
}

function deliverySdek() {
  delivery.value.name = 'sdek'
  
  if (!sdekWidjet) {
    const widget = new window.CDEKWidget({
      apiKey: '5f5b2da8-bfcb-44f6-81b2-a6d94f5f90de',
      defaultLocation: 'Москва',
      from: 'Томск',
      root: 'forpvz',
      servicePath: 'https://maytimelenta.ru/service.php',
      // servicePath: 'https://test.tihomirov.pro/service.php',
      goods: [
        { length : 1, width : 1, height : 1, weight : 1 },
      ],
      tariffs: {
        office: [136],
        door: [137],
        pickup: [368]
      },
      hideFilters: {
        have_cashless: true,
        have_cash: true,
        is_dressing_room: true,
        type: true,
      },
      onChoose: function(_type, tariff, address) {
        addressee.value.tariff = tariff.tariff_code
        
        if (_type === 'door') {
          const street = address.components.find(el => el.kind === 'street').name
          const house = address.components.find(el => el.kind === 'house').name
          addressee.value.city = address.components.find(el => el.kind === 'locality').name
          addressee.value.point = `${street} ${house}`
          addressee.value.userAddress = address.formatted
        } else {
          addressee.value.city = address.city
          addressee.value.point = address.address
          addressee.value.pointId = address.code
        }

        if (addressee.value.city === 'Москва' || addressee.value.city === 'Санкт-Петербург') delivery.value.price = 350
        else if (+tariff.delivery_sum <= 230) delivery.value.price = 250
        else if (+tariff.delivery_sum <= 290) delivery.value.price = 300
        else if (+tariff.delivery_sum <= 335) delivery.value.price = 350
        else if (+tariff.delivery_sum <= 395) delivery.value.price = 395
        else if (+tariff.delivery_sum <= 600) delivery.value.price = +tariff.delivery_sum
        else if (+tariff.delivery_sum > 600) delivery.value.price = +tariff.delivery_sum + (+totalPrice.value * 0.03)
      },
    })
  }

  sdekWidjet = true
}

function order() {
  if (!delivery.value.name) {
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

  if (delivery.value.name === 'sdek') sdeck()

}

const tabs = {
  vipuskniki: 'Выпускные именные ленты',
  school: 'Именные ленты для начальной школы',
  todlers: 'Именные ленты для детского сада',
  firstclass: 'Именные ленты первоклассникам',
  award: 'Наградные ленты',
  acs: 'Только аксессуары без лент',
}

function mail() {
  let request = ''
  let requestTitle = ''
  let adultCount = ''
  let childCount = ''
  let template = ''
  let color = ''
  let print = ''
  let text = ''
  let names = ''

  requests.value.forEach((item, i) => {
    if (item.adultCount > 0 || item.childCount > 0) {
      request = `Заявка №${i+1}:\n`
      requestTitle = `${tabs[activeTabForm.value]}\n\n`

      if (item.adultCount > 0) adultCount = `Взрослые ленты: ${item.adultCount}шт. * ${allAdultPrice.value/item.adultCount}р. = ${allAdultPrice.value}р.\n`
      if (item.childCount > 0) childCount = `Детские ленты: ${item.childCount}шт. * ${allChildPrice.value/item.childCount}р. = ${allChildPrice.value}р.\n`

      template = `Шаблон: ${item.template}\n`
      color = `Цвет ленты: ${item.color}\n`
      print = `Цвет печати: ${item.print.name}\n`

      if (item.text) text = `Доп. надпись на ленте: ${item.text}\n`

      for (const el in item.names) {
        names += listPeople(item.names[el].names, item.isName, item.names[el].title)
      }
    }
  })

  let formData = `${request}${requestTitle}`
  formData += `${template}${color}${print}${text}\n`
  formData += `${names}`

  formData += '\nСтоимость заказа:\n'

  formData += `Ленты:\n${adultCount}${childCount}`

  // =============== - =============== //
  // =============== Acs =============== //
  
  let acs = ''
  selectedAcs.value.forEach(item => {
    if (item.count > 0) acs += `${item.title}: ${item.count} шт. * ${item.price/item.count}р. = ${item.price}р.\n`
  })

  if (acs) formData += `\nАксессуары:\n${acs}`

  // =============== - =============== //
  // =============== mails =============== //

  let mailsText = ''

  if (mails.value.standartLastCall.count || mails.value.standartFinal.count) {
    mailsText += 'Пригласительные "Стандарт":\n'
    if (mails.value.standartLastCall.count) mailsText += `На последний звонок: ${mails.value.standartLastCall.count}шт. * ${mails.value.standartLastCall.price}р. = ${mails.value.standartLastCall.count * mails.value.standartLastCall.price}р.\n`
    if (mails.value.standartFinal.count) mailsText += `На выпускной: ${mails.value.standartFinal.count}шт. * ${mails.value.standartFinal.price}р. = ${mails.value.standartFinal.count * mails.value.standartFinal.price}р.\n`
  }

  if (mails.value.editLastCall.count || mails.value.editFinal.count) {
    mailsText += 'Пригласительные с доп. текстом:\n'
    if (mails.value.editLastCall.count) mailsText += `На последний звонок: ${mails.value.editLastCall.count}шт. * ${mails.value.editLastCall.price}р. = ${mails.value.editLastCall.count * mails.value.editLastCall.price}р.\n`
    if (mails.value.editFinal.count) mailsText += `На выпускной: ${mails.value.editFinal.count}шт. * ${mails.value.editFinal.price}р. = ${mails.value.editFinal.count * mails.value.editFinal.price}р.\n`
  }

  if (mails.value.namesLastCall.count || mails.value.namesFinal.count) {
    mailsText += 'Именные пригласительные:\n'
    if (mails.value.namesLastCall.count) mailsText += `На последний звонок: ${mails.value.namesLastCall.count}шт. * ${mails.value.namesLastCall.price}р. = ${mails.value.namesLastCall.count * mails.value.namesLastCall.price}р.\n`
    if (mails.value.namesFinal.count) mailsText += `На выпускной: ${mails.value.namesFinal.count}шт. * ${mails.value.namesFinal.price}р. = ${mails.value.namesFinal.count * mails.value.namesFinal.price}р.\n`
  }

  if (mails.value.editText) mailsText += `Доп. текст:\n${mails.value.editText}\n`
  if (mails.value.namesText) mailsText += `Список имен:\n${mails.value.namesText}\n`
  if (mails.value.date) mailsText += `Дата проведения: ${mails.value.date}\n`
  if (mails.value.place) mailsText += `Место проведения: ${mails.value.place}\n`

  if (mailsText) formData += `\nПриглашения:\n${mailsText}`

  // =============== - =============== //

  if (fastPrint.value) formData += `\nЭкспресс печать: ${fastPrintPrice.value}р.\n`

  formData += `\nЦена: ${totalPrice.value - delivery.value.price} р.\n`

  formData += delivery.value.name === 'post' ? 'Отправка: Почта россии' : 'Отправка: СДЕК'
  formData += `\nЦена доставки: ${delivery.value.price}р.\n`

  // =============== - =============== //

  formData += `\nПолучатель:\n`
  formData += `${addressee.value.city}\n`
  formData += `${addressee.value.point}\n`
  formData += `${addressee.value.name}\n`
  formData += `${addressee.value.phone}\n`
  formData += `${addressee.value.vk}\n`

  if (addressee.value.text) formData += `\n\nКоментарий к заказу: ${addressee.value.text}\n`

  let str = formData.replace(/&#171;/g, "«")
  str = str.replace(/&#187;/g, "»")
    
  useFetch('https://maytimelenta.ru/mail.php', {
    method: 'POST',
    body: str
  })

  activeTab.value = 'thanks'
}

async function sdeck () {
  await useFetch<any>('https://maytimelenta.ru/sdek.php', {
    method: 'POST',
    body: {
      price: (totalPrice.value - delivery.value.price) / 2,
      tariff_code: addressee.value.tariff,
      delivery_price: delivery.value.price,
      delivery_point: addressee.value.pointId,
      delivery_address: addressee.value.userAddress,
      name: addressee.value.name,
      phone: addressee.value.phone,
    }
  })
}

function listPeople (item, isName, title) {
  if (item && item.length > 0) {
    if (!isName) return `${title}: ${item.length}\n`

    let string = title + ':\n'

    for (const name of item) {
      string += '    ' + name + '\n'
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
    :active="delivery.name === 'sdek'"
    title="СДЭК"
    :subtitle="subtitleSdek"
    @click="deliverySdek"
  )

  Radio(
    :active="delivery.name === 'post'"
    title="Почта"
    :subtitle="subtitlePost"
    @click="deliveryPost"
  )

  .input_title(v-show="delivery.name === 'sdek'" style="margin: 12px 0") Выберите адрес
  #forpvz(v-show="delivery.name === 'sdek'" style="width:100%; height:500px")

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
    .block(v-if="(request.adultCount > 0 || request.childCount > 0) && request.price > 0")
      p Заявка №{{ i + 1 }}:
      ul
        li(v-if="request.adultCount > 0" v-html="`Взрослые ленты: ${request.adultCount}шт. * ${allAdultPrice/request.adultCount}р. = ${allAdultPrice}р.`")
        li(v-if="request.childCount > 0" v-html="`Детские ленты: ${request.childCount}шт. * ${allChildPrice/request.childCount}р. = ${allChildPrice}р.\n`")
        li Шаблон: {{request.template}}
        li Цвет ленты: {{request.color}}
        li Цвет печати: {{request.print.name}}
        li(v-if="request.text") Доп. надпись на ленте: {{request.text}}
        template(v-for="item in request.names")
          li {{ listPeople(item.names, request.isName, item.title) }}

  .block(v-if="acsAllPrice > 0")
    p Аксессуары:
    ul(v-for="acs in selectedAcs")
      li(v-if="acs.count > 0" v-html="`${acs.title}: ${acs.count}шт. * ${acs.price/acs.count}р. = ${acs.price}р.\n`")

  .block(
    v-if="mails.standartLastCall.count || mails.standartFinal.count || mails.editLastCall.count || mails.editFinalcount || mails.namesLastCall.count || mails.namesFinal.count"
  )
    ul
      li(v-if="mails.standartLastCall.count || mails.standartFinal.count")
        p Пригласительные "Стандарт":
        p(v-if="mails.standartLastCall.count") На последний звонок: {{mails.standartLastCall.count}}шт. * {{mails.standartLastCall.price}}р. = {{mails.standartLastCall.count * mails.standartLastCall.price}}р.
        p(v-if="mails.standartFinal.count") На выпускной: {{mails.standartFinal.count}}шт. * {{mails.standartFinal.price}}р. = {{mails.standartFinal.count * mails.standartFinal.price}}р.

      li(v-if="mails.editLastCall.count || mails.editFinal.count")
        p Пригласительные с доп. текстом:
        p(v-if="mails.editLastCall.count") На последний звонок: {{mails.editLastCall.count}}шт. * {{mails.editLastCall.price}}р. = {{mails.editLastCall.count * mails.editLastCall.price}}р.
        p(v-if="mails.editFinal.count") На выпускной: {{mails.editFinal.count}}шт. * {{mails.editFinal.price}}р. = {{mails.editFinal.count * mails.editFinal.price}}р.

      li(v-if="mails.namesLastCall.count || mails.namesFinal.count")
        p Именные пригласительные:
        p(v-if="mails.namesLastCall.count") На последний звонок: {{mails.namesLastCall.count}}шт. * {{mails.namesLastCall.price}}р. = {{mails.namesLastCall.count * mails.namesLastCall.price}}р.
        p(v-if="mails.namesFinal.count") На выпускной: {{mails.namesFinal.count}}шт. * {{mails.namesFinal.price}}р. = {{mails.namesFinal.count * mails.namesFinal.price}}р.

      li(v-if="mails.editText") Доп. текст: {{mails.editText}}
      li(v-if="mails.namesText") Список имен: {{mails.namesText}}
      li(v-if="mails.date") Дата проведения: {{mails.date}}
      li(v-if="mails.place") Место проведения: {{mails.place}}

  .block(v-if="delivery")
    p Доставка: <b>{{ delivery.price }}</b>

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
.block {
  padding-bottom: 4px;
  border-bottom: 1px solid #000;
  margin-bottom: 12px;
}

.block p {
  font-size: 16px;
  font-weight: 700;
}
.block ul {
  font-size: 15px;
  margin-left: 12px;
  list-style-type: disc;
}

.block li {
  white-space: pre;
}
</style>