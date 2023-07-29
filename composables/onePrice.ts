export function selectOnePrice(number:number, prices:number[], quantity:number[]):number {
  let onePrice = prices[0]

  for (let i = 0; i < quantity.length; i++) {    
    if (number <= +quantity[i]) {
      onePrice = prices[i]
      break
    }
  }

  if (number > quantity[quantity.length-1]) onePrice = prices[prices.length-1]
  
  return onePrice
}
