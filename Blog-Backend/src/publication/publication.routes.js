import { Router } from "express";
import { deletePost, savePost, updatePost } from "./publication.controller.js";
import { validSavePost, validUpdatePost } from "../../helpers/validators.js";

const api = Router()

//Rutas Publicas
api.post('/',[validSavePost], savePost)
api.put('/:id',[validUpdatePost], updatePost)
api.delete('/:id', deletePost)

//Exportar 
export default api