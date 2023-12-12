<script setup lang="ts">
import type { TypeRequest } from '~/composables/types';

const activeTabForm = useTabForm()
const requests = useRequests()
const fastPrint = useFastPrint()
const fastPrintPrices = useFastPrintPrices()
const fastPrintPricesDiscount = useFastPrintDiscount()
const allTapes = useAllTapes()
const totalPrice = useTotalPrice()
const delivery = useDelivery()

//-------------------- Цена за ленты --------------------//

const allAdult = computed(()=> requests.value.reduce((a,b)=> a + b.adultCount, 0))
const allChild = computed(()=> requests.value.reduce((a,b)=> a + b.childCount, 0))

const allChildPrice = useAllChildPrice()
const allAdultPrice = useAllAdultPrice()

// const AllColorsUniq = computed(()=> requests.value.reduce((a, b)=> {
//   if (a.includes(b.color)) return a
//   return [...a, b.color]
// }, []))

const tapesPrice = computed(()=> {
  const adultPrices = activeTabForm.value === 'award' ? useAwardPrices() : useBasePrices()
  const adultDiscount = activeTabForm.value === 'award' ? useAwardPricesDiscount() : useBasePricesDiscount()
  const childPrices = activeTabForm.value === 'award' ? useAwardPricesChildren() : useBasePricesChildren()
  const childDiscount = activeTabForm.value === 'award' ? useAwardPricesChildrenDiscount() : useBasePricesChildrenDiscount()

  allTapes.value = +allAdult.value + +allChild.value
  
  const fastPrintPrice = computed(() => {
    const onePrice = selectOnePrice(allTapes.value, fastPrintPrices.value, fastPrintPricesDiscount.value)
    return allTapes.value * onePrice
  })

  let adultOnePrice = selectOnePrice(allAdult.value, adultPrices.value, adultDiscount.value)
  let childOnePrice = selectOnePrice(allChild.value, childPrices.value, childDiscount.value)
  let allPrice = 0

  const requestTapes:number[] = []
  requests.value.forEach(request => {
    const tapes = request.adultCount + request.childCount
    requestTapes.push(tapes)
  })

  requests.value.forEach(request => {
    // const tapes = request.adultCount + request.childCount
  
    if (request.print.isPrice) {
      adultOnePrice += 25
      childOnePrice += 25
    }
    // else {
    //   adultOnePrice -= 25
    //   childOnePrice -= 25
    // }

    // let colorPrice = selectOnePrice(tapes, [50,35,25,15,10,10], [1,4,7,9,19])

    // const maxIndex = Math.max.apply(null, requestTapes)
    // const index = requestTapes.indexOf(maxIndex)

    // if (tapes < 20 && AllColorsUniq.value.length > 1 && request !== requests.value[index]) {
    //   adultOnePrice += colorPrice
    // }

    allChildPrice.value = request.childCount * childOnePrice
    allAdultPrice.value = request.adultCount * adultOnePrice
  
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

const mails = useMails()

const mailsPrice = computed(() => {
  const standartFinal = mails.value.standartFinal.count * mails.value.standartFinal.price
  const standartLastCall = mails.value.standartLastCall.count * mails.value.standartLastCall.price

  const editFinal = mails.value.editFinal.count * mails.value.editFinal.price
  const editLastCall = mails.value.editLastCall.count * mails.value.editLastCall.price

  const namesFinal = mails.value.namesFinal.count * mails.value.namesFinal.price
  const namesLastCall = mails.value.namesLastCall.count * mails.value.namesLastCall.price

  return standartFinal + standartLastCall + editFinal + editLastCall + namesFinal + namesLastCall
})

//-------------------- Общая цена --------------------//

const price = computed(() => {
  const sum = tapesPrice.value + templatesPrice.value + acsAllPrice.value + mailsPrice.value + delivery.value.price
  totalPrice.value = sum
  return sum
})
</script>

<template lang="pug">
.price Предварительная стоимость вашего заказа:<br>
  span.counter {{ price }} 
  span  Р
</template>