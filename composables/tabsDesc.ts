interface ApiResponse {
  acf: {
    acs: string
    vipuskniki: string
    todlers: string
    firstclass: string
    award: string
  }
}

export async function getAcsDesc(): Promise<void> {
  const { data } = await useFetch<ApiResponse>('https://maytimelenta.ru/wp-json/acf/v3/options/options/')

  const tabsDesc = useTabsDesc()

  const dataValue = data.value?.acf

  if (dataValue) {
    tabsDesc.value.acs = dataValue.acs
    tabsDesc.value.vipuskniki = dataValue.vipuskniki
    tabsDesc.value.school = dataValue.vipuskniki
    tabsDesc.value.todlers = dataValue.todlers
    tabsDesc.value.firstclass = dataValue.firstclass
    tabsDesc.value.award = dataValue.award
  }
}