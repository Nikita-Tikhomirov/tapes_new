import { useMailsDiscount } from "./useStates"

export async function getMailsPrices() {
  const { data } = await useFetch<any>('https://maytimelenta.ru/wp-json/acf/v3/options/options/')

  const mailsPrices = useMailsPrices()
  const mailsDiscount = useMailsDiscount()
  const mailsPriceEdit = useMailsPriceEdit()
  const mailsPriceName = useMailsPriceName()

  mailsPrices.value = data.value.acf.mails.prices.reduce((acc:number[], item) => [...acc, item.price],[])
  mailsDiscount.value = data.value.acf.mails.counts.reduce((acc:number[], item) => [...acc, item.count],[])
  mailsPriceEdit.value = data.value.acf.mails.mails_edits
  mailsPriceName.value = data.value.acf.mails.mails_names
}