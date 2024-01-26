import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const viewHome = (req, res) => {
    res.render('home', { token: req.token })
}

const viewLogin = (req, res) => {
    res.render('login', { token: req.token })
};

const viewRegister = (req, res) => {
    res.render('register', { token: req.token })
};

const login = async (req, res) => {

    try {
        const { email, password } = req.body
        let userFound = await User.findOne( { email: email } );

        if(!userFound) {
            return res.status(400).send( { message: "Credenciales incorrectas1" } )
        };

        let passChecked = await bcrypt.compare(password, userFound.password);

        if(!passChecked) {
            return res.status(400).send( { message: "Credenciales incorrectas2" } )
        };

        let payload = { user: userFound.user, email: userFound.email };
        let secret = process.env.JWT_SECRET;
        let expires = process.env.JWT_EXPIRATION;

        let token = jwt.sign(payload, secret, {expiresIn: expires});

        res.cookie("token", token);


        res.status(200).send( { message: "Usuario encontrado" } )
    } catch (error) {
        res.status(400).send( { message: "Error en el proceso de registro", error: error.message } )

    }
    
};

const register = async (req, res) => {
    try {
        const { user, email, password } = req.body;
        let userFound = await User.findOne( { email: email } );

        if(userFound) {
            return res.status(400).send( { message: "Email ya registrado" } );
        }

        let salt = await bcrypt.genSalt(5);
        let passHash = await bcrypt.hash(password, salt);
        let data = { user, email, password: passHash };

        const newUser = await User.create(data);
        res.status(200).send( { message: "usuario creado", data: newUser } );
    } catch (error) {
        res.status(400).send( { message: "Error en el proceso de registro", error: error.message } )
    }

};

const logout = (req, res) => {
    res.cookie('token', "", { expires: new Date(0) });
    res.redirect('/');
}

const auth = {
    viewHome,
    viewLogin,
    viewRegister,
    login,
    register,
    logout
};

export default auth