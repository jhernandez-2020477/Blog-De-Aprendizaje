import { Posts } from "./components/Posts/Posts"
import { NotFoundPage } from "./pages/NotFound/NotFoundPage"
import { PostDetailsPage } from "./pages/PostDetail/PostDetailsPage"
import { FeedPage } from "./pages/feed/FeedPage"
import { Navigate, Link } from "react-router-dom"
import "./App.css"

export const routes = [
  {
    path: '/',
    element: <Navigate to="/feed" replace />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
  {
    path: '/feed',
    element: <FeedPage />,
    children: [
      {
        index: true,
        element: (
          <div className="welcome-message">
            <h2>¡Bienvenido!</h2>
            <p>Ingresa para ver las publicaciones más recientes de mi blog.</p>
            <Link to="/feed/posts" className="btn-see-posts">
              Ver publicaciones
            </Link>
          </div>
        )
      },
      {
        path: 'posts',
        element: <Posts />
      },
      {
        path: 'post/:id',
        element: <PostDetailsPage />
      }
    ]
  }
]
