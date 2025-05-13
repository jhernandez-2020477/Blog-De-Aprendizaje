import Comment from '../comment/comment.model.js'
import Post from '../post/post.model.js'

//Agregar Comentario
export const saveComment = async(req, res)=>{
    try {

        const { post } = req.body
        let data = req.body
        let comment = new Comment(data)

        //Verificar si la publicación existe
        const postId = await Post.findById(post)
        if(!postId){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Publication not found, cannot save this Comment'
                }
            )
        }
        
        await comment.save()
        /*
        publicationId.comments.push(comment._id);  // Añadir el ID del comentario al array
        await publicationId.save();  // Guardar la publicación actualizada
        */

        return res.send(
            {
                message: `Save Comment successfully`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error creating Comment',
                err
            }
        )
    }
}

//Editar Comentario
export const updateComment = async(req, res)=>{
    const { id } = req.params
    const { post, ...data } = req.body
    try {
        //Verificar si la publicación existe
        const postId = await Post.findById(post)
        if(!postId){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Publication not found, cannot update this Comment'
                }
            )
        }
        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found, not updated'
                }
            )
        }
        const updateCom = await Comment.findByIdAndUpdate(
            id,
            { ...data, post: post },
            { new: true }
        )
        return res.send(
            {
                success: true,
                message: 'Comment updated successfully ;)',
                updateCom
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error when updating this Comment',
                err
            }
        )
    }
}

//Eliminar Comentario
export const deleteComment = async(req, res)=>{
    const { id } = req.params
    try {
        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found, not deleted'
                }
            )
        }
        //Eliminar el comentario
        await Comment.findByIdAndDelete(id)
        return res.send(
            {
                success: true,
                message: 'Comment deleted successfully :)'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error when deleting this Comment',
                err
            }
        )
    }
}

//Obtener todos los comentarios
export const getAllComments = async(req, res) => {
    const { limit, skip } = req.query
    try {
        const comments = await Comment.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate(
                {
                    path: 'post',
                    select: 'title description -_id'
                }
            )
            /*
            .populate(
                {
                    path: 'author',
                    select: 'name surname -_id'
                }      
            )
            */

        if (comments.length === 0) {
            return res.send(
                {
                    success: false,
                    message: 'Comments not found :('
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Comments found :)',
                total: comments.length,
                comments
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err
            }
        )
    }
}