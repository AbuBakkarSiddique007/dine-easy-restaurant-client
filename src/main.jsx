import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './provider/AuthProvider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <HelmetProvider>
        <div className='max-w-7xl mx-auto'>
          <RouterProvider router={router}> </RouterProvider>
        </div>
      </HelmetProvider>
    </AuthProvider>

  </StrictMode>
)
