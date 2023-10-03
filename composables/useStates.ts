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
  print: {
    name: 'Золото',
    isPrice: false
  },
  text: '',
  isName: false,
  namesCount: {
    child: 0,
    adult: 0,
  },
  names: {}
}])

export const useAddressee = () => useState('addressee', () => ({
  name: '',
  phone: '',
  vk: '',
  city: '',
  point: '',
  pointId: '',
  text: ''
}))

export const useTabsDesc = () => useState<{}>('tabsDesc', () => ({}))

//-------------------- Цены на ленты --------------------//

export const useBasePrices = () => useState<number[]>('basePrices', () => [])
export const useBasePricesDiscount = () => useState<number[]>('basePricesDiscount', () => [])

export const useBasePricesChildren = () => useState<number[]>('basePricesChildren', () => [])
export const useBasePricesChildrenDiscount = () => useState<number[]>('basePricesChildrenDiscount', () => [])

export const useAwardPrices = () => useState<number[]>('awardPrices', () => [])
export const useAwardPricesDiscount = () => useState<number[]>('awardPricesDiscount', () => [])

export const useAwardPricesChildren = () => useState<number[]>('awardPricesChildren', () => [])
export const useAwardPricesChildrenDiscount = () => useState<number[]>('awardPricesChildrenDiscount', () => [])

export const useAllTapes = () => useState<number>('allTapes', () => 0)

//-------------------- Дополнительные товары --------------------//

export const useSelectedAcs = () => useState<{title: string, count: number, price: number}[]>('selectedAcs', () => [])

//-------------------- Цены на письма --------------------//

export const useMails = () => useState<TypeMails>('mails', () => { return {
  countStandart: 0,
  countEdit: 0,
  countNames: 0,
  editText: '',
  namesText: '',
  date: '',
  place: '',
} })

export const useMailsPrices = () => useState<number[]>('mailsPrices', () => [53, 50, 45, 40, 37, 35])
export const useMailsDiscount = () => useState<number[]>('mailsDiscount', () => [3, 10, 30, 70, 100])

export const useMailsPriceEdit = () => useState<number>('mailsPriceEdit', () => 10)
export const useMailsPriceName = () => useState<number>('mailsPriceName', () => 20)

//-------------------- Цены на экспресс печать --------------------//

export const useFastPrint = () => useState<boolean>('fastPrint', () => false)
export const useFastPrintPrices = () => useState<number[]>('fastPrintPrices', () => [150, 120, 100, 70, 55, 45, 35, 25, 20, 15])

export const useTotalPrice = () => useState<number>('totalPrice', () => 0)
export const useDelivery = () => useState<string>('delivery', () => '')
