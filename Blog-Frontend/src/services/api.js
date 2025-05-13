import axios from 'axios'

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:3626',
        timeout: 2000,
    }
)

export const getPostRequest = async()=>{
    try{
        return await apiClient.get('/post/getAllPosts')
    }catch(err){
        return {
            error: true,
            err
        }
    }
}