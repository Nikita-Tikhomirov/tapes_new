<script setup lang="ts">
import type { TypeRequest } from '~/composables/types';

const activeTab = useActiveTab()
const requests = useRequests()
const fastPrint = useFastPrint()
const fastPrintPrices = useFastPrintPrices()
const allTapes = useAllTapes()
const totalPrice = useTotalPrice()
const delivery = useDelivery()

//-------------------- Цена за ленты --------------------//

const allAdult = computed(()=> requests.value.reduce((a,b)=> a + b.adultCount, 0))
const allChild = computed(()=> requests.value.reduce((a,b)=> a + b.childCount, 0))

const AllColorsUniq = computed(()=> requests.value.reduce((a, b)=> {
  if (a.includes(b.color)) return a
  return [...a, b.color]
}, []))

const tapesPrice = computed(()=> {
  const adultPrices = activeTab.value === 'award' ? useAwardPrices() : useBasePrices()
  const childPrices = activeTab.value === 'award' ? useAwardPricesChildren() : useBasePricesChildren()

  allTapes.value = allAdult.value + allChild.value
  
  const fastPrintPrice = computed(() => {
    const onePrice = selectOnePrice(allTapes.value, fastPrintPrices.value, [1,3,5,10,15,20,50,100,200])
    return allTapes.value * onePrice
  })

  const adultDiscount = activeTab.value === 'award' ? useAwardPricesDiscount() : useBasePricesDiscount()
  const childDiscount = activeTab.value === 'award' ? useAwardPricesChildrenDiscount() : useBasePricesChildrenDiscount()

  let adultOnePrice = selectOnePrice(allAdult.value, adultPrices.value, adultDiscount.value)
  let childOnePrice = selectOnePrice(allChild.value, childPrices.value, childDiscount.value)
  let allPrice = 0

  const requestTapes:number[] = []
  requests.value.forEach(request => {
    const tapes = request.adultCount + request.childCount
    requestTapes.push(tapes)
  })

  requests.value.forEach(request => {
    const tapes = request.adultCount + request.childCount
  
    if (request.print === 'true') {
      adultOnePrice += 25
      childOnePrice += 25
    }

    let colorPrice = selectOnePrice(tapes, [50,35,25,15,10,10], [1,4,7,9,19])

    const maxIndex = Math.max.apply(null, requestTapes)
    const index = requestTapes.indexOf(maxIndex)

    if (tapes < 20 && AllColorsUniq.value.length > 1 && request !== requests.value[index]) {
      adultOnePrice += colorPrice
    }
  
    request.price = (request.adultCount * adultOnePrice) + (request.childCount * childOnePrice)
    allPrice += request.price
  })

  
  if (fastPrint.value) return allPrice + fastPrintPrice.value
  return allPrice
})

//-------------------- Цена за макеты --------------------//

const templates = computed(()=> {
  return requests.value.reduce((acc:number[], item:TypeRequest):number[] => {       
    return [...acc, +item.template]
  }, [])
})

const templatesPrice = computed(()=> {
  const uniqueTemplate = [...new Set(templates.value)]
  
  if (uniqueTemplate.length > 3 && (allAdult.value + allChild.value) < 20) return 100 * (uniqueTemplate.length - 3)
  return 0
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

const mailsPrice = computed(() => {
  const count = mails.value.countStandart + mails.value.countEdit + mails.value.countNames

  let onePrice = selectOnePrice(count, mailsPrices.value, [3, 10, 30, 70, 100])
  let onePriceEdit = onePrice + 10
  let onePriceNames = onePrice + 20

  return (onePrice * mails.value.countStandart) + (onePriceEdit * mails.value.countEdit) + (onePriceNames * mails.value.countNames)
})

//-------------------- Общая цена --------------------//

const price = computed(() => { 
  const post = delivery.value === 'post' ? 500 : 0
  const sum = tapesPrice.value + templatesPrice.value + acsAllPrice.value + mailsPrice.value + post
  totalPrice.value = sum
  return sum
})
</script>

<template lang="pug">
.price Предварительная стоимость вашего заказа:<br>
  span.counter {{ price }} 
  span  Р
</template>