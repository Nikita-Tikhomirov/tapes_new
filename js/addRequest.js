//  Добавить заявку


let addRequestButtons = document.querySelectorAll('.addrequestButton')

let arrOfColorsTofilter = []


addRequestButtons.forEach(function (item, i, arr) {
    item.addEventListener('click', () => {
        let copyForm = item.previousElementSibling.cloneNode(true)
        let namesForClear = copyForm.querySelectorAll('.manListItemWrap')
        namesForClear.forEach(element => {
            element.remove()
        });
        let inputsForClear = copyForm.querySelectorAll('input')
        inputsForClear.forEach(element => {
            element.value = ''
        });
        let textareaForClear = copyForm.querySelectorAll('textarea')
        textareaForClear.forEach(element => {
            element.value = ''
        });
        let requestCounter = copyForm.querySelector('.requestCount')
        let allRequestArr = item.previousElementSibling.parentElement.querySelectorAll('.signup_form')
        requestCounter.innerHTML = allRequestArr.length + 1

        item.before(copyForm)
        allButtonsAddName = document.querySelectorAll('.mansListAddBtn')
        plusName(allButtonsAddName)

        // пересчет цветов печати и макетов
        allColorsSelects = document.querySelectorAll('.colorSelect')

        // пересчет макетов 
        howManyRequests = document.querySelectorAll(`.` + `${startChoice}` + ` .signup_form`).length
        // console.log(howManyRequests);





       

        // если меньше 20 лент в заказе (Доплата за макет)
        if (howManyCounter < 20) {

            let allTemplatesSelect = document.querySelectorAll(`.` + `${startChoice}` + ` .templateSelect`)

            let selectedValues = []

            allTemplatesSelect.forEach(select => {
                let options = Array.from(select.selectedOptions)
                options.forEach(option => {
                    selectedValues.push(option.value)
                })
            })

            let uniqueValues = selectedValues.filter((value, index, array) => {
                return array.indexOf(value) === index
            })

            if (uniqueValues.length > 3) {
                howManyMakets = uniqueValues.length - 3
                priceRebuild()
            }

        }



        // Нужно вынести это условие и проверять его при нажатии кнопок + и - !!!! 

        let howManyRequestHeare = document.querySelectorAll(`.` + `${startChoice}` + ` .signup_form`).length


        if (howManyRequestHeare >= 2) {

           
            let allRequests = document.querySelectorAll(`.` + `${startChoice}` + ` .signup_form`)
            // allRequests отфильтровать только те где меньше 20 лент



            colorsFilter(allRequests, arrOfColorsTofilter)



            let selectsOfColors = document.querySelectorAll(`.` + `${startChoice}` + ` .colorSelect`)

            selectsOfColors.forEach(element => {
                element.addEventListener('change', () => {
                    colorsFilter(allRequests, arrOfColorsTofilter)
                })

            });


            let selectsOfPrint = document.querySelectorAll(`.` + `${startChoice}` + ` .printColor`)

            selectsOfPrint.forEach(element => {
                element.addEventListener('change', () => {
                    colorsFilter(allRequests, arrOfColorsTofilter)
                })

            });



        }




    })





});

// получаем количество уникальных сочетаний цвета и печати

function colorsFilter(reqstArr, arrToFilter) {
    arrOfColorsTofilter = []
    reqstArr.forEach(function (item, i, arr) {
        // arrOfColorsTofilter.push
        let selectColor = item.querySelector('.colorSelect').value
        let selectPrintColor = item.querySelector('.printColor').value

        let colorStringToPush = selectColor + selectPrintColor

        arrToFilter.push(colorStringToPush)

    });

    console.log(arrToFilter);


    let uniqueValues = arrToFilter.filter((value, index, array) => {
        return array.indexOf(value) === index;
    });

    console.log(uniqueValues.length);



}






