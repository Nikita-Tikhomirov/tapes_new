export async function getAcsDesc() {
  const { data } = await useFetch<any>('https://maytimelenta.ru/wp-json/acf/v3/options/options/')

  const tabsDesc = useTabsDesc()

  tabsDesc.value.acs = data.value.acf.acs
  tabsDesc.value.vipuskniki = data.value.acf.vipuskniki
  tabsDesc.value.school = data.value.acf.vipuskniki
  tabsDesc.value.todlers = data.value.acf.todlers
  tabsDesc.value.firstclass = data.value.acf.firstclass
  tabsDesc.value.award = data.value.acf.award
}