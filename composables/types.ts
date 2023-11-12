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
  standart: {
    count: number
    price: number
  }
  edit: {
    count: number
    price: number
  }
  names: {
    count: number
    price: number
  }
  editText: string
  namesText: string
  date: string
  place: string
}