//Modelo de comentario
import mongoose, { Schema, model } from "mongoose";

const commentSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Content is required']
        },
        content: {
            type: String,
            maxLength: [200, `Can´t be overcome 200 characters`],
            required: [true, 'Content is required']
        },
        publication: {
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'Publication is required']
        },
        date: { 
            type: Date, 
            default: Date.now,  
        },
    },
)

//Crear y exportar el modelo
export default model('Comment', commentSchema)