import { Router } from "express";
import { deleteComment, getAllComments, saveComment, updateComment } from "./comment.controller.js";
import { validSaveComment, validUpdateComment } from "../../helpers/validators.js";

const api = Router()

//Rutas públicas
api.post('/', [validSaveComment], saveComment)
api.put('/:id', [validUpdateComment], updateComment)
api.delete('/:id', deleteComment)
api.get('/getAll', getAllComments)

//Exportar
export default api