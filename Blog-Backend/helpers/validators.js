import { body } from "express-validator"; //Capturar todo el body de la solicitud
import { validateErrorWithoutImg } from "./validate.error.js";

/*----------------------------- PUBLICACIÓN --------------------------------- */
export const validSavePost = [
    body('title', 'Title cannot be empty')
        .notEmpty() 
        .isLength({ max: 50 })
        .withMessage('Can´t be overcome 50 characters'),
    body('description', 'Content cannot be empty')
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage('Can´t be overcome 50 characters'), 
    body('course', 'Course cannot be empty')
        .notEmpty()
        .isLength({ max: 15 })
        .withMessage('Can´t be overcome 15 characters'),      
        validateErrorWithoutImg
]

export const validUpdatePost = [
    body('title', 'Title is optional')
        .optional() 
        .isLength({ max: 50 })
        .withMessage('Can´t be overcome 50 characters'),
    body('content', 'Content is optional')
        .optional()
        .isLength({ max: 100 })
        .withMessage('Can´t be overcome 50 characters'), 
    body('course', 'Course cannot be empty')
        .optional()
        .isLength({ max: 15 })
        .withMessage('Can´t be overcome 15 characters'),       
        validateErrorWithoutImg
]

/*----------------------------- COMMENT --------------------------------- */
export const validSaveComment = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .isLength({ max: 50 })
        .withMessage('Can´t be overcome 50 characters'),
    body('content', 'Content cannot be empty')
        .notEmpty() 
        .isLength({ max: 200 })
        .withMessage('Can´t be overcome 200 characters'),
    body('post', 'Post cannot be empty')
        .notEmpty(),      
        validateErrorWithoutImg
]

export const validUpdateComment = [
    body('content', 'Content cannot be empty')
        .optional() 
        .isLength({ max: 200 })
        .withMessage('Can´t be overcome 200 characters'),
    body('post', 'Post cannot be empty')
        .optional(),      
        validateErrorWithoutImg
]