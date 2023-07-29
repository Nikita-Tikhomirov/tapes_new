export async function getTapesPrices() {
  const { data } = await useFetch<any>('https://tapes-wp.tihomirov.pro/wp-json/acf/v3/options/options/')

  //-------------------- --------------------//

  const adultPrices = useBasePrices()
  const adultPricesDiscount = useBasePricesDiscount()

  adultPrices.value = data.value.acf.adult.prices.reduce((acc:number[], item) => [...acc, item.price],[])
  adultPricesDiscount.value = data.value.acf.adult.counts.reduce((acc:number[], item) => [...acc, item.count],[])

  //-------------------- --------------------//

  const childPrices = useBasePricesChildren()
  const childPricesDiscount = useBasePricesChildrenDiscount()

  childPrices.value = data.value.acf.child.prices.reduce((acc:number[], item) => [...acc, item.price],[])
  childPricesDiscount.value = data.value.acf.child.counts.reduce((acc:number[], item) => [...acc, item.count],[])

  //-------------------- --------------------//

  const awardPrices = useAwardPrices()
  const awardPricesDiscount = useAwardPricesDiscount()

  awardPrices.value = data.value.acf['award-adult'].prices.reduce((acc:number[], item) => [...acc, item.price],[])
  awardPricesDiscount.value = data.value.acf['award-adult'].counts.reduce((acc:number[], item) => [...acc, item.count],[])  

  //-------------------- --------------------//

  const childAwardPrices = useAwardPricesChildren()
  const childAwardPricesDiscount = useAwardPricesChildrenDiscount()


  childAwardPrices.value = data.value.acf['award-child'].prices.reduce((acc:number[], item) => [...acc, item.price],[])
  childAwardPricesDiscount.value = data.value.acf['award-child'].counts.reduce((acc:number[], item) => [...acc, item.count],[])
}