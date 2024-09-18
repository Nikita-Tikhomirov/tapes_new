<script setup lang="ts">
const requests = useRequests()
const mails = useMails()
const selectedAcs = useSelectedAcs()
const addressee = useAddressee()

const props = defineProps<{
  isShow: boolean
}>()

const emit = defineEmits<{
  hideModal: []
}>()


function saveCash() {
  localStorage.setItem('requests', JSON.stringify(requests.value))
  localStorage.setItem('mails', JSON.stringify(mails.value))
  localStorage.setItem('selectedAcs', JSON.stringify(selectedAcs.value))
  localStorage.setItem('addressee', JSON.stringify(addressee.value))

  emit('hideModal')
}
</script>

<template lang="pug">
.cash-modal(v-if="props.isShow")
  p Сохранить Черновик?

  button.btn.thm_btn.blue_btn(
    @click="emit('hideModal')"
  ) Отмена
  button.btn.thm_btn.red_btn(
    @click="saveCash"
  ) Сохранить

</template>

<style lang="stylus">
.cash-modal
  z-index 999
  position fixed
  top 50%
  left 50%
  display grid
  gap: 12px
  padding 24px
  grid-template-columns 1fr 1fr
  background #fff
  border-radius 8px
  box-shadow 0 0 10px 0 rgba(0, 0, 0, 0.2)
  transform translate(-50%, -50%)

  p
    grid-column 1 / 3
    text-align center
    font-size 24px
</style>
