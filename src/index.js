import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Si tienes este archivo
import AppSelector from './AppSelector';  // Importas tu selector

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppSelector />  {/* Renderizas el selector */}
  </React.StrictMode>
);