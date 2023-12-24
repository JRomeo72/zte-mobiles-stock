import { Schema, Types, model } from "mongoose";

const MobileSchema = new Schema(
    {
        id: {
            type: Types.ObjectId
        },
        modelo: {
            type: String
        },
        nombre: {
            type: String,
            require: true
        },
        empresa: {
            type: String
        },
        almacenado: {
            type: String
        },
        sims: {
            type: Number
        },
        cantidad: {
            type: Number
        },
        entregados: {
            type: Number
        },
        stock: {
            type: Number
        },
        imagen: {
            public_id: {
                type: String,
                require: true
            },
            secure_url: {
                type: String,
                require: true
            }

        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('Mobile', MobileSchema)