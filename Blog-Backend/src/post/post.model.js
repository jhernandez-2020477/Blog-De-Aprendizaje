//Modelo de Publicación
import mongoose, { Schema, model } from "mongoose";


const postSchema = Schema(
    {
        title: {
            type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Title is required']
        },
        description: {
            type: String,
            maxLength: [400, `Can´t be overcome 400 characters`],
            required: [true, 'Content is required']
        },
        course: {
            type: String,
            maxLength: [30, `Can´t be overcome 30 characters`],
            required: [true, 'Course is required']
        },
        grade: {
            type: String,
            maxLength: [15, `Can´t be overcome 15 characters`],
            required: [true, 'Grade is required']
        },
        repository: {
            type: String,
            maxLength: [80, `Can´t be overcome 80 characters`],
            required: [true, 'Repository is required']
        },
        date: { 
            type: Date, 
            default: Date.now 
        }
    }
)

//Crear y exportar el modelo
export default model('Post', postSchema)