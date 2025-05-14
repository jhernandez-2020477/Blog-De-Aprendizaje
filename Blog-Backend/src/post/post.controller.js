import Post from '../post/post.model.js'

//Agregar publicación
export const savePost = async(req, res)=>{
    try {

        const { title } = req.body
        let data = req.body

         // Verificar si ya existe una publicación con el mismo título
         const existingPost = await Post.findOne(
            { 
                title: title 
            }
        )
        if(existingPost) {
             return res.status(400).send(
                {
                    success: false,
                    message: 'A publication with this title already exists'
                }
            )
        }

        let post = new Post(data)
        await post.save()
        return res.send(
            {
                message: `Save Post successfully, the title is: ${post.title}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error creating Post',
                err
            }
        )
    }
}

//Editar Publicación
export const updatePost = async(req, res)=>{
    const { id } = req.params
    const { ...data } = req.body
    try {

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found, not updated'
                }
            )
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )
        return res.send(
            {
                success: true,
                message: 'Publication updated successfully :)',
                updatePost                
            }
        )
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error when updating this Publication',
                err
            }
        )
    }
}

//Eliminar Publicación
export const deletePost = async(req, res)=>{
    const { id } = req.params
    try {
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found, not deleted'
                }
            )
        }

        //Eliminar la Publicación
        await Post.findByIdAndDelete(id)
        return res.send(
            {
                success: true,
                message: 'Publication deleted successfully :)',
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error when deleting this Publication',
                err
            }
        )
    }
}

//Obtener todos
export const getAllPost = async(req, res)=>{
    try{
        const posts = await Post.find()
            //.populate('author category', 'username name')
        if(posts.length == 0){
            return res.status(404).send(
                { 
                    success: false, 
                    message: 'Not Found posts' 
                }
            )
        }
        return res.send(
            {
                success: true, 
                message: 'Posts found', 
                posts
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false, 
                message: 'General error getting posts', 
                err
            }
        )
    }
}

// Obtener un post por ID
export const getPostById = async(req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Post not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Post found',
                post
            }
        )
    } catch (err) {
        console.error(err);
        return res.status(500).send(
            {
                success: false,
                message: 'Error getting post by ID',
                err
            }
        )
    }
}
