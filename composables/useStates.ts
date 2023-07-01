export const useNextTab = () => useState<string>('nextTab', () => '')

export const useSelectedTab = () => useState<string>('selectedTab', () => 'start')
export const useShowForm = () => useState<boolean>('showForm', () => false)

export const useAllAdult = () => useState<number>('allAdult', () => 0)
export const useAllChild = () => useState<number>('allChild', () => 0)

export const useBasePrices = () => useState<number[]>('basePrices', () => [320, 265, 220, 190, 170, 147, 140, 131, 125, 115, 108, 103])
export const useBasePricesChildren = () => useState<number[]>('basePricesChildren', () => [200, 180, 155, 135, 130, 120, 105, 102, 99, 95])

export const useAllPricesAcs = () => useState<number[]>('acsPrices', () => [])
export const usePriceColor = () => useState<boolean>('priceColor', () => false)
export const usePricePrint = () => useState<boolean>('pricePrint', () => false)

