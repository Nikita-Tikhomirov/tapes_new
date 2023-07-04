<script setup lang="ts">
import type { TypeRequest } from '~/composables/types';

const activeTab = useActiveTab()
const requests = useRequests()
const fastPrint = useFastPrint()
const fastPrintPrices = useFastPrintPrices()
const allTapes = useAllTapes()

//-------------------- Цена за ленты --------------------//

const allAdult = computed(()=> requests.value.reduce((a,b)=> a+b.adultCount, 0))
const allChild = computed(()=> requests.value.reduce((a,b)=> a+b.childCount, 0))

const tapesPrice = computed(()=> {
  const adultPrices = activeTab.value === 'award' ? useAwardPrices() : useBasePrices()
  const childPrices = activeTab.value === 'award' ? useAwardPricesChildren() : useBasePricesChildren()

  allTapes.value = allAdult.value + allChild.value
  const fastPrintPrice = computed(() => {
    const onePrice = selectOnePrice(allTapes.value, fastPrintPrices.value, [1, 3, 5, 10, 15, 20, 50, 100, 200])
    return allTapes.value * onePrice
  })

  let adultOnePrice = selectOnePrice(allAdult.value, adultPrices.value, [2,4,7,9,15,19,50,100,150,200])
  let childOnePrice = selectOnePrice(allChild.value, childPrices.value, [2,4,7,9,15,19,50,100,150,200])

  let allPrice = 0

  requests.value.forEach(request => {    
    if (request.color === 'true' && request.print === 'true') {
      adultOnePrice += 50
      childOnePrice += 50
    } else if (request.color === 'true' || request.print === 'true') {
      adultOnePrice += 25
      childOnePrice += 25
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
  const uniqueTemplate = templates.value.filter((item, pos) => {
    return templates.value.indexOf(item) == pos;
  })
  if (uniqueTemplate.length > 3 && (allAdult.value + allChild.value) < 20) return 100 * (uniqueTemplate.length - 3)
  return 0
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

//-------------------- Общая цена --------------------//

const price = computed(() => { 
  return tapesPrice.value + templatesPrice.value + acsAllPrice.value + mailsPrice.value
})
</script>

<template lang="pug">
.price Цена: 
  span.counter  {{ price }} 
  span  Р
</template>