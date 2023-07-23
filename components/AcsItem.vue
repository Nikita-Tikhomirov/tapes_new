<script setup lang="ts">
const props = defineProps<{
  id: number
  prices: number[]
  title: string
  img: string
}>()

const totalPriceAcs = useAllPricesAcs()
const selectedAcs = useSelectedAcs()

onMounted(() => {
  if (!selectedAcs.value[props.title]) selectedAcs.value[props.title] = 0
})

const oneItemPrice = computed(() => {
  if (props.prices.length === 1) return props.prices[0]
  if (props.title === 'Колокольчик "МАЙ"') {
    return selectOnePrice(selectedAcs.value[props.title], props.prices, [5, 19, 29, 49])
  }
  return selectOnePrice(selectedAcs.value[props.title], props.prices, [3, 9, 29, 49])
})

function change() {
  totalPriceAcs.value[props.id] = selectedAcs.value[props.title] * oneItemPrice.value
}

function addItem() {
  selectedAcs.value[props.title]++
  change()
}

function removeItem() {
  if (selectedAcs.value[props.title] !== 0) {
    selectedAcs.value[props.title]--
    change()
  }
}
</script>

<template lang="pug">
.dop
  .dop__img-wrap
    img(:src="`/img/${img}`" alt="" loading="lazy")
  .dop__title {{ title }}
  InputCounter(
    @remove="removeItem"
    @add="addItem"
    @input="change"
    v-model="selectedAcs[title]"
  )
</template>
