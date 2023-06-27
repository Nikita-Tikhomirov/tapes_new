// Переход ко второму слайду

const firstChoiseBtn = document.querySelector('.firstChoiseBtn')

firstChoiseBtn.addEventListener('click', () => {
  if (startChoice) {
    document.querySelector('.tab-pane.active').classList.remove('active')
    document.querySelector(`.${startChoice}`).classList.add('active')
    document.getElementById('Two-tab').classList.add('active')
    if (startChoice === 'acs') document.getElementById('Three-tab').classList.add('active')
    return
  }
  
  alert("Выбирите один из пунктов")
})
