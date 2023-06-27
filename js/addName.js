document.body.addEventListener('click', e => {
  const target = e.target

  if (target.classList.contains('mansListAddBtn')) {
    plusName(target)
  }
})

function plusName(element) {
  const namesWrapNow = element.previousElementSibling

  const newNameWrap = document.createElement('div')
  newNameWrap.classList.add('manListItemWrap')
  namesWrapNow.appendChild(newNameWrap)

  const countNow = document.createElement('div')
  countNow.classList.add('manListItemCounter')
  newNameWrap.appendChild(countNow)

  const manListItemNow = document.createElement('div')
  manListItemNow.classList.add('manListItem')
  manListItemNow.setAttribute('contenteditable', 'true')
  newNameWrap.appendChild(manListItemNow)

  const minusNow = document.createElement('div')
  minusNow.classList.add('manListItemMinus')
  newNameWrap.appendChild(minusNow)

  const howManyNamesNow = namesWrapNow.querySelectorAll('.manListItemWrap').length

  countNow.textContent = `${howManyNamesNow})`

  howManyCounter++

  // Получаем текущую заявку(обертку)
  const requestWrap = namesWrapNow.parentElement.parentElement.parentElement
  howManyInputPushValue(requestWrap)

  priceRebuild()

  // Нажатие на минус
  minusNow.addEventListener('click', () => {
    howManyCounter = howManyCounter - 1
    newNameWrap.remove()
    
    const countOfNames = namesWrapNow.querySelectorAll('.manListItemCounter')

    countOfNames.forEach(function (item, i) {
      item.textContent = `${i + 1})`
    });

    howManyInputPushValue(requestWrap)
    priceRebuild()
  })
}

function howManyInputPushValue(wrapperOfRequest){
  if (startChoice === 'vipuskniki') {
    const howManyProdsNow = wrapperOfRequest.querySelectorAll('.manListItemWrap').length
    const inputHowManyProds = wrapperOfRequest.querySelector('.howMany')

    inputHowManyProds.value = howManyProdsNow
  } else {
    const howManyAdultsInput = wrapperOfRequest.querySelector('.howManySchoolAdult')
    const howManyChildrensInput = wrapperOfRequest.querySelector('.howManySchoolChild')

    howManyAdults = document.querySelectorAll(`.${startChoice} .adultWrap .manListItem`).length
    howManyChildrens = howManyCounter - howManyAdults

    howManyAdultsInput.value = howManyAdults
    howManyChildrensInput.value = howManyChildrens
  }
}
