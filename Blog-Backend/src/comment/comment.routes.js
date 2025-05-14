import { Router } from "express";
import { deleteComment, getAllComments, saveComment, updateComment, getCommentsByPostId } from "./comment.controller.js";
import { validSaveComment, validUpdateComment } from "../../helpers/validators.js";

const api = Router()

//Rutas públicas
api.post('/', [validSaveComment], saveComment)
api.put('/:id', [validUpdateComment], updateComment)
api.delete('/:id', deleteComment)
api.get('/getAll', getAllComments)
api.get('/getCommentsByPost/:id', getCommentsByPostId);

//Exportar
export default api