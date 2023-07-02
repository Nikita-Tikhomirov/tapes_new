<script setup lang="ts">
const activeTab = useActiveTab()
const requests = useRequests()

const isPriceColor = usePriceColor()
const isPricePrint = usePricePrint()

const totalPriceAcs = useAllPricesAcs()
const acsAllPrice = computed(() => {
  if(totalPriceAcs.value.length > 0) return totalPriceAcs.value.reduce((a,b)=>b+a)
  return 0
})

const price = computed(() => {
  const adultPrices = activeTab.value === 'award' ? useAwardPrices() : useBasePrices()
  const childPrices = activeTab.value === 'award' ? useAwardPricesChildren() : useBasePricesChildren()

  let allAdult = 0
  let allChild = 0

  requests.value.forEach(request => {
    allAdult += request.adultCount
    allChild += request.childCount
  })

  const adultOnePrice = selectOnePrice(allAdult, adultPrices.value)
  const childOnePrice = selectOnePrice(allChild, childPrices.value)

  const colorPrice = isPriceColor.value ? (allAdult + allChild) * 25 : 0
  const printPrice = isPricePrint.value ? (allAdult + allChild) * 25 : 0

  requests.value.forEach(request => {
    request.price = (request.adultCount * adultOnePrice) + (request.childCount * childOnePrice)
  })
  
  
  return (allAdult * adultOnePrice) + (allChild * childOnePrice) + acsAllPrice.value + colorPrice + printPrice
})

function selectOnePrice(number:number, prices:number[], quantity:number[] = [2,4,7,9,15,19,50,100,150,200]) {
  // quantity.forEach(item => {})
  
  if (number <= 2) return prices[0]
  else if (number <= 4) return prices[1]
  else if (number <= 7) return prices[2]
  else if (number <= 9) return prices[3]
  else if (number <= 15) return prices[4]
  else if (number <= 19) return prices[5]
  else if (number <= 50) return prices[6]
  else if (number <= 100) return prices[7]
  else if (number <= 150) return prices[8]
  else if (number <= 200) return prices[9]
  else return prices[10]
}
</script>

<template>
<div class="price">Цена: <span class="counter">{{ price }}</span><span> Р</span></div>
</template>