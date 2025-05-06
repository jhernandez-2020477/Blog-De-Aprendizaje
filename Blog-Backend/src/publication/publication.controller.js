import Publication from '../publication/publication.model.js'

//Agregar publicación
export const savePost = async(req, res)=>{
    try {

        const { title } = req.body
        let data = req.body

         // Verificar si ya existe una publicación con el mismo título
         const existingPublication = await Publication.findOne(
            { 
                title: title 
            }
        )
        if(existingPublication) {
             return res.status(400).send(
                {
                    success: false,
                    message: 'A publication with this title already exists'
                }
            )
        }

        let publication = new Publication(data)
        await publication.save()
        return res.send(
            {
                message: `Save Post successfully, the title is: ${publication.title}`
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

        const publication = await Publication.findById(id)

        if (!publication) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found, not updated'
                }
            )
        }

        const updatePubli = await Publication.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )
        return res.send(
            {
                success: true,
                message: 'Publication updated successfully :)',
                updatePubli                
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
        const publication = await Publication.findById(id)
        if(!publication){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found, not deleted'
                }
            )
        }

        //Eliminar la Publicación
        await Publication.findByIdAndDelete(id)
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