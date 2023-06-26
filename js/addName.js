let allButtonsAddName = document.querySelectorAll('.mansListAddBtn')
let allButtonsMinus = document.querySelectorAll('.manListItemMinus')

function plusName(buttonsAddArr) {
    buttonsAddArr.forEach(function (element, i, arr) {
        element.addEventListener('click', () => {
            let namesWrapNow = element.previousElementSibling
            let newNameWrap = document.createElement('div')
            newNameWrap.classList.add('manListItemWrap')
            namesWrapNow.appendChild(newNameWrap)
            let countNow = document.createElement('div')
            countNow.classList.add('manListItemCounter')

            newNameWrap.appendChild(countNow)
            let manListItemNow = document.createElement('div')
            manListItemNow.classList.add('manListItem')
            manListItemNow.setAttribute('contenteditable', 'true')
            newNameWrap.appendChild(manListItemNow)
            let minusNow = document.createElement('div')
            minusNow.classList.add('manListItemMinus')
            newNameWrap.appendChild(minusNow)
            // allButtonsMinus = document.querySelectorAll('.manListItemMinus')


            const howManyNamesNow = namesWrapNow.querySelectorAll('.manListItemWrap').length


            countNow.innerHTML = (howManyNamesNow) + ' )'

            howManyCounter++


            if (startChoice === 'vipuskniki') {
                // Получаем инпут с количеством в этом слайде
                let howManyPeoplesOnSlideInput = namesWrapNow.parentElement.parentElement.parentElement.querySelector('.howMany')
                console.log(howManyPeoplesOnSlideInput);



                // howManyPeoplesOnSlideInput.value = howManyCounter


                // Получаем текущую заявку(обертку)
                let requestWrap = newNameWrap.parentElement.parentElement.parentElement.parentElement
                howManyInputPushValue(requestWrap)


                priceRebuild()

                // Нажатие на минус
                minusNow.addEventListener('click', () => {
                    howManyCounter = howManyCounter - 1
                    newNameWrap.remove()


                    // howManyPeoplesOnSlideInput.value = howManyCounter



                    let countOfNames = namesWrapNow.querySelectorAll('.manListItemCounter')
                    countOfNames.forEach(function (item, i, arr) {
                        item.innerHTML = (i + 1) + ')'
                    });
                    howManyInputPushValue(requestWrap)
                    priceRebuild()
                })
            } else {
                let howManyAdultsInput = namesWrapNow.parentElement.parentElement.parentElement.querySelector('.howManySchoolAdult')
                let howManyChildrensInput = namesWrapNow.parentElement.parentElement.parentElement.querySelector('.howManySchoolChild')

                howManyAdults = document.querySelectorAll(`.` + `${startChoice}`+' '+'.adultWrap .manListItem').length
                
                howManyChildrens = howManyCounter - howManyAdults



                // ИСПРАВИТЬ
                // howManyAdultsInput.value = howManyAdults
                // howManyChildrensInput.value = howManyChildrens



                priceRebuild()


                minusNow.addEventListener('click', () => {
                    howManyCounter = howManyCounter - 1
                    newNameWrap.remove()


                    // howManyPeoplesOnSlideInput.value = howManyCounter


                    let countOfNames = namesWrapNow.querySelectorAll('.manListItemCounter')
                    countOfNames.forEach(function (item, i, arr) {
                        item.innerHTML = (i + 1) + ')'
                    });
                    priceRebuild()
                })

                console.log(howManyAdults);
                console.log(howManyChildrens);
            }


            


        })
    });
}
plusName(allButtonsAddName)

// для взрослых(Нет детских лент)

function howManyInputPushValue(wrapperOfRequest){
    let howManyProdsNow = wrapperOfRequest.querySelectorAll('.manListItemWrap').length
    let inputHowManyProds = wrapperOfRequest.querySelector('.howMany')
    inputHowManyProds.value = howManyProdsNow
}


