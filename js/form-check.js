const form = document.getElementsByClassName('cart__order__form__question')
const order = document.getElementById('order')

let isValidArray = [false, false, false, false, false]

const matches = () => {
    for(i = 0; i< form.length; i++) {
        let formInput = form[i].children[1]
        let index = i
        formInput.addEventListener('change', (e) => {
            let name = e.currentTarget.name
            let value = e.currentTarget.value
            let expression = /^([\p{L}]{1,20}( |-|'|\.)? ?){1,4}/gu
            let array = value.split(' ')
            switch(name) {
                case("Prénom" || "Nom"): 
                array = [array.join(' ')]
                break 
                case ("Email") :
                expression = /^[a-zA-Z-0-9.-_]+\@{1}[a-z]{1,9}\.{1}[a-z]{2,5}$/g
                break
                case("Adresse") : 
                expression = /^([0-9]{1,4})?( +|,)?( *)([\p{L}]{2,9}\.?)( |-|')(([\p{L}]{2,12})( |-|')?){1,5}/gu
                array = [array.join(' ')]
                break
                case("Ville") : 
                expression = /^([0-9]{5})? ?([a-zA-Z\p{L}\p{M}]+( |-)?){1,4}/gu
                array = [array.join(' ')]
                break
            }
            let testResult = expression.test(value)
            if(testResult) {
                let match = value.match(expression)
                let isValid = false
                if (match[0] == array[0]) {
                    document.getElementById(`${name}ErrorMsg`).innerHTML = `${name} valide`
                    isValid = true
                    return isValidArray.splice(index, 1, isValid)
                } else {
                    document.getElementById(`${name}ErrorMsg`).innerHTML = `${name} non valide`
                    isValid = false
                    return isValidArray.splice(index, 1, isValid)
                }
            } else {
                document.getElementById(`${name}ErrorMsg`).innerHTML = `${name} non valide`
                isValid = false
                return isValidArray.splice(index, 1, isValid)
            }
        })
    }
    return isValidArray
}

matches()

order.addEventListener('click', (e) => {
    e.preventDefault
    if (isValidArray.includes(false)) {
        alert ("Veuillez vérifier le formulaire")
    } else {
        console.log("proceed")
    }
})

