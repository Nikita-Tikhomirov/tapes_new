export interface TypeRequest {
  price: number
  adultCount: number
  childCount: number
  template: string
  color: string
  print: string
  text: string
  isName: boolean
  names: {
    child: number
    adult: number
    [key: string]: string[] | number
  }
}

export interface TypeMails {
  countStandart: number
  countEdit: number
  countNames: number
}