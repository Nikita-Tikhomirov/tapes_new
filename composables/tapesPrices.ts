export async function getTapesPrices() {
  const { data } = await useFetch<any>('https://maytimelenta.ru/wp-json/acf/v3/options/options/')

  const dataValue = data.value.acf
  //-------------------- --------------------//

  const adultPrices = useBasePrices()
  const adultPricesDiscount = useBasePricesDiscount()

  adultPrices.value = dataValue.adult.prices.reduce((acc:number[], item) => [...acc, item.price],[])
  adultPricesDiscount.value = dataValue.adult.counts.reduce((acc:number[], item) => [...acc, item.count],[])

  //-------------------- --------------------//

  const childPrices = useBasePricesChildren()
  const childPricesDiscount = useBasePricesChildrenDiscount()

  childPrices.value = dataValue.child.prices.reduce((acc:number[], item) => [...acc, item.price],[])
  childPricesDiscount.value = dataValue.child.counts.reduce((acc:number[], item) => [...acc, item.count],[])

  //-------------------- --------------------//

  const awardPrices = useAwardPrices()
  const awardPricesDiscount = useAwardPricesDiscount()

  awardPrices.value = dataValue['award-adult'].prices.reduce((acc:number[], item) => [...acc, item.price],[])
  awardPricesDiscount.value = dataValue['award-adult'].counts.reduce((acc:number[], item) => [...acc, item.count],[])  

  //-------------------- --------------------//

  const childAwardPrices = useAwardPricesChildren()
  const childAwardPricesDiscount = useAwardPricesChildrenDiscount()


  childAwardPrices.value = dataValue['award-child'].prices.reduce((acc:number[], item) => [...acc, item.price],[])
  childAwardPricesDiscount.value = dataValue['award-child'].counts.reduce((acc:number[], item) => [...acc, item.count],[])

  //-------------------- --------------------//

  const fastPrintPrices = useFastPrintPrices()
  const fastPrintPricesDiscount = useFastPrintDiscount()

  fastPrintPrices.value = dataValue.fast_print.prices.reduce((acc:number[], item) => [...acc, item.price],[])
  fastPrintPricesDiscount.value = dataValue.fast_print.counts.reduce((acc:number[], item) => [...acc, item.count],[])
}