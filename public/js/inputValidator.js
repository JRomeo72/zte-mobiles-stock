import expressions from "./expressions.js";

export const inputsCheked = {
    user: false,
    email: false,
    password_1: false,
    password_2: false
}

const inputValidator = (e) => {
    let message;
    switch (e.target.name) {
        case 'user':
            message = "El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo.";
            inputCheck(expressions.user, e.target.parentElement, e.target, message)
            break;
        case 'email':
            message = "Formato de correo invalido.";
            inputCheck(expressions.email, e.target.parentElement, e.target, message)
            break;
        case 'password_1':
            message = "La contraseña tiene que ser de 4 a 12 dígitos.";
            inputCheck(expressions.password, e.target.parentElement, e.target, message);
            passValidator()
            break;
        case 'password_2':
            passValidator()
            break;
    }

};

const inputCheck = (exp, parent, input, message) => {
    if(exp.test(input.value)) {
        parent.classList.add('checked');
        parent.classList.remove('error')
        inputsCheked[input.name] = true
    } else {
        parent.querySelector('small').textContent = message
        parent.classList.add('error')
        parent.classList.remove('checked')
        inputsCheked[input.name] = false
    }
}

const passValidator = () => {
    let p1 = document.querySelector('input[name="password_1"]');
    let p2 = document.querySelector('input[name="password_2"]');

    if(p1.value !== p2.value || !expressions.password.test(p2.value)) {
        p2.parentElement.querySelector('small').textContent = "La contraseña tiene que ser iguales.";
        p2.parentElement.classList.add('error')
        p2.parentElement.classList.remove('checked')
        inputsCheked["password_2"] = false
    } else {
        p2.parentElement.classList.add('checked');
        p2.parentElement.classList.remove('error')
        inputsCheked["password_2"] = true
    }
}

export default inputValidator