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
const postPrice = usePostPrice()
const sdekMskPrice = useSdekMskPrice()
const sdekSpbPrice = useSdekSpbPrice()

const sdekPrices = useSdekPrices()
const sdekPricesNew = useSdekPricesNew()
const sdekPricesExtraPercent = useSdekPricesExtraPercent()

const allChildPrice = useAllChildPrice()
const allAdultPrice = useAllAdultPrice()

const mails = useMails()

const isPolicy = ref(false)

const subtitleSdek = computed(()=> {
  if (delivery.value.name === 'sdek') {
    return `${ (totalPrice.value - delivery.value.price) / 2 }р. предоплата (За ваш заказ)<br>Остаток 50% и сумму за доставку (${delivery.value.price}р.) вы оплачиваете в пункте выдачи СДЭК, адрес которого вы указываете`
  } else {
    return '50% предоплата (За ваш заказ)<br>50% при получении + стоимость доставки'
  }
})

const subtitlePost = computed(()=> {
  if (delivery.value.name === 'post') {
    return `доставка почтой + ${postPrice.value} рублей.<br>Eсли у вас северный или удаленный регион, возможно цена за доставку Почтой будет чуть выше, более точную информацию о доставке Почтой скажем, когда вы укажите куда именно будет доставка и какой именно будет заказ ( цена зависит от месторасположения и веса заказа )`
  } else {
    return 'Оплата за заказ, и за доставку до заказа - 100%'
  }
})

