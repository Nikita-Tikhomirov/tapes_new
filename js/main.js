

function mailsInput1() {
    let mailCounterNow = mailsPriceArr[0]
    if (textToMail.value == '') {
        mailsInputCounter = Number(mailCounterNow) * mailsInput.value
        priceRebuild()
    } else {
        mailsInputCounter = Number(mailCounterNow + 20) * mailsInput.value
        priceRebuild()
    }
}

mailsInput.addEventListener('input', () => {

    if (mailsInput.value <= 3) {

        if (mailsInput.value == '') {
            mailsInputCounter = 0
            priceRebuild()

        } else {
            let mailCounterNow = mailsPriceArr[0]
            if (textToMail.value == '') {
                mailsInputCounter = Number(mailCounterNow) * mailsInput.value
                priceRebuild()
            } else {
                mailsInputCounter = Number(mailCounterNow + 20) * mailsInput.value
                priceRebuild()
            }

            textToMail.addEventListener('input', () => {
                mailsInput1()
            })

        }




    } else if (mailsInput.value > 3 && mailsInput.value <= 10) {
        let mailCounterNow = mailsPriceArr[1]
        mailsInputCounter = mailCounterNow
        priceRebuild()
        textToMail.addEventListener('change', () => {
            if (textToMail.value == '') {
                mailsInputCounter = mailsInputCounter
                priceRebuild()
            } else {
                mailsInputCounter = mailsInputCounter + 20
                priceRebuild()
            }

        })
    } else if (mailsInput.value > 10 && mailsInput.value <= 30) {
        let mailCounterNow = mailsPriceArr[2]
        mailsInputCounter = mailCounterNow
        priceRebuild()
        textToMail.addEventListener('change', () => {
            if (textToMail.value == '') {
                mailsInputCounter = mailsInputCounter
                priceRebuild()
            } else {
                mailsInputCounter = mailsInputCounter + 20
                priceRebuild()
            }

        })
    } else if (mailsInput.value > 30 && mailsInput.value <= 70) {
        let mailCounterNow = mailsPriceArr[3]
        mailsInputCounter = mailCounterNow
        priceRebuild()
        textToMail.addEventListener('change', () => {
            if (textToMail.value == '') {
                mailsInputCounter = mailsInputCounter
                priceRebuild()
            } else {
                mailsInputCounter = mailsInputCounter + 20
                priceRebuild()
            }

        })
    } else if (mailsInput.value > 70 && mailsInput.value <= 100) {
        let mailCounterNow = mailsPriceArr[4]
        mailsInputCounter = mailCounterNow
        priceRebuild()
        textToMail.addEventListener('change', () => {
            if (textToMail.value == '') {
                mailsInputCounter = mailsInputCounter
                priceRebuild()
            } else {
                mailsInputCounter = mailsInputCounter + 20
                priceRebuild()
            }

        })
    } else if (mailsInput.value > 100) {
        let mailCounterNow = mailsPriceArr[5]
        mailsInputCounter = mailCounterNow
        priceRebuild()
        textToMail.addEventListener('change', () => {
            if (textToMail.value == '') {
                mailsInputCounter = mailsInputCounter
                priceRebuild()
            } else {
                mailsInputCounter = mailsInputCounter + 20
                priceRebuild()
            }

        })
    }

})




