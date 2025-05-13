import { useContext } from 'react'
import { PostsContext } from '../../contexts/PostsContext'
import toast from 'react-hot-toast'

//Utilizar el contexto (Reutilizable)
export const useContextPosts = () => {
    const context = useContext(PostsContext)
    if(!context){
        toast.error('Error al obtener información')
        return console.error('No existe el provedor del contexto')
    }
  return context
}