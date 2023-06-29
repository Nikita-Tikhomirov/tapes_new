//  Заполнение учителей

const allTeachersInputs = document.querySelectorAll('.teachers')

function priceRebuild() {
  
  //-------------------- Лента --------------------//
  
  if (startChoice !== 'vipuskniki') {
    priceForOne = selectPrice(howManyAdults, basePriceArr)
    priceForOneChild = selectPrice(howManyChildrens, basePriceArrChildrens)
  } else {
    priceForOne = selectPrice(howManyCounter, basePriceArr)
  }

  //-------------------- Dops --------------------//

  const allInputsBells = document.querySelectorAll('.bell')
  const allInputsButerfly = document.querySelectorAll('.buterfly')
  const allDopsInputs = document.querySelectorAll('.dop__counter')
  let allDopsPrice = 0

  selectPriceDop(allInputsBells[0], bellPriceArr1) // Условия для основы(колоколчиков Красивый)
  selectPriceDop(allInputsBells[1], bellPriceArr2) // Условия для основы(колоколчиков Лучший выпуск)
  selectPriceDop(allInputsBells[2], bellPriceArr3, [5,19,29,49]) // Условия для основы(колоколчиков МАЙ)

  selectPriceDop(allInputsButerfly[0], buterflyPriceArr1) // Бабочки Элегант
  selectPriceDop(allInputsButerfly[1], buterflyPriceArr2) //  Бабочки "Выпускник"
  selectPriceDop(allInputsButerfly[2], buterflyPriceArr3) // Бабочки "Кашемир" Премиум ( только бордо )

  allDopsInputs.forEach(item => {
    const priceForOneDopNow = item.getAttribute('data-doppriceforone')
    const howManyDopsNow = item.value

    allDopsPrice = allDopsPrice + (priceForOneDopNow * howManyDopsNow)
  });

  //-------------------- Colors --------------------//

  const allColorInputs = document.querySelectorAll(`.${startChoice} .printColor, .${startChoice} .colorSelect`)
  let allColorPrice = 0

  allColorInputs.forEach(item => {
    const requestWrap = item.parentElement.parentElement
    const isColor = item.options[item.options.selectedIndex].getAttribute('data-color')

    if (startChoice === 'vipuskniki') {
      const howManyOnRequest = requestWrap.querySelector('.howMany').value
      if (isColor === 'true') allColorPrice += +howManyOnRequest * 25
    } else {
      const howManyAdults = requestWrap.querySelector('.howManySchoolAdult').value
      const howManyChildrens = requestWrap.querySelector('.howManySchoolChild').value
      if (isColor === 'true') allColorPrice += (+howManyAdults + +howManyChildrens) * 25
    }
  })

  //-------------------- Mails --------------------//

  //-------------------- Total --------------------//

  const totalOuter = document.querySelector('.counter')
  // console.log(howManyCounter);
  // totalOuter.textContent = howManyCounter * (priceForOne + bellPrice[0] + bantPrice[0] + buterflyPrice[0] + butonsPrice[0] + bellTextPrice + mailsInputCounter)

  if (startChoice !== 'vipuskniki') {
    totalOuter.textContent = (howManyChildrens * priceForOneChild) + (howManyAdults * priceForOne) + allDopsPrice + mailsInputCounter + (priceMaket * howManyMakets) + allColorPrice
  } else {
    totalOuter.textContent = (howManyCounter * priceForOne) + allDopsPrice + mailsInputCounter + (priceMaket * howManyMakets) + allColorPrice
  }
}

//-------------------- selectPrice --------------------//

function selectPrice(quantity, pricesArr) {
  let price = priceForOneChild

  if (quantity <= 2) price = pricesArr[0]
    else if (quantity <= 4) price = pricesArr[1]
    else if (quantity <= 7) price = pricesArr[2]
    else if (quantity <= 9) price = pricesArr[3]
    else if (quantity <= 15) price = pricesArr[4]
    else if (quantity <= 19) price = pricesArr[5]
    else if (quantity <= 50) price = pricesArr[6]
    else if (quantity <= 100) price = pricesArr[7]
    else if (quantity <= 150) price = pricesArr[8]
    else if (quantity <= 200) price = pricesArr[9]
    else price = pricesArr[10]

    return price
}

//-------------------- selectPriceDop --------------------//

function selectPriceDop(dop, pricesArr, arr = [3, 9, 29, 49]) {
  if (dop.value <= arr[0]) dop.setAttribute('data-dopPriceForOne', pricesArr[0])
  else if (dop.value <= arr[1]) dop.setAttribute('data-dopPriceForOne', pricesArr[1])
  else if (dop.value <= arr[2]) dop.setAttribute('data-dopPriceForOne', pricesArr[2])
  else if (dop.value <= arr[3]) dop.setAttribute('data-dopPriceForOne', pricesArr[3])
  else dop.setAttribute('data-dopPriceForOne', pricesArr[4])
}
