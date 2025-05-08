//Configuración del Servidor de express

'use strict'

//ECModules
import express from "express" //Servidor HTTP
import morgan from "morgan" //Logs
import helmet from "helmet" //Seguridad para HTTP
import cors from 'cors' //Acceso al API
import publicationRoutes from '../src/publication/publication.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'


const configs = (app )=>{
    app.use(express.json()) //Aceptar y enviar datos JSON
    app.use(express.urlencoded({extended: false})) //No encriptar
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/post', publicationRoutes)
    app.use('/comment', commentRoutes)
}

export const initServer = async()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}