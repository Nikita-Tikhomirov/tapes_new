//  Добавить заявку

const addRequestButtons = document.querySelectorAll('.addrequestButton')

let arrOfColorsTofilter = []


addRequestButtons.forEach(item => {
  item.addEventListener('click', () => {
    const copyForm = item.previousElementSibling.cloneNode(true)

    const namesForClear = copyForm.querySelectorAll('.manListItemWrap')
    namesForClear.forEach(element => {
      element.remove()
    });

    const inputsForClear = copyForm.querySelectorAll('input')
    inputsForClear.forEach(element => {
      element.value = ''
    });

    const textareaForClear = copyForm.querySelectorAll('textarea')
    textareaForClear.forEach(element => {
      element.value = ''
    });

    const requestCounter = copyForm.querySelector('.requestCount')

    const allRequestArr = item.previousElementSibling.parentElement.querySelectorAll('.signup_form')
    requestCounter.innerHTML = allRequestArr.length + 1

    item.before(copyForm)

    // пересчет цветов печати и макетов
    const allColorsSelects = document.querySelectorAll('.colorSelect')

    // пересчет макетов 
    howManyRequests = document.querySelectorAll(`.${startChoice} .signup_form`).length
    // console.log(howManyRequests);


    // если меньше 20 лент в заказе (Доплата за макет)
    if (howManyCounter < 20) {

      const allTemplatesSelect = document.querySelectorAll(`.${startChoice} .templateSelect`)

      let selectedValues = []

      allTemplatesSelect.forEach(select => {
        const options = Array.from(select.selectedOptions)
        options.forEach(option => selectedValues.push(option.value))
      })

      const uniqueValues = selectedValues.filter((value, index, array) => {
        return array.indexOf(value) === index
      })

      if (uniqueValues.length > 3) {
        howManyMakets = uniqueValues.length - 3
        priceRebuild()
      }
    }

    // Нужно вынести это условие и проверять его при нажатии кнопок + и - !!!! 

    const howManyRequestHeare = document.querySelectorAll(`.${startChoice} .signup_form`).length


    if (howManyRequestHeare >= 2) {
      const allRequests = document.querySelectorAll(`.${startChoice} .signup_form`)
      // allRequests отфильтровать только те где меньше 20 лент

      colorsFilter(allRequests, arrOfColorsTofilter)

      const selectsOfColors = document.querySelectorAll(`.${startChoice} .colorSelect`)

      selectsOfColors.forEach(element => {
        element.addEventListener('change', colorsFilter(allRequests, arrOfColorsTofilter))
      });

      const selectsOfPrint = document.querySelectorAll(`.${startChoice} .printColor`)

      selectsOfPrint.forEach(element => {
        element.addEventListener('change', colorsFilter(allRequests, arrOfColorsTofilter))
      });
    }
  })
});

// получаем количество уникальных сочетаний цвета и печати

function colorsFilter(reqstArr, arrToFilter) {
  arrOfColorsTofilter = []

  reqstArr.forEach(item => {
    // arrOfColorsTofilter.push
    const selectColor = item.querySelector('.colorSelect').value
    const selectPrintColor = item.querySelector('.printColor').value
    arrToFilter.push(selectColor + selectPrintColor)
  });

  console.log(arrToFilter);

  const uniqueValues = arrToFilter.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });

  console.log(uniqueValues.length);
}
