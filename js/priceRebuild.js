//  Заполнение учителей

const allTeachersInputs = document.querySelectorAll('.teachers')


function priceRebuild() {
    // Условия для основы(самой ленты)

    if (startChoice !== 'vipuskniki') {
        if (howManyAdults < 2) {
            priceForOne = Number(basePriceArr[0].innerHTML)
        } else if (howManyAdults > 2 && howManyAdults <= 4) {
            priceForOne = Number(basePriceArr[1].innerHTML)
        } else if (howManyAdults > 4 && howManyAdults <= 7) {
            priceForOne = Number(basePriceArr[2].innerHTML)
        } else if (howManyAdults > 7 && howManyAdults <= 9) {
            priceForOne = Number(basePriceArr[3].innerHTML)
        } else if (howManyAdults > 9 && howManyAdults <= 15) {
            priceForOne = Number(basePriceArr[4].innerHTML)
        } else if (howManyAdults > 15 && howManyAdults <= 19) {
            priceForOne = Number(basePriceArr[5].innerHTML)
        } else if (howManyAdults > 19 && howManyAdults <= 50) {
            priceForOne = Number(basePriceArr[6].innerHTML)
        } else if (howManyAdults > 50 && howManyAdults <= 100) {
            priceForOne = Number(basePriceArr[7].innerHTML)
        } else if (howManyAdults > 100 && howManyAdults <= 150) {
            priceForOne = Number(basePriceArr[8].innerHTML)
        } else if (howManyAdults > 150 && howManyAdults <= 200) {
            priceForOne = Number(basePriceArr[9].innerHTML)
        } else if (howManyAdults > 200) {
            priceForOne = Number(basePriceArr[10].innerHTML)
        }

        if (howManyChildrens < 2) {
            priceForOneChild = Number(basePriceArrChildrens[0].innerHTML)
        } else if (howManyChildrens > 2 && howManyChildrens <= 4) {
            priceForOneChild = Number(basePriceArrChildrens[1].innerHTML)
        } else if (howManyChildrens > 4 && howManyChildrens <= 7) {
            priceForOneChild = Number(basePriceArrChildrens[2].innerHTML)
        } else if (howManyChildrens > 7 && howManyChildrens <= 9) {
            priceForOneChild = Number(basePriceArrChildrens[3].innerHTML)
        } else if (howManyChildrens > 9 && howManyChildrens <= 15) {
            priceForOneChild = Number(basePriceArrChildrens[4].innerHTML)
        } else if (howManyChildrens > 15 && howManyChildrens <= 19) {
            priceForOneChild = Number(basePriceArrChildrens[5].innerHTML)
        } else if (howManyChildrens > 19 && howManyChildrens <= 50) {
            priceForOneChild = Number(basePriceArrChildrens[6].innerHTML)
        } else if (howManyChildrens > 50 && howManyChildrens <= 100) {
            priceForOneChild = Number(basePriceArrChildrens[7].innerHTML)
        } else if (howManyChildrens > 100 && howManyChildrens <= 150) {
            priceForOneChild = Number(basePriceArrChildrens[8].innerHTML)
        } else if (howManyChildrens > 150 && howManyChildrens <= 200) {
            priceForOneChild = Number(basePriceArrChildrens[9].innerHTML)
        } else if (howManyChildrens > 200) {
            priceForOneChild = Number(basePriceArrChildrens[10].innerHTML)
        }

        
        
    }else{


        
        if (howManyCounter < 2) {
            priceForOne = Number(basePriceArr[0].innerHTML)
        } else if (howManyCounter > 2 && howManyCounter <= 4) {
            priceForOne = Number(basePriceArr[1].innerHTML)
        } else if (howManyCounter > 4 && howManyCounter <= 7) {
            priceForOne = Number(basePriceArr[2].innerHTML)
        } else if (howManyCounter > 7 && howManyCounter <= 9) {
            priceForOne = Number(basePriceArr[3].innerHTML)
        } else if (howManyCounter > 9 && howManyCounter <= 15) {
            priceForOne = Number(basePriceArr[4].innerHTML)
        } else if (howManyCounter > 15 && howManyCounter <= 19) {
            priceForOne = Number(basePriceArr[5].innerHTML)
        } else if (howManyCounter > 19 && howManyCounter <= 50) {
            priceForOne = Number(basePriceArr[6].innerHTML)
        } else if (howManyCounter > 50 && howManyCounter <= 100) {
            priceForOne = Number(basePriceArr[7].innerHTML)
        } else if (howManyCounter > 100 && howManyCounter <= 150) {
            priceForOne = Number(basePriceArr[8].innerHTML)
        } else if (howManyCounter > 150 && howManyCounter <= 200) {
            priceForOne = Number(basePriceArr[9].innerHTML)
        } else if (howManyCounter > 200) {
            priceForOne = Number(basePriceArr[10].innerHTML)
        }
    
    }





    let allInputsBells = document.querySelectorAll('.bell')


    // Условия для основы(колоколчиков Красивый и Лучший выпуск)

    // КОЛОКОЛЬЧИКИ МЕНЬШЕ 3Х ШТУК
    if (allInputsBells[0].value <= 3) {
        allInputsBells[0].setAttribute('data-dopPriceForOne', Number(bellPriceArr1[0].innerHTML))

    }

    if (allInputsBells[1].value <= 3) {
        allInputsBells[1].setAttribute('data-dopPriceForOne', Number(bellPriceArr2[0].innerHTML))

    }


    // КОЛОКОЛЬЧИКИ МЕНЬШЕ 4 - 10 ШТУК
    if (allInputsBells[0].value > 3 && allInputsBells[0].value <= 9) {
        allInputsBells[0].setAttribute('data-dopPriceForOne', Number(bellPriceArr1[1].innerHTML))
    }
    if (allInputsBells[1].value > 3 && allInputsBells[1].value <= 9) {
        allInputsBells[1].setAttribute('data-dopPriceForOne', Number(bellPriceArr2[1].innerHTML))
    }

    // КОЛОКОЛЬЧИКИ МЕНЬШЕ 10 - 29 ШТУК
    if (allInputsBells[0].value > 9 && allInputsBells[0].value <= 29) {
        allInputsBells[0].setAttribute('data-dopPriceForOne', Number(bellPriceArr1[2].innerHTML))
    }
    if (allInputsBells[1].value > 9 && allInputsBells[1].value <= 29) {
        allInputsBells[1].setAttribute('data-dopPriceForOne', Number(bellPriceArr2[2].innerHTML))
    }


    // КОЛОКОЛЬЧИКИ МЕНЬШЕ 30 - 49 ШТУК
    if (allInputsBells[0].value > 29 && allInputsBells[0].value <= 49) {
        allInputsBells[0].setAttribute('data-dopPriceForOne', Number(bellPriceArr1[3].innerHTML))
    }
    if (allInputsBells[1].value > 29 && allInputsBells[1].value <= 49) {
        allInputsBells[1].setAttribute('data-dopPriceForOne', Number(bellPriceArr2[3].innerHTML))
    }

    // КОЛОКОЛЬЧИКИ 49+ ШТУК
    if (allInputsBells[0].value > 49) {
        allInputsBells[0].setAttribute('data-dopPriceForOne', Number(bellPriceArr1[4].innerHTML))
    }
    if (allInputsBells[1].value > 49) {
        allInputsBells[1].setAttribute('data-dopPriceForOne', Number(bellPriceArr2[4].innerHTML))
    }



    // Условия для основы(колоколчиков МАЙ)

    if (allInputsBells[2].value <= 5) {
        allInputsBells[2].setAttribute('data-dopPriceForOne', Number(bellPriceArr3[0].innerHTML))
    } else if (allInputsBells[2].value > 5 && allInputsBells[2].value <= 19) {
        allInputsBells[2].setAttribute('data-dopPriceForOne', Number(bellPriceArr3[1].innerHTML))

    } else if (allInputsBells[2].value > 19 && allInputsBells[2].value <= 29) {
        allInputsBells[2].setAttribute('data-dopPriceForOne', Number(bellPriceArr3[2].innerHTML))

    } else if (allInputsBells[2].value > 29 && allInputsBells[2].value <= 49) {
        allInputsBells[2].setAttribute('data-dopPriceForOne', Number(bellPriceArr3[3].innerHTML))

    } else if (allInputsBells[2].value > 49) {
        allInputsBells[2].setAttribute('data-dopPriceForOne', Number(bellPriceArr3[4].innerHTML))

    }







    // Условие для бабочек


    let allInputsButerfly = document.querySelectorAll('.buterfly')

    // Бабочки Элегант

    if (allInputsButerfly[0].value <= 3) {
        allInputsButerfly[0].setAttribute('data-doppriceforone', Number(buterflyPriceArr1[0].innerHTML))
    } else if (allInputsButerfly[0].value > 3 && allInputsButerfly[0].value <= 5) {
        allInputsButerfly[0].setAttribute('data-doppriceforone', Number(buterflyPriceArr1[1].innerHTML))
    } else if (allInputsButerfly[0].value > 5 && allInputsButerfly[0].value <= 9) {
        allInputsButerfly[0].setAttribute('data-doppriceforone', Number(buterflyPriceArr1[2].innerHTML))
    } else if (allInputsButerfly[0].value > 9 && allInputsButerfly[0].value <= 19) {
        allInputsButerfly[0].setAttribute('data-doppriceforone', Number(buterflyPriceArr1[3].innerHTML))
    } else if (allInputsButerfly[0].value > 19) {
        allInputsButerfly[0].setAttribute('data-doppriceforone', Number(buterflyPriceArr1[4].innerHTML))
    }



    //  Бабочки "Выпускник"


    if (allInputsButerfly[1].value <= 3) {
        allInputsButerfly[1].setAttribute('data-doppriceforone', Number(buterflyPriceArr2[0].innerHTML))
    } else if (allInputsButerfly[1].value > 3 && allInputsButerfly[1].value <= 5) {
        allInputsButerfly[1].setAttribute('data-doppriceforone', Number(buterflyPriceArr2[1].innerHTML))
    } else if (allInputsButerfly[1].value > 5 && allInputsButerfly[1].value <= 9) {
        allInputsButerfly[1].setAttribute('data-doppriceforone', Number(buterflyPriceArr2[2].innerHTML))
    } else if (allInputsButerfly[1].value > 9 && allInputsButerfly[1].value <= 19) {
        allInputsButerfly[1].setAttribute('data-doppriceforone', Number(buterflyPriceArr2[3].innerHTML))
    } else if (allInputsButerfly[1].value > 19) {
        allInputsButerfly[1].setAttribute('data-doppriceforone', Number(buterflyPriceArr2[4].innerHTML))
    }



    // Бабочки "Кашемир" Премиум ( только бордо ):


    if (allInputsButerfly[2].value <= 3) {
        allInputsButerfly[2].setAttribute('data-doppriceforone', Number(buterflyPriceArr3[0].innerHTML))
    } else if (allInputsButerfly[2].value > 3 && allInputsButerfly[2].value <= 5) {
        allInputsButerfly[2].setAttribute('data-doppriceforone', Number(buterflyPriceArr3[1].innerHTML))
    } else if (allInputsButerfly[2].value > 5 && allInputsButerfly[2].value <= 9) {
        allInputsButerfly[2].setAttribute('data-doppriceforone', Number(buterflyPriceArr3[2].innerHTML))
    } else if (allInputsButerfly[2].value > 9 && allInputsButerfly[2].value <= 19) {
        allInputsButerfly[2].setAttribute('data-doppriceforone', Number(buterflyPriceArr3[3].innerHTML))
    } else if (allInputsButerfly[2].value > 19) {
        allInputsButerfly[2].setAttribute('data-doppriceforone', Number(buterflyPriceArr3[4].innerHTML))
    }





    // mails


    // TOTAL 
    const totalOuter = document.querySelector('.counter')
    // console.log(howManyCounter);
    // totalOuter.innerHTML = howManyCounter * (priceForOne + Number(bellPrice[0]) + Number(bantPrice[0]) + Number(buterflyPrice[0]) + Number(butonsPrice[0]) + bellTextPrice + mailsInputCounter)

    let allDopsInputs = document.querySelectorAll('.dop__counter')
    let allDopsPrice = 0
    allDopsInputs.forEach(function (item, i, arr) {
        let priceForOneDopNow = item.getAttribute('data-doppriceforone')
        let howManyDopsNow = item.value
        allDopsPrice = allDopsPrice + (priceForOneDopNow * howManyDopsNow)
    });
    // console.log(allDopsPrice);


    if (startChoice !== 'vipuskniki'){
        totalOuter.innerHTML = (howManyChildrens * priceForOneChild) + (howManyAdults * priceForOne) + allDopsPrice + mailsInputCounter + (priceMaket * howManyMakets)

    }else{
        totalOuter.innerHTML = howManyCounter * priceForOne + allDopsPrice + mailsInputCounter + (priceMaket * howManyMakets)
    }
    
}
priceRebuild()