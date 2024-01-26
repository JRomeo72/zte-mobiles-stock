const registerFormValidation = (e) => {
    let user = e.target[0]
    let email = e.target[1]
    let password_1 = e.target[2]
    let password_2 = e.target[3]

    let userValue = user.value.trim();
    let emailValue = email.value.trim();
    let pass1Value = password_1.value.trim();
    let pass2Value = password_2.value.trim();

    if(userValue === '') {
        setError(user, "Nombre de usuario obligatorio");
        return false
    } else if(userValue.length < 4) {
        setError(user, "Nombre de usuario 4 caracteres minimo");
        return false
    } else {
        setSuccess(user);
    };

    if(emailValue === '') {
        setError(email, "Email obligatorio");
        return false
    } else if(!isEmail(emailValue)) {
        setError(email, "Formato de email no valido");
        return false
    } else {
        setSuccess(email);
    };

    if(pass1Value === '') {
        setError(password_1, "Password obligatorio");
        return false
    } else if(pass1Value.length < 8) {
        setError(password_1, "Password 8 caracteres minimo");
        return false
    } else {
        setSuccess(password_1);
    };

    if(pass2Value === '') {
        setError(password_2, "Password obligatorio");
        return false
    } else if(pass2Value.length < 8) {
        setError(password_2, "Password 8 caracteres minimo");
        return false
    } else {
        setSuccess(password_2);
    };

    if(pass1Value !== pass2Value) {
        setError(password_1, "Las contraseñas son diferentes");
        setError(password_2, "Las contraseñas son diferentes");
        return false
    }

    return true
};

const setError = (input, message) => {
    let formControl = input.parentElement;
    let small = formControl.querySelector('small');
    small.innerHTML = message
    formControl.className = 'form-control text error';
};

const setSuccess = (input) => {
    let formControl = input.parentElement;
    formControl.className = 'form-control text success';
};

const isEmail = email => {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

export default registerFormValidation