// Переход ко второму слайду

const firstChoiseBtn = document.querySelector('.firstChoiseBtn')

firstChoiseBtn.addEventListener('click', () => {

    if (startChoice == '') {
        alert("Выбирите один из пунктов")
    } else if (startChoice === 'acs') {
        let activeSlideNow = document.querySelector('.tab-pane.active')
        activeSlideNow.classList.remove('active')
        let nextStepNow = document.querySelector(`.` + `${startChoice}`)
        nextStepNow.classList.add('active')
        document.getElementById('Two-tab').classList.add('active')
        document.getElementById('Three-tab').classList.add('active')


    } else {
        let activeSlideNow = document.querySelector('.tab-pane.active')
        activeSlideNow.classList.remove('active')
        let nextStepNow = document.querySelector(`.` + `${startChoice}`)
        nextStepNow.classList.add('active')
        document.getElementById('Two-tab').classList.add('active')

        console.log(startChoice);
    }


})
