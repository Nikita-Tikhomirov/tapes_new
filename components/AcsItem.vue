<script setup lang="ts">
const props = defineProps<{
  id: number
  prices: number[]
  title: string
  img: string
}>()

const totalPriceAcs = useAllPricesAcs()
const itemCounter = ref<number>(0)
const selectedAcs = useSelectedAcs()

watchEffect(() => {
  if (selectedAcs.value[props.title]) itemCounter.value = selectedAcs.value[props.title]
})

const oneItemPrice = computed(()=> {
  if (props.prices.length === 1) return props.prices[0]
  else if (props.title === 'Колокольчик "МАЙ"') return selectOnePrice(itemCounter.value, props.prices, [5, 19, 29, 49])
  else return selectOnePrice(itemCounter.value, props.prices, [3, 9, 29, 49])
})

function removeItem() {
  if (itemCounter.value !== 0) {
    itemCounter.value--
    selectedAcs.value[props.title] = itemCounter.value
    totalPriceAcs.value[props.id] = itemCounter.value * oneItemPrice.value 
  }
}

function addItem() {
  itemCounter.value++
  selectedAcs.value[props.title] = itemCounter.value
  totalPriceAcs.value[props.id] = itemCounter.value * oneItemPrice.value
}

function change() {
  selectedAcs.value[props.title] = itemCounter.value
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
    input.dop__counter.form-control.bell(v-if="selectedAcs[title]" type="number" v-model="selectedAcs[title]" @input="change")
    input.dop__counter.form-control.bell(v-else type="number" v-model="itemCounter" @input="change")
    .dop__plus(@click="addItem") +
</template>