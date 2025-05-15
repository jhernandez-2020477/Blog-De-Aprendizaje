import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  getPostById,
  getCommentsByPostId,
  createComment
} from "../../services/api.js"
import "./PostDetailsPage.css"

export const PostDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [formData, setFormData] = useState({ name: "", content: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const resPost = await getPostById(id)
      const resComments = await getCommentsByPostId(id)

      if (!resPost.error) setPost(resPost.data)
      if (!resComments.error && Array.isArray(resComments.data.comments)) {
        const sorted = resComments.data.comments.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
        setComments(sorted)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.content) return

    setLoading(true)

    const newComment = {
      ...formData,
      post: id
    }

    const res = await createComment(newComment)
    if (!res.error) {
      const updatedComments = await getCommentsByPostId(id)
      if (!updatedComments.error && Array.isArray(updatedComments.data.comments)) {
        const sorted = updatedComments.data.comments.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
        setComments(sorted)
      }
      setFormData({ name: "", content: "" })
    }

    setLoading(false)
  }

  if (!post) return <p className="text-center mt-4">Cargando publicación...</p>

  return (
    <div className="post-detail-container">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="post-content">
        <h2>{post.title}</h2>
        <p className="text-muted mb-1">
          {new Date(post.date).toLocaleDateString("es-ES")}
        </p>
        <p>{post.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <h4>Agregar comentario</h4>
        <input
          className="form-control"
          type="text"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <textarea
          className="form-control"
          placeholder="Tu comentario"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
        <button className="btn-submit" type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>

      <div className="comments-section">
        <h4>Comentarios ({comments.length})</h4>
        {comments.length === 0 ? (
          <p className="text-muted">No hay comentarios aún.</p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="comment-card">
              <strong>{c.name}</strong>
              <p>{c.content}</p>
              <small>{new Date(c.date).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  )
}