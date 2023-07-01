<script setup lang="ts">
const adult = useAllAdult()
const child = useAllChild()

const adultPrices = useBasePrices()
const childPrices = useBasePricesChildren()

const isPriceColor = usePriceColor()
const isPricePrint = usePricePrint()

const totalPriceAcs = useAllPricesAcs()
const acsAllPrice = computed(() => {
  if(totalPriceAcs.value.length > 0) return totalPriceAcs.value.reduce((a,b)=>b+a)
  return 0
})

const price = computed(() => {
  const adultOnePrice = selectPrice(adult.value, adultPrices.value)
  const childOnePrice = selectPrice(child.value, childPrices.value)
  const colorPrice = isPriceColor.value ? (adult.value + child.value) * 25 : 0
  const printPrice = isPricePrint.value ? (adult.value + child.value) * 25 : 0
  
  return (adult.value * adultOnePrice) + (child.value * childOnePrice) + acsAllPrice.value + colorPrice + printPrice
})


function selectPrice(number:number, prices:number[]) {
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