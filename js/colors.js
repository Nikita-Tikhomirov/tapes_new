

let allColorsSelects = document.querySelectorAll('.colorSelect')

function changeSelect(select, myLet) {
    select.addEventListener('change', () => {
        let selected = select.options[select.selectedIndex]
        myLet[0] = selected.getAttribute('data-price')
        // console.log(myLet);
        console.log('price ' + myLet[0])
        // console.log(select.value);
        priceRebuild()
    })
}
