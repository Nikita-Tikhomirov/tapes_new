
export function deliverySdekPrice(
  price: number,
  sdekPrices: {price: string}[],
  newPrices: {price: string}[],
  extraPercent: string // процент для цены выше последнего лимита
) {
  for (let i = 0; i < sdekPrices.length; i++) {
    if (price <= +sdekPrices[i].price) {
      const val = +newPrices[i].price
      return val === 0 ? price : val
    }
  }

  // если больше последнего лимита
  return price + price * +extraPercent
}