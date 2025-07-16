import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { GalleryProvider } from './contexts/GalleryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GalleryProvider>
          <App />
        </GalleryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
