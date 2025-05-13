import { Outlet } from 'react-router-dom'
import { useContextPosts } from '../shared/hooks/useContextPosts'

export const FeedContent = () => {
  const { isFetchingPosts } = useContextPosts()
  if (isFetchingPosts) {
    return (
      <span>Cargando...</span>
    )
  }
  return (
    <>
      {/* Manejar Rutas Hijas */}
      <Outlet />
    </>
  )
}