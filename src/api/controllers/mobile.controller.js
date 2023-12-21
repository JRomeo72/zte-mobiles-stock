import Mobile from "../models/mobile.model.js";
import { saveFile } from "../config/multer.js";

const getStock = async (req, res) => {

    if(req.baseUrl == '/api') {
        try {
            const data = await Mobile.find()
            res.send( data )
        } catch (error) {
            res.send( { 'message': "Error en el proceso" } )
        }
    } else {
        try {
            const mobiles = await Mobile.find().lean()
            if(mobiles != "") {
                res.render( 'stock', { mobiles, success: true, db: true } )
            }else{
                res.render( 'stock', { success: true, db: false } )
            }
        } catch (error) {
            res.render( 'stock', { success: false } )
        }
    }
};

const getMobile = async (req, res) => {
    const { id } = req.params;

    if(req.baseUrl == '/api') {
        try {
            const foundMobile = await Mobile.findById(id);
            if(!foundMobile) return res.send( { 'message': "Item no encontrado" } );
            res.send( foundMobile )
        } catch (error) {
            res.send( { 'message': "Error en la busqueda" } )
        }
    } else {
        try {
            const foundMobile = await Mobile.findById(id).lean();
            if(!foundMobile) return res.render( 'mobile', { success: false, message: "Item no encontrado" } );
            res.render( 'mobile', { mobile: foundMobile, success: true } )
        } catch (error) {
            res.render( 'mobile', { success: false, message: "Error en la busqueda" } )
        }
    }
};

const postMobile = async (req, res) => {

    if(req.baseUrl == '/api') {
        try {
            const { nombre, modelo, empresa, almacenado } = req.body;
            const sims = Number(req.body.sims);
            const cantidad = Number(req.body.cantidad);
            const entregados = Number(req.body.entregados);
            let stock = cantidad - entregados;
            let imagen = '';
        
            if(req.files) {
                req.files.map(img => saveFile(img));
            };
            
            if(req.file) {
                saveFile(req.file);
                imagen = req.file.originalname
            };
        
            const mobile = {
                nombre,
                modelo,
                empresa,
                almacenado,
                sims,
                cantidad,
                entregados,
                stock,
                imagen
            };

            const newMobile = await Mobile.create(mobile);
            res.send( { 'New Mobile': newMobile } )
        } catch (error) {
            res.send( { 'message': "Error en el proceso" } )
        }
    } else {
        res.render( 'add', { url: process.env.URL_BASE })
    }

};

const putMobile = (req, res) => {
    res.send('<h1>Put Mobile</h1>')
};

const deleteMobile = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Mobile.findByIdAndDelete(id);
        res.send(response)
    } catch (error) {
        res.send( { 'message': "Error en el proceso" } )
    }
};

const mobile = {
    getStock,
    getMobile,
    postMobile,
    putMobile,
    deleteMobile
};

export default mobile;