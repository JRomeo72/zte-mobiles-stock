import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            require: true
        },
        password: {
            type: String
        },
        role: {
            type: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('User', UserSchema)