document.body.addEventListener('click', e => {
  const target = e.target

  if (target.classList.contains('mansListAddBtn')) plusName(target)

  else if (target.classList.contains('printColor') || target.classList.contains('colorSelect')) {
    target.addEventListener('change', e => {
      priceRebuild()
    }, { once: true })
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

  ++howManyCounter

  // Получаем текущую заявку(обертку)
  const requestWrap = namesWrapNow.parentElement.parentElement.parentElement
  howManyInputPushValue(requestWrap)

  // Нажатие на минус
  minusNow.addEventListener('click', () => {
    --howManyCounter
    newNameWrap.remove()

    const countOfNames = namesWrapNow.querySelectorAll('.manListItemCounter')

    countOfNames.forEach(function (item, i) {
      item.textContent = `${i + 1})`
    });

    howManyInputPushValue(requestWrap)
  }, { once: true })
}

function howManyInputPushValue(wrapperOfRequest) {
  if (startChoice === 'vipuskniki') {
    const howManyProdsNow = wrapperOfRequest.querySelectorAll('.manListItemWrap').length
    const inputHowManyProds = wrapperOfRequest.querySelector('.howMany')

    inputHowManyProds.value = howManyProdsNow
  } else {
    const howManyAdultsInput = wrapperOfRequest.querySelector('.howManySchoolAdult')
    const howManyChildrensInput = wrapperOfRequest.querySelector('.howManySchoolChild')

    howManyAdultsInput.value = wrapperOfRequest.querySelectorAll(`.${startChoice} .adultWrap .manListItem`).length
    howManyChildrensInput.value = wrapperOfRequest.querySelectorAll(`.${startChoice} .childWrap .manListItem`).length

    howManyAdults = document.querySelectorAll(`.${startChoice} .adultWrap .manListItem`).length
    howManyChildrens = document.querySelectorAll(`.${startChoice} .childWrap .manListItem`).length
  }

  priceRebuild()
}
