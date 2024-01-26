// import registerValidation from "./re../registerValidator.js"

const register = document.getElementById('register');
const login = document.getElementById('login');
const registerSubmit = register?.querySelector('input[type="submit"]');
const loginSubmit = login?.querySelector('input[type="submit"]');
const message = document.getElementById('message');

const showMessage = (message, textMessage) => {
    message.innerHTML = textMessage
    message.classList.add('show')
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
    register.addEventListener('submit', async (e) => {
        e.preventDefault();
        registerSubmit.disabled = true

        let validated = registerValidation(e);

        if(!validated) return registerSubmit.disabled = false;

        // if(e.target[2].value.trim() != e.target[3].value.trim()) {
        //     const textMessage = '<p>Las contraseñas son diferentes</p>';
        //     showMessage(message, textMessage);
        //     hiddeMessage(message)
        //     return
        // };
        
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
            const textMessage = `<p>${data.message}</p>`;
            showMessage(message, textMessage);
            hiddeMessage(message)
            setTimeout(() => {
                window.location.href = '/login'
            }, 3000);
        } else {
            const textMessage = `<p>${data.message}</p>`;
            showMessage(message, textMessage);
            hiddeMessage(message)
            registerSubmit.disabled = false;
        };

    })
};