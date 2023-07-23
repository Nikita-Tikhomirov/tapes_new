<script setup lang="ts">
const activeTab = useActiveTab()
const requests = useRequests()

function addRequest() {
  requests.value.push({
    price: 0,
    adultCount: 0,
    childCount: 0,
    template: '1',
    color: 'Темно-бежевый',
    print: 'Золото',
    text: '',
    isName: false,
    names: {
      child: 0,
      adult: 0
    }
  })
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
        img(src="/img/logo.png" alt="" loading="lazy")
     
      img.img-fluid(src="/img/personal_img.png" alt="" loading="lazy")

    .formify_right_fullwidth.d-flex.align-items-center.justify-content-center
      .form_tab_two
        Steps
        TabWrap
          TabStart(v-if="activeTab === 'start'")
          TabAcs(v-else-if="activeTab === 'acs'")
          TabDelivery(v-else-if="activeTab === 'delivery'")
          template(v-else)
            TabForm(
              v-for="(request, i) in requests"
              :key="i"
              :index="i"
              :request="request"
            )
            .addrequestButton(@click="addRequest") Добавить заявку
        TotalPrice(v-if="activeTab !== 'start'")
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
