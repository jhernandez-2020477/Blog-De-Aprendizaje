// api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3626',
    timeout: 2000,
});

// Obtener todos los posts
export const getPostRequest = async () => {
    try {
        return await apiClient.get('/post/getAllPosts');
    } catch (err) {
        return { error: true, err };
    }
};

// Obtener un post por ID
export const getPostById = async (id) => {
    try {
        return await apiClient.get(`/post/${id}`);
    } catch (err) {
        return { error: true, err };
    }
};

// Obtener comentarios de un post
export const getCommentsByPostId = async (postId) => {
    try {
        return await apiClient.get(`/comment/getCommentsByPost/${postId}`);
    } catch (err) {
        return { error: true, err };
    }
};

// Crear un comentario
export const createComment = async (data) => {
    try {
        return await apiClient.post('/comment', data); // << Correcto endpoint
    } catch (err) {
        return { error: true, err };
    }
};