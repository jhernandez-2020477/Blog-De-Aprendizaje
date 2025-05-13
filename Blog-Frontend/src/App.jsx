import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'

function App() {
  const elementRoutes = useRoutes(routes)

  return (
    <>
      {elementRoutes}
      <Toaster  position='bottom-center' reverseOrder={false}/>
    </>
  )
}

export default App