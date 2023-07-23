import type { TypeRequest, TypeMails } from "./types"

//-------------------- Табы --------------------//

export const useNextTab = () => useState<string>('nextTab', () => '')
export const useActiveTab = () => useState<string>('activeTab', () => 'start')

//-------------------- Заявки --------------------//

export const useRequests = () => useState<TypeRequest[]>('request', () => [{
  price: 0,
  adultCount: 0,
  childCount: 0,
  template: '1',
  color: 'Темно-бежевый',
  print: 'Золото',
  isName: false,
  text: '',
  names: {
    child: 0,
    adult: 0,
  }
}])

//-------------------- Цены на ленты --------------------//

export const useBasePrices = () => useState<number[]>('basePrices', () => [320, 265, 220, 190, 170, 147, 140, 131, 125, 115, 108, 103])
export const useBasePricesChildren = () => useState<number[]>('basePricesChildren', () => [180,170,145,130,115,105,99,95,91,88])

export const useAwardPrices = () => useState<number[]>('awardPrices', () => [280,250,210,150,135,125,120,115,110,105,100])
export const useAwardPricesChildren = () => useState<number[]>('awardPricesChildren', () => [370, 310, 230, 165, 145, 135, 125, 120, 115, 110, 105])

export const useAllTapes = () => useState<number>('allTapes', () => 0)

//-------------------- Дополнительные товары --------------------//

export const useSelectedAcs = () => useState<{ [key: string]: number }>('selectedAcs', () => { return {} })
export const useAllPricesAcs = () => useState<number[]>('acsPrices', () => [])

//-------------------- Цены на письма --------------------//

export const useMails = () => useState<TypeMails>('mails', () => { return {
  countStandart: 0,
  countEdit: 0,
  countNames: 0
} })
export const useMailsPrices = () => useState<number[]>('mailsPrices', () => [53, 50, 45, 40, 37, 35])

//-------------------- Цены на экспресс печать --------------------//

export const useFastPrint = () => useState<boolean>('fastPrint', () => false)
export const useFastPrintPrices = () => useState<number[]>('fastPrintPrices', () => [150, 120, 100, 70, 55, 45, 35, 25, 20, 15])

export const useTotalPrice = () => useState<number>('totalPrice', () => 0)
export const useDelivery = () => useState<string>('delivery', () => '')
