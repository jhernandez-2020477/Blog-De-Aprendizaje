import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardPost } from './CardPost'
import { useContextPosts } from '../../shared/hooks/useContextPosts'
import { Modal } from '../Modal'
import "./Posts.css"

export const Posts = () => {
  const { posts } = useContextPosts()
  const [filter, setFilter] = useState("all")
  const navigate = useNavigate()

  const filteredPosts = posts.filter(post => {
    if (filter === "all") return true
    if (filter === "recent") return true
    if (["Taller", "Tecnología", "Tics", "Práctica Supervisada"].includes(filter)) {
      return post.course.trim() === filter
    }
    if (["Cuarto", "Quinto", "Sexto"].includes(filter)) {
      return post.grade === filter
    }
    return true
  })

  const sortedPosts = filter === "recent"
    ? [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
    : filteredPosts

  return (
    <div className='body d-flex flex-column align-items-center justify-content-center w-95 m-5'>
      <div className="header mb-4">
        <div className="d-flex align-items-center justify-content-between">
          <button
            className="btn-volver"
            onClick={() => navigate('/feed')}
          >
            ← Volver al inicio
          </button>
          <h2 className="flex-grow-1 text-center m-0">Mis Publicaciones</h2>
          <div style={{ width: '160px' }}></div> {/* Espaciador simétrico */}
        </div>

        <select
          className="form-select mt-3 mx-auto"
          style={{ maxWidth: "300px" }}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="recent">Más recientes</option>
          <option value="Taller">Taller</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Tics">Tics</option>
          <option value="Práctica Supervisada">Práctica Supervisada</option>
          <option value="Cuarto">Cuarto</option>
          <option value="Quinto">Quinto</option>
          <option value="Sexto">Sexto</option>
        </select>
      </div>

      <Modal />

      <div className="posts-grid">
        {sortedPosts.map((post) => (
          <CardPost
            key={post._id}
            _id={post._id}
            title={post.title}
            course={post.course}
            date={post.date}
          />
        ))}
      </div>
    </div>
  )
}
