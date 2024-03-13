<script setup lang="ts">
const props = defineProps<{
  prices: {price: number}[]
  counts: {count: number}[] | boolean
  title: string
  img: string
  index: number
}>()

const selectedAcs = useSelectedAcs()

onBeforeMount(()=> {
  if (!selectedAcs.value[props.index]) selectedAcs.value[props.index] = {title: props.title, count: 0, price: 0}
})

const itemPrices = computed(()=> props.prices.reduce((acc:number[], item) => [...acc, item.price],[]))
const itemCounts = computed(()=> {
  if (props.counts) {return props.counts.reduce((acc:number[], item) => [...acc, item.count],[])}
  return 0
})

const oneItemPrice = computed(() => {
  if (props.prices.length === 1 ) return +props.prices[0].price
  if (!itemCounts.value) return +props.prices[0].price
  return selectOnePrice(selectedAcs.value[props.index].count, itemPrices.value, itemCounts.value)
})

function change() {
  selectedAcs.value[props.index].count++
  selectedAcs.value[props.index].count--
  selectedAcs.value[props.index].price = selectedAcs.value[props.index].count * oneItemPrice.value
}

function addItem() {
  selectedAcs.value[props.index].count++
  change()
}

function removeItem() {
  if (selectedAcs.value[props.index].count > 0) {
    selectedAcs.value[props.index].count--
    change()
  }
}
</script>

<template lang="pug">
.dop
  .dop__img-wrap
    img(
      :src="img"
      :alt="title"
      width="196"
      height="196"
      loading="lazy"
    )
  .dop__title(v-html="title")
  InputCounter(
    @remove="removeItem"
    @add="addItem"
    @input="change"
    v-model="selectedAcs[index].count"
  )
</template>
