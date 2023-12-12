export interface TypeRequest {
  price: number
  adultCount: number
  childCount: number
  template: string
  color: string
  print: {
    name: string
    isPrice: boolean
  }
  text: string
  isName: boolean
  namesCount: {
    child: number
    adult: number
  }
  names: {
    [key: string]: {
      title: string
      names: string[]
    }
  }
}

export interface TypeMails {
  standartLastCall: {
    count: number
    price: number
  }
  standartFinal: {
    count: number
    price: number
  }
  editLastCall: {
    count: number
    price: number
  }
  editFinal: {
    count: number
    price: number
  }
  namesLastCall: {
    count: number
    price: number
  }
  namesFinal: {
    count: number
    price: number
  }
  editText: string
  namesText: string
  date: string
  place: string
}