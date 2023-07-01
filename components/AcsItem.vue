<script setup lang="ts">
const props = defineProps<{
  id: number
  prices: number[]
  title: string
  img: string
}>()

const totalPriceAcs = useAllPricesAcs()
const itemCounter = ref(0)

const oneItemPrice = computed(()=> {
  if (props.prices.length === 1) return props.prices[0]
  else if (props.title === 'Колокольчик "МАЙ"') return selectPriceDop(props.prices, [5, 19, 29, 49])
  else return selectPriceDop(props.prices)
})

function selectPriceDop(pricesArr:number[], arr:number[] = [3, 9, 29, 49]):number {
  if (itemCounter.value <= arr[0]) return pricesArr[0]
  else if (itemCounter.value <= arr[1]) return pricesArr[1]
  else if (itemCounter.value <= arr[2]) return pricesArr[2]
  else if (itemCounter.value <= arr[3]) return pricesArr[3]
  else return pricesArr[4]
}

function removeItem() {
  if (itemCounter.value !== 0) {
    itemCounter.value--
    totalPriceAcs.value[props.id] = itemCounter.value * oneItemPrice.value
  }
}
function addItem() {
  itemCounter.value++
  totalPriceAcs.value[props.id] = itemCounter.value * oneItemPrice.value
}

function change() {
  totalPriceAcs.value[props.id] = itemCounter.value * oneItemPrice.value
  console.log(totalPriceAcs.value)
  
}
</script>

<template>
<div class="dop">
  <div class="dop__img-wrap"><img :src="`/img/${img}`" alt=""></div>
  <div class="dop__title">{{ title }}</div>
  <div class="dop__controls-wrap">
    <div class="dop__minus" @click="removeItem">-</div>
    <input type="number" class="dop__counter form-control bell" v-model="itemCounter" @input="change">
    <div class="dop__plus" @click="addItem">+</div>
  </div>
</div>
</template>