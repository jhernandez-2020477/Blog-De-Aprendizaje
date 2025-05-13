import { useState } from 'react'
import { getPostRequest } from '../../services/api'
import toast from 'react-hot-toast'

export const useApi = () => {
    const [posts, setPosts] = useState(null)
    const getPosts = async()=>{
       const response = await getPostRequest()
       if(response.error){
        return toast.error(
            response?.err?.response?.data?.message ||
            'Error al obtener las publicaciones'
        )
       }
       setPosts(response.data.posts)

    }
/*
    const addPost = async(post)=>{
      const response = await addPostRequest(post)
      if(response.error){
        console.error(response.err)
         return toast.error(
            response?.err?.response?.data?.message ||
            'Error al guardar la publicación'
        )
      }
      return toast.success('Publicación guardada')
    }
      */
  return {
    posts, //Tiene las publicacioens
    isFetchingPosts: !posts, //Valida si ya respondió el back o no
    getPosts, //Consulta las publicaciones al back
   // addPost
  }
}