//Modelo de Publicación
import mongoose, { Schema, model } from "mongoose";


const publicationSchema = Schema(
    {
        title: {
            type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Title is required']
        },
        description: {
            type: String,
            maxLength: [100, `Can´t be overcome 100 characters`],
            required: [true, 'Content is required']
        },
        course: {
            type: String,
            maxLength: [15, `Can´t be overcome 15 characters`],
            required: [true, 'Course is required']
        },
        date: { 
            type: Date, 
            default: Date.now 
        }
    }
)

//Crear y exportar el modelo
export default model('Publication', publicationSchema)