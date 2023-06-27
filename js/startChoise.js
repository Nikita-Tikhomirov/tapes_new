// Выбор на старте

let startChoice = ''

const allStartRadio = document.querySelectorAll('.customRadioWrap')
allStartRadio.forEach(function (item, i, arr) {
  item.addEventListener('click', () => {
    arr.forEach(function (el) {
      el.classList.remove('active')
    })
    item.classList.add('active')
    startChoice = item.getAttribute('data-start')
  })
})