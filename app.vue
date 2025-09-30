<script setup lang="ts">
const { data } = await useFetch<any>('https://maytimelenta.ru/wp-json/acf/v3/options/options/')

const postPrice = usePostPrice()
const sdekMskPrice = useSdekMskPrice()
const sdekSpbPrice = useSdekSpbPrice()

const sdekPrices = useSdekPrices()
const sdekPricesNew = useSdekPricesNew()
const sdekPricesExtraPercent = useSdekPricesExtraPercent()

const activeTab = useActiveTab()
const requests = useRequests()
const mails = useMails()
const selectedAcs = useSelectedAcs()
const addressee = useAddressee()
const colors = useColors()
const print = usePrint()
const isShowCash = ref(false)

colors.value = data.value.acf.color
print.value = data.value.acf.color_print
postPrice.value = +data.value.acf.post_price

if (data.value.acf.sdek_msk) sdekMskPrice.value = +data.value.acf.sdek_msk
if (data.value.acf.sdek_spb) sdekSpbPrice.value = +data.value.acf.sdek_spb

if (data.value.acf.sdek_prices) sdekPrices.value = data.value.acf.sdek_prices
if (data.value.acf.sdek_prices_new) sdekPricesNew.value = data.value.acf.new_prices
if (data.value.acf.sdek_prices_extra_percent) sdekPricesExtraPercent.value = +data.value.acf.extra_percent

onBeforeMount(()=> {
  getTapesPrices()
  getMailsPrices()
  getAcsDesc()

  window.addEventListener('beforeunload', function (event) {
    event.preventDefault();
    event.returnValue = '';
    isShowCash.value = true
  });

  const cashRequests = localStorage.getItem('requests')
  const cashMails = localStorage.getItem('mails')
  const cashSelectedAcs = localStorage.getItem('selectedAcs')
  const cashAddressee = localStorage.getItem('addressee')

  if (cashRequests) {
    requests.value = JSON.parse(cashRequests)
  }

  if (cashMails) {
    mails.value = JSON.parse(cashMails)
  }

  if (cashSelectedAcs) {
    selectedAcs.value = JSON.parse(cashSelectedAcs)
  }

  if (cashAddressee) {
    addressee.value = JSON.parse(cashAddressee)
  }
})

function addRequest() {
  requests.value.push({
    price: 0,
    adultCount: 0,
    childCount: 0,
    template: '1',
    color: {
      name: 'Темно-бежевый',
      isPrice: false
    },
    print: {
      name: 'Золото',
      isPrice: false,
    },
    text: '',
    isName: false,
    namesCount: {
      child: 0,
      adult: 0
    },
    names: {}
  })
}

function removeRequest(index: number) {
  requests.value.splice(index, 1)
}
</script>

<template lang="pug">
.body_wrapper.frm-vh-md-100
  .formify_body.formify_signup_fullwidth.formify_signup_fullwidth_two.d-flex
    .formify_left_fullwidth.formify_left_top_logo.frm-vh-md-100.d-flex.align-items-center.justify-content-center(
      data-bg-color="#FFEFF9"
      style="background-color: rgb(255, 239, 249)"
    )
      .top_logo
        img(:src="data.acf.logo" alt="" loading="lazy")
     
      img.img-fluid(:src="data.acf.image" alt="" loading="lazy")

    .formify_right_fullwidth.d-flex.align-items-center.justify-content-center
      .form_tab_two
        Steps(v-if="activeTab !== 'thanks'")
        TabWrap
          TabStart(v-if="activeTab === 'start'")
          TabAcs(v-else-if="activeTab === 'acs'")
          TabDelivery(v-else-if="activeTab === 'delivery'")
          template(v-else-if="activeTab !== 'thanks'")
            TabForm(
              v-for="(request, i) in requests"
              :key="i"
              :index="i"
              :request="request"
              @removeRequest="removeRequest"
            )
            .addrequestButton(@click="addRequest") Добавить заявку
        TotalPrice(v-if="activeTab !== 'start' && activeTab !== 'thanks'")
  Cash(
    :isShow="isShowCash"
    @hideModal="isShowCash = false"
  )
</template>

<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"],
input[type="number"]:hover,
input[type="number"]:focus {
  appearance: none;
  -moz-appearance: number-input;
}
</style>
