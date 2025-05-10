import { Router } from "express";
import { deletePost, getAllPost, savePost, updatePost } from "./post.controller.js";
import { validSavePost, validUpdatePost } from "../../helpers/validators.js";

const api = Router()

//Rutas Publicas
api.get('/getAllPosts', getAllPost)
api.post('/',[validSavePost], savePost)
api.put('/:id',[validUpdatePost], updatePost)
api.delete('/:id', deletePost)

//Exportar 
export default api