<script setup lang="ts">
const activeTab = useActiveTab()
const requests = useRequests()

function addRequest() {
  requests.value.push({
    price: 0,
    adultCount: 0,
    childCount: 0,
    template: 1,
    color: '',
    print: '',
    text: '',
    names: {}
  })
}
</script>

<template>
<div class="body_wrapper frm-vh-md-100">
  <div class="formify_body formify_signup_fullwidth formify_signup_fullwidth_two d-flex">
    <div
      class="formify_left_fullwidth formify_left_top_logo frm-vh-md-100 d-flex align-items-center justify-content-center"
      data-bg-color="#FFEFF9" style="background-color: rgb(255, 239, 249);">
      <a class="top_logo">
        <img src="/img/logo.png" alt="">
      </a>
      <!-- <pre> {{ requests }} </pre> -->
      <img class="img-fluid" src="/img/personal_img.png" alt="">
    </div>
    <div class="formify_right_fullwidth d-flex align-items-center justify-content-center">
      <div class="form_tab_two">

        <Steps></Steps>

        <div class="tab-content" id="myTabContent">

          <TabWrap>
            <TabStart v-if="activeTab === 'start'"></TabStart>

            <TabAcs v-else-if="activeTab === 'acs'"></TabAcs>

            <TabDelivery v-else-if="activeTab === 'delivery'"></TabDelivery>

            <template v-else>
              <TabForm
                v-for="(request, i) in requests"
                :key="i"
                :index="i"
                :request="request"
              ></TabForm>
              <div class="addrequestButton" @click="addRequest">Добавить заявку</div>
            </template>
          </TabWrap>

        </div>

        <TotalPrice v-if="activeTab !== 'start'"></TotalPrice>
      </div>
    </div>
  </div>
</div>
</template>
