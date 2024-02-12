export function selectOnePrice(number:number, prices:number[], quantity:number[]):number {   
  if (+number <= +quantity[0]) return +prices[0]
  if (+number > +quantity[quantity.length-1]) return +prices[prices.length-1]

  let onePrice = +prices[0]
  for (let i = 0; i < quantity.length; i++) {    
    if (+number >= +quantity[i]) {
      onePrice = +prices[i]
    }
  }

  return onePrice
}
