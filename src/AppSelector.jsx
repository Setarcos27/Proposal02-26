import React, { useState } from 'react';
import App1 from './apps/App1';
import App2 from './apps/App2';
import App3 from './apps/App3';

const AppSelector = () => {
  const [activeApp, setActiveApp] = useState('app1');
  
  // Estado compartido para costes de viaje
  const [sharedTravelCosts, setSharedTravelCosts] = useState({
    M3: { travel: 825, daily: 3774, total: 4599 },
    M4: { travel: 0, daily: 3774, total: 3774 },
    M5: { travel: 1100, daily: 6216, total: 7316 },
    M6_7: { travel: 0, daily: 4662, total: 4662 },
    M8: { travel: 4125, daily: 59200, total: 63325 }
  });

  const apps = [
    { 
      id: 'app1', 
      name: '📊 Presentación Proyecto', 
      component: <App1 /> 
    },
    { 
      id: 'app2', 
      name: '✈️ Calculadora Viajes', 
      component: <App2 
        travelCosts={sharedTravelCosts} 
        setTravelCosts={setSharedTravelCosts} 
      /> 
    },
    { 
      id: 'app3', 
      name: '💰 Presupuesto General', 
      component: <App3 
        travelCosts={sharedTravelCosts} 
        setTravelCosts={setSharedTravelCosts} 
      /> 
    }
  ];

  // Encuentra la app activa
  const activeAppData = apps.find(app => app.id === activeApp);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header de navegación */}
      <div className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Food Heritage Hubs - Suite KA210</h1>
              <p className="text-gray-600 text-sm">Herramientas para la preparación del proyecto</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {apps.map(app => (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeApp === app.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {app.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de app activa */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-blue-700">
                {activeAppData?.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="font-bold text-blue-900">
                {activeAppData?.name}
              </h2>
              <p className="text-blue-700 text-sm">
                {activeApp === 'app1' && 'Presentación completa del proyecto KA210'}
                {activeApp === 'app2' && 'Calculadora de viajes y manutención para actividades'}
                {activeApp === 'app3' && 'Presupuesto general ajustable con todas las partidas'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido de la app activa */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        {activeAppData?.component}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>🧠 <strong>Recordatorio:</strong> Las tres apps son complementarias. Usa App2 para calcular viajes, App3 para el presupuesto completo, y App1 para presentar el proyecto.</p>
          <p className="mt-2">📅 Fecha límite KA210: <strong>1 de octubre de 2025</strong></p>
        </div>
      </div>
    </div>
  );
};

export default AppSelector;