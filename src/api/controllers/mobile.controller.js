import fs from 'fs';
import Mobile from "../models/mobile.model.js";
import { saveFile } from "../utils/multer.js";
import uploadImageCloud from "../utils/cloudinary.js";

// > Get All Mobiles 
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

//> Get One Mobile 
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

//> Add a New Mobile 
const postMobile = async (req, res) => {

    if(req.baseUrl == '/api') {
        try {
            const { nombre, modelo, empresa, almacenado } = req.body;
            const sims = Number(req.body.sims);
            const cantidad = Number(req.body.cantidad);
            const entregados = Number(req.body.entregados);
            let stock = cantidad - entregados;
            let imagen = '';

            const _next = async () => {

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
            }
        
            if(req.files) {
                req.files.map(img => saveFile(img));
            };
            
            if(req.file) {
                // const { newName, newPath } = saveFile(req.file, nombre);
                // let newPath = saveFile(req.file, nombre)
                // const result = await uploadImageCloud(newPath);
                const result = await uploadImageCloud(req.file.path);

                fs.unlinkSync(req.file.path);

                imagen = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                };

                _next()
            } else {
                _next()
            };
        
        } catch (error) {
            res.send( { 'message': "Error en el proceso" } )
        }
    } else {
        res.render( 'add' )
    }

};

//> Update a Mobile 
const putMobile = async (req, res) => {
    
    if(req.baseUrl == '/api') {
        
    } else {
        try {
            
            res.render()
        } catch (error) {
            res.render()
        }
        
    }
};

//> Delete a Mobile 
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