const fastPrintPrice = computed(() => {
  const onePrice = selectOnePrice(allTapes.value, fastPrintPrices.value, fastPrintPricesDiscount.value)  
  
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
  delivery.value.price = +postPrice.value
}

function deliverySdek() {
  delivery.value.name = 'sdek'
  
  if (!sdekWidjet) {
    const widget = new window.CDEKWidget({
      from: {
        country_code: 'RU',
        city: 'Томск',
        postal_code: 634034,
        code: 269,
        address: 'ул. Ленина, д. 24',
      },
      canChoose: true,
      apiKey: '5f5b2da8-bfcb-44f6-81b2-a6d94f5f90de',
      defaultLocation: 'Москва',
      root: 'forpvz',
      servicePath: 'https://maytimelenta.ru/service.php',
      lang: 'rus',
      currency: 'RUB',
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

      onCalculate: function(_type, tariff, address) {
        console.log('type', _type);
        console.log('tariff', tariff);
        console.log('address', address);
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

        if (addressee.value.city === 'Москва') {
          delivery.value.price = sdekMskPrice.value
          tariff.delivery_sum = sdekMskPrice.value
        }
        else if (addressee.value.city === 'Санкт-Петербург') {
          delivery.value.price = sdekSpbPrice.value
          tariff.delivery_sum = sdekSpbPrice.value
        }
        else {
          const newPrice = deliverySdekPrice(tariff.delivery_sum, sdekPrices.value, sdekPricesNew.value, sdekPricesExtraPercent.value)
          delivery.value.price = newPrice
          tariff.delivery_sum = newPrice
        }

        // else if (+tariff.delivery_sum <= 230) {
        //   delivery.value.price = 250
        //   tariff.delivery_sum = 250

        // }
        // else if (+tariff.delivery_sum <= 290) {
        //   delivery.value.price = 300
        //   tariff.delivery_sum = 300
        // }
        // else if (+tariff.delivery_sum <= 335) {
        //   delivery.value.price = 350
        //   tariff.delivery_sum = 350
        // }
        // else if (+tariff.delivery_sum <= 395) {
        //   delivery.value.price = 395
        //   tariff.delivery_sum = 395
        // }
        // else if (+tariff.delivery_sum <= 600) {
        //   delivery.value.price = +tariff.delivery_sum
        // }
        // else if (+tariff.delivery_sum > 600) {
        //   delivery.value.price = +tariff.delivery_sum + (+totalPrice.value * 0.03)
        //   tariff.delivery_sum = +tariff.delivery_sum + (+totalPrice.value * 0.03)
        // }
      },
    })
  }

  sdekWidjet = true
}

function order() {
  if (!isPolicy.value) {
    alert('Согласитесь с политикой обработки персональных данных')
    return
  }

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

  if (!addressee.value.email) {
    alert('Введите email')
    return
  }

  if (!addressee.value.vk) {
    alert('Вставте ссылку на ваш "Вконтакте"')
    return
  }

  mail()

  // if (delivery.value.name === 'sdek') sdeck()

  localStorage.setItem('requests', '')
  localStorage.setItem('mails', '')
  // localStorage.setItem('selectedAcs', JSON.stringify(selectedAcs.value))
  // localStorage.setItem('addressee', JSON.stringify(addressee.value))

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
  let adultCount = 0
  let childCount = 0
  let formData = ''
  requests.value.forEach((item, i) => {
    if (item.adultCount > 0 || item.childCount > 0) {
      formData += `Заявка №${i+1}:\n`
      // formData += '\nСтоимость заказа:\n'
      // formData += 'Ленты:\n'
      // if (item.adultCount > 0) formData += `Взрослые ленты: ${item.adultCount}шт. * ${allAdultPrice.value/allTapes.value}р. = ${allAdultPrice.value/allTapes.value * item.adultCount}р.\n`
      // if (item.childCount > 0) formData += `Детские ленты: ${item.childCount}шт. * ${allChildPrice.value/allTapes.value}р. = ${allChildPrice.value/allTapes.value * item.childCount}р.\n`

      adultCount += item.adultCount > 0 ? +item.adultCount : 0
      childCount += item.childCount > 0 ? +item.childCount : 0

      let acsCount = ''
      selectedAcs.value.forEach(item => {
        if (item.count > 0) {
          acsCount += `${item.title}: ${item.count} шт.\n`
        }
      })
      formData += `${tabs[activeTabForm.value]}: ${adultCount + childCount}шт.\n`
      // if (adultCount) formData += `Взрослых лент: ${adultCount}шт.\n`
      // if (childCount) formData += `Детских лент: ${childCount}шт.\n`
      if (acsCount) formData += `${acsCount}`

    if (mails.value.standartLastCall.count || mails.value.standartFinal.count) {
      if (mails.value.standartLastCall.count) formData += `Пригласительные "Стандарт" на последний звонок: ${mails.value.standartLastCall.count}шт.\n`
      if (mails.value.standartFinal.count) formData += `Пригласительные "Стандарт" на выпускной: ${mails.value.standartFinal.count}шт.\n`
    }

    if (mails.value.editLastCall.count || mails.value.editFinal.count) {
      if (mails.value.editLastCall.count) formData += `Пригласительные с доп. текстом на последний звонок: ${mails.value.editLastCall.count}шт.\n`
      if (mails.value.editFinal.count) formData += `Пригласительные с доп. текстом на выпускной: ${mails.value.editFinal.count}шт.\n`
    }

    if (mails.value.namesLastCall.count || mails.value.namesFinal.count) {
      if (mails.value.namesLastCall.count) formData += `Именные пригласительные на последний звонок: ${mails.value.namesLastCall.count}шт.\n`
      if (mails.value.namesFinal.count) formData += `Именные пригласительные на выпускной: ${mails.value.namesFinal.count}шт.\n`
    }


      formData += `\nШаблон: ${item.template}\n`
      formData += `\nЦвет ленты: ${item.color.name}\n`
      formData += `Цвет печати: ${item.print.name}\n`

      if (item.text) formData += `\nДоп. надпись на ленте: ${item.text}\n`

      for (const el in item.names) {
        formData += listPeople(item.names[el].names, item.isName, item.names[el].title, true)
      }

      formData += '\n=============================================\n'
    }
  })

  // =============== - =============== //
  // =============== Acs =============== //

  let acs = ''
  selectedAcs.value.forEach(item => {
    if (item.count > 0) {
      acs += `${item.title}: ${item.count} шт. * ${item.price/item.count}р. = ${item.price}р.\n`
    }
  })

  if (acs) {
    formData += `\nАксессуары:\n${acs}`
    formData += '\n=============================================\n'
  }


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

  if (mailsText) {
    formData += `\nПриглашения:\n${mailsText}`
    formData += '\n=============================================\n'
  }


  // =============== - =============== //

  if (adultCount) formData += `\nВзрослых лент: ${adultCount}шт. * ${allAdultPrice.value/allTapes.value}руб. = ${allAdultPrice.value/allTapes.value * adultCount}руб.\n`
  if (childCount) formData += `\nДетских лент: ${childCount}шт. * ${allChildPrice.value/allTapes.value}руб. = ${allChildPrice.value/allTapes.value * childCount}руб.\n`

  // formData += delivery.value.name === 'post' ? '\nОтправка: Почта России' : 'Отправка: СДЕК\n'
  // formData += `\nЦена доставки: ${delivery.value.price}р.\n`
  if (fastPrint.value) formData += `Экспресс печать: ${fastPrintPrice.value}руб.\n`
  if (delivery.value.name != 'post') {
    formData += `\nИтого (без доставки): ${totalPrice.value - delivery.value.price} руб.\n`
    formData += `\nПредоплата: 50%\n`
    formData += `Оплата при получении(наложенный платеж): 50%\n`
    // formData += `+ Стоимость доставки СДЕК до ${addressee.value.city} ${delivery.value.price} рублей (оплачивается при получении посылки в СДЕК) \n`
    // formData += `\nИтого к оплате (с доставкой): ${totalPrice.value} руб.\n`
    formData += `+ Стоимость доставки СДЕК до г. ${addressee.value.city} ориентировочно ${delivery.value.price} руб. (оплачивается при получении посылки в СДЕК)\n`
    formData += `\nТочную стоимость доставки озвучит СДЕК при выдаче посылки, после взвешивания готового заказа с учетом упаковки.`
  } else {
    formData += `\nИтого (без доставки): ${totalPrice.value - delivery.value.price} руб. (100% ная оплата за заказ)\n`
    formData += `\n+ Стоимость доставки Почтой России ${delivery.value.price} рублей (Оплачивается при получении посылки)\n`
    formData += `\nТочную стоимость доставки озвучит Почта при выдаче посылки, после взвешивания готового заказа с учетом упаковки.\n`
  }

  formData += '\n=============================================\n'
  
  // =============== - =============== //

  formData += `\nПолучатель:\n`
  formData += `Город: ${addressee.value.city}\n`
  formData += `Адрес: ${addressee.value.point}\n`
  formData += `Имя: ${addressee.value.name}\n`
  formData += `Телeфон: ${addressee.value.phone}\n`
  formData += `Email: ${addressee.value.email}\n`
  formData += `VK: ${addressee.value.vk}\n`

  if (addressee.value.text) formData += `\n\nКоментарий к заказу: ${addressee.value.text}\n`

  let str = formData.replace(/&#171;/g, "«")
  str = str.replace(/&#187;/g, "»")
    
  useFetch('https:///maytimelenta.ru/mail.php', {
    method: 'POST',
    body: str
  })

  activeTab.value = 'thanks'

  // console.log(str)
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

function listPeople (item, isName, title, mail) {
  if (!mail && item && item.length > 0) {
    if (!isName) return `${title}(без имени): ${item.length}\n`

    let string = title + ':\n'

    for (const name of item) {
      string += '    ' + name + '\n'
    }

    return string
  }

  if (mail) {
    if (!isName) return `${title}(без имени): ${item.length}\n`

    let string = `\n${title}:\n`

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
      type="email"
      placeholder="E-mail для кассового чека"
      v-model="addressee.email"
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
        li(v-if="request.adultCount > 0" v-html="`Взрослые ленты: ${request.adultCount}шт. * ${allAdultPrice/allTapes}р. = ${allAdultPrice/allTapes * request.adultCount}р.`")
        li(v-if="request.childCount > 0" v-html="`Детские ленты: ${request.childCount}шт. * ${allChildPrice/allTapes}р. = ${allChildPrice/allTapes * request.childCount}р.\n`")
        li Шаблон: {{request.template}}
        li Цвет ленты: {{request.color.name}}
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

  .block(v-if="delivery.name === 'post' && delivery.price")
    p Стоимость доставки Почтой России {{delivery.price}} рублей (100%ная оплата за заказ, за доставку)

  .block(v-if="delivery.name === 'sdek' && addressee.city && delivery.price")
    p Предоплата: 50%
    p Оплата при получении(наложенный платеж): 50%
    p + Стоимость доставки СДЕК до {{addressee.city}} {{delivery.price}} рублей (оплачивается при получении посылки в СДЕК)

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
    Radio(
      :active="isPolicy"
      title='<span>Я согласен(сна) на <a href="https://maytimelenta.ru/policy/" target="_blank" rel="noopener noreferrer">обработку персональных данных</a></span>'
      @click="isPolicy = !isPolicy"
    )
    button.btn.thm_btn.red_btn.next_tab.gender-button.buttonsToStepWithAcs(
      @click="order"
    )
      span Заказать
</template>

<style scoped>
.btn {
  margin-top: 24px;
}
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