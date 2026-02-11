// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppSelector from './AppSelector'
import './index.css' // Si tienes este archivo, si no, quítalo

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppSelector />
  </React.StrictMode>
)