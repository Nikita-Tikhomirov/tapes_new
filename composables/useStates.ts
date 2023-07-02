import type { TypeRequest } from "./types"

//-------------------- Табы --------------------//

export const useNextTab = () => useState<string>('nextTab', () => '')
export const useActiveTab = () => useState<string>('activeTab', () => 'start')

//-------------------- Заказы --------------------//

export const useRequests = () => useState<TypeRequest[]>('request', () => [{
  price: 0,
  adultCount: 0,
  childCount: 0,
  template: 1,
  color: '',
  print: '',
  text: '',
  names: {}
}])

//-------------------- Дополнительные товары --------------------//

export const useAllPricesAcs = () => useState<number[]>('acsPrices', () => [])

//-------------------- Цены на ленты --------------------//

export const useBasePrices = () => useState<number[]>('basePrices', () => [320, 265, 220, 190, 170, 147, 140, 131, 125, 115, 108, 103])
export const useBasePricesChildren = () => useState<number[]>('basePricesChildren', () => [200, 180, 155, 135, 130, 120, 105, 102, 99, 95])
export const useAwardPrices = () => useState<number[]>('awardPrices', () => [370, 310, 230, 165, 145, 135, 125, 120, 115, 110, 105])
export const useAwardPricesChildren = () => useState<number[]>('awardPricesChildren', () => [370, 310, 230, 165, 145, 135, 125, 120, 115, 110, 105])

// ---
export const usePriceColor = () => useState<boolean>('priceColor', () => false)
export const usePricePrint = () => useState<boolean>('pricePrint', () => false)
