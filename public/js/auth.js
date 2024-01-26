import inputValidator, { inputsCheked } from "./inputValidator.js";

let register = document.getElementById('register');
let login = document.getElementById('login');
let registerSubmit = register?.querySelector('input[type="submit"]');
let loginSubmit = login?.querySelector('input[type="submit"]');
let loginEmail = login?.querySelector('input[name="email"]');
// let logout = document.getElementById('logout');


let message = document.getElementById('message');

const showMessage = (message, text) => {
    message.innerHTML = text;
    message.classList.add('show');
    hiddeMessage(message)
};

const hiddeMessage = (message) => {
    setTimeout(() => {
        message.classList.remove('show')
    }, 5000);

    setTimeout(() => {
        message.innerHTML = '';
    }, 5500);
};

if(register) {
    let inputs = register.querySelectorAll('input[type="text"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('keyup', inputValidator);
        input.addEventListener('blur', inputValidator);
    });

    register.addEventListener('submit', async (e) => {
        e.preventDefault();
        let { user, email, password_1, password_2 } = inputsCheked

        if(!user || !email || !password_1 || !password_2) {
            return showMessage(message, "<p>Campos incompletos o invalidos</p>")
        }

        registerSubmit.disabled = true
        
        const body = JSON.stringify({
            user: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
        });

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if(res.ok) {
            const text = `<p>${data.message}</p>`;
            showMessage(message, text);
            hiddeMessage(message)
            setTimeout(() => {
                window.location.href = '/login'
            }, 3000);
        } else {
            const text = `<p>${data.message}</p>`;
            showMessage(message, text);
            hiddeMessage(message)
            registerSubmit.disabled = false;
        };

    })
};

if(login) {
    loginEmail.addEventListener('keyup', inputValidator);
    loginEmail.addEventListener('blur', inputValidator);

    login.addEventListener('submit', async e => {
        e.preventDefault();
        loginSubmit.disabled = true;
        let { email } = inputsCheked;
        let password = e.target[1];

        if(!email || password.value.trim() == '') {
            loginSubmit.disabled = false;
            return showMessage(message, "<p>Campos incompletos o invalidos</p>")
        }
        
        const body = JSON.stringify({
            email: e.target[0].value,
            password: e.target[1].value,
        });

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if(res.ok) {
            const text = `<p>${data.message}</p>`;
            showMessage(message, text);
            setTimeout(() => {
                window.location.href = '/'
            }, 3000);
        } else {
            const text = `<p>${data.message}</p>`;
            showMessage(message, text);
            loginSubmit.disabled = false;
        };


    })

};

// if(logout) {
//     logout.addEventListener('click', async e => {
//         // e.preventDefault()

//         fetch('/api/logout')
//     })
// }