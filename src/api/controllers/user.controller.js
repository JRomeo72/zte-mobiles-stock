import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const viewLogin = (req, res) => {
    res.render('login')
};

const viewRegister = (req, res) => {
    res.render('register')
};

const login = async (req, res) => {
    
    const { email, password } = req.body
    res.send( { message: "Datos del Login recibidos" } )
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
        res.status(400).send( { message: "Error en la ceación de nuevo registro", error: error.message } )
    }

};

const auth = {
    viewLogin,
    viewRegister,
    login,
    register
};

export default auth