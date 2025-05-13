import { CardPost } from './CardPost'
import { useContextPosts } from '../../shared/hooks/useContextPosts'
import { Modal } from '../Modal'

export const Posts = () => {
  const { posts } = useContextPosts()
  console.log(posts);
  
  return (
    <div className='d-flex flex-column align-items-center justify-content-center w-100 m-5'>
        <div className="mb-3 d-flex align-items-center justify-content-center">
            <h2>Mis publicaciones</h2>
        </div>
        <div className="d-flex align-items-center justify-content-center">
            <button 
              className='mb-3 btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#createPostModal'
            >
                Agregar post
            </button>
        </div>
        <Modal />
        {
          posts.map(
            (post)=> (
              <CardPost 
                key={post._id}
                title={post.title}
                description={post.description}
                course={post.course}
                date={post.date}
              />
            )
          )
        }
    </div>
  )
}