let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let address = document.getElementById('address')
let city = document.getElementById('city')
let email = document.getElementById('email')
let order = document.getElementById('order')
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
let addressErrorMsg = document.getElementById('addressErrorMsg')
let cityErrorMsg = document.getElementById('cityErrorMsg')
let emailErrorMsg = document.getElementById('emailErrorMsg')

const form = document.getElementsByClassName('cart__order__form__question')

const matches = () => {
    for(i = 0; i< form.length; i++) {
        let formInput = form[i].children[1]
        formInput.addEventListener('change', (e) => {
            let name = e.currentTarget.name
            let value = e.currentTarget.value
            let expression = /^([\p{L}]{2,20}( |-|'|.)? ?){1,4}/gu
            let array = value.split(' ')
            switch(name) {
                case ("email") :
                expression = /^[a-zA-Z-0-9.-_]+\@{1}[a-z]{1,9}\.{1}[a-z]{2,5}$/g
                break
                case("address") : 
                expression = /^([0-9]{1,4})?[ +,]?( *)([a-z]{2,9}\.?)( |-|')(([\p{L}]{2,12})( |-|')?){1,5}/g
                break
                case("city") : 
                expression = /^([0-9]{5})? ?([a-zA-Z\p{L}\p{M}]+( |-)?){1,4}/gu
                break
            }
            let testResult = expression.test(value)
            if(testResult) {
                let match = value.match(expression)
                if (match == array) {
                    console.log('pass')
                } else {
                    console.log('not correct')
                }
            } else {
                console.log('refused')
            }
        })
    }
}

matches()

