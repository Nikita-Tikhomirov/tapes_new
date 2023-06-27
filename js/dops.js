// перерасчет допов

const slideWithAcs = document.querySelector('.slideWithAcs')
const buttonsToStepWithAcs = document.querySelectorAll('.buttonsToStepWithAcs')

buttonsToStepWithAcs.forEach(element => {
  element.addEventListener('click', () => {
    document.querySelector(`.${startChoice}`).classList.remove('active')
    slideWithAcs.classList.add('active')
    document.getElementById('Three-tab').classList.add('active')
  })
});

const dopsPlus = document.querySelectorAll('.dop__plus')
const dopsMinus = document.querySelectorAll('.dop__minus')
const allDopsInputs = document.querySelectorAll('.dop input')

let dopsPrice

dopsPlus.forEach(element => {
  element.addEventListener('click', () => {
    element.previousElementSibling.value++
    priceRebuild()
  })
});

dopsMinus.forEach(element => {
  element.addEventListener('click', () => {
    if (element.nextElementSibling.value > 0) {
      element.nextElementSibling.value--
      priceRebuild()
    }
  })
});

allDopsInputs.forEach(element => {
  element.addEventListener('input', () => priceRebuild())
});
