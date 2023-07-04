export interface TypeRequest {
  price: number
  adultCount: number
  childCount: number
  template: string
  color: string
  print: string
  text: string
  names: { [key: string]: string[] }
}