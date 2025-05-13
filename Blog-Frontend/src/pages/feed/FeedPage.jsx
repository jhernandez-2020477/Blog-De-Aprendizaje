import { FeedContent } from '../../components/FeedContent'
import { PostProvider } from '../../contexts/PostsContext'

export const FeedPage = () => {    
  return (
    <div>
        <PostProvider>
          <FeedContent />
        </PostProvider>
    </div>
  )
}