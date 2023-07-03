<script setup lang="ts">
const props = defineProps<{
  id: number
  prices: number[]
  title: string
  img: string
}>()

const totalPriceAcs = useAllPricesAcs()
const itemCounter = ref<number>(0)

const oneItemPrice = computed(()=> {
  if (props.prices.length === 1) return props.prices[0]
  else if (props.title === 'Колокольчик "МАЙ"') return selectOnePrice(itemCounter.value, props.prices, [5, 19, 29, 49])
  else return selectOnePrice(itemCounter.value, props.prices, [3, 9, 29, 49])
})

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
}
</script>

<template lang="pug">
.dop
  .dop__img-wrap
    img(:src="`/img/${img}`" alt="")

  .dop__title {{ title }}

  .dop__controls-wrap
    .dop__minus(@click="removeItem") -
    input.dop__counter.form-control.bell(type="number" v-model="itemCounter" @input="change")
    .dop__plus(@click="addItem") +
</template>