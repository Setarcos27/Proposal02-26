import React, { useState, useEffect } from 'react';

const App3 = ({ travelCosts: propTravelCosts, setTravelCosts: propSetTravelCosts }) => {
  // ===========================================================================
  // 1. DATOS IMPORTADOS DE APP2 (VIAJES + MANUTENCIÓN)
  // ===========================================================================
  
  // Si vienen por props, usamos esos; si no, los iniciales
  const initialTravelCosts = propTravelCosts || {
    M3: { travel: 825, daily: 3774, total: 4599 },
    M4: { travel: 0, daily: 3774, total: 3774 },
    M5: { travel: 1100, daily: 6216, total: 7316 },
    M6_7: { travel: 0, daily: 4662, total: 4662 },
    M8: { travel: 4125, daily: 59200, total: 63325 }
  };

  // ===========================================================================
  // 2. OTRAS PARTIDAS DEL PRESUPUESTO KA210
  // ===========================================================================
  
  const initialManagementCosts = [
    { id: 1, name: 'Gestión del proyecto', description: 'Coordinación del consorcio, administración, informes', amount: 9000 },
    { id: 2, name: 'Comunicación interna', description: 'Reuniones online, plataformas colaborativas', amount: 2000 },
    { id: 3, name: 'Evaluación y calidad', description: 'Evaluador externo, herramientas de seguimiento', amount: 3000 }
  ];

  const initialDevelopmentCosts = [
    { id: 1, name: 'Diseño y desarrollo web/app', description: 'Prototipo plataforma digital con asistente IA', amount: 8000 },
    { id: 2, name: 'Diseño gráfico y maquetación', description: 'Recetario físico y digital, materiales gráficos', amount: 4000 },
    { id: 3, name: 'Producción audiovisual', description: 'Documentales, vídeotutoriales, fotografía profesional', amount: 5000 },
    { id: 4, name: 'Traducción y revisión', description: 'Contenidos trilingües (ES, IT, GL)', amount: 3000 }
  ];

  const initialDisseminationCosts = [
    { id: 1, name: 'Eventos multiplicadores', description: 'Organización de eventos locales de difusión', amount: 4000 },
    { id: 2, name: 'Materiales promocionales', description: 'Flyers, roll-ups, merchandising', amount: 2000 },
    { id: 3, name: 'Comunicación online', description: 'Gestión redes sociales, campañas digitales', amount: 1500 }
  ];

  const initialEquipmentCosts = [
    { id: 1, name: 'Equipo audiovisual', description: 'Cámaras, micrófonos, trípodes para documentación', amount: 3500 },
    { id: 2, name: 'Material para Food Labs', description: 'Utensilios cocina, menaje desechable ecológico', amount: 2500 },
    { id: 3, name: 'Kit viaje documentalista', description: 'Materiales para trabajo de campo', amount: 1500 }
  ];

  // ===========================================================================
  // 3. ESTADOS
  // ===========================================================================
  
  const [travelCosts, setTravelCosts] = useState(initialTravelCosts);
  const [managementCosts, setManagementCosts] = useState(initialManagementCosts);
  const [developmentCosts, setDevelopmentCosts] = useState(initialDevelopmentCosts);
  const [disseminationCosts, setDisseminationCosts] = useState(initialDisseminationCosts);
  const [equipmentCosts, setEquipmentCosts] = useState(initialEquipmentCosts);
  
  const [newCostItem, setNewCostItem] = useState({ category: '', name: '', description: '', amount: 0 });
  const [activeCategory, setActiveCategory] = useState('management');

  // ===========================================================================
  // 4. Sincronización con props externas
  // ===========================================================================
  
  useEffect(() => {
    if (propTravelCosts && JSON.stringify(propTravelCosts) !== JSON.stringify(travelCosts)) {
      setTravelCosts(propTravelCosts);
    }
  }, [propTravelCosts]);

  // Notificar cambios al padre (AppSelector)
  useEffect(() => {
    if (propSetTravelCosts) {
      propSetTravelCosts(travelCosts);
    }
  }, [travelCosts, propSetTravelCosts]);

  // ===========================================================================
  // 5. CÁLCULOS
  // ===========================================================================
  
  const calculateSubtotal = (costsArray) => {
    return costsArray.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTotalTravel = () => {
    return Object.values(travelCosts).reduce((sum, activity) => sum + activity.total, 0);
  };

  const calculateGrandTotal = () => {
    return (
      calculateTotalTravel() +
      calculateSubtotal(managementCosts) +
      calculateSubtotal(developmentCosts) +
      calculateSubtotal(disseminationCosts) +
      calculateSubtotal(equipmentCosts)
    );
  };

  // ===========================================================================
  // 6. MANEJADORES
  // ===========================================================================
  
  const updateTravelCost = (activityKey, field, value) => {
    const newTravelCosts = {
      ...travelCosts,
      [activityKey]: {
        ...travelCosts[activityKey],
        [field]: parseInt(value) || 0,
        total: field === 'travel' 
          ? (parseInt(value) || 0) + travelCosts[activityKey].daily
          : travelCosts[activityKey].travel + (parseInt(value) || 0)
      }
    };
    setTravelCosts(newTravelCosts);
  };

  const updateCostItem = (category, id, field, value) => {
    const setterMap = {
      management: setManagementCosts,
      development: setDevelopmentCosts,
      dissemination: setDisseminationCosts,
      equipment: setEquipmentCosts
    };
    
    const setter = setterMap[category];
    if (!setter) return;

    setter(prev => prev.map(item => 
      item.id === id 
        ? { ...item, [field]: field === 'amount' ? parseInt(value) || 0 : value }
        : item
    ));
  };

  const addNewCostItem = () => {
    if (!newCostItem.name || !newCostItem.category) return;

    const newItem = {
      id: Date.now(),
      name: newCostItem.name,
      description: newCostItem.description,
      amount: newCostItem.amount || 0
    };

    const setterMap = {
      management: setManagementCosts,
      development: setDevelopmentCosts,
      dissemination: setDisseminationCosts,
      equipment: setEquipmentCosts
    };

    const setter = setterMap[newCostItem.category];
    if (setter) {
      setter(prev => [...prev, newItem]);
      setNewCostItem({ category: '', name: '', description: '', amount: 0 });
    }
  };

  const removeCostItem = (category, id) => {
    const setterMap = {
      management: setManagementCosts,
      development: setDevelopmentCosts,
      dissemination: setDisseminationCosts,
      equipment: setEquipmentCosts
    };

    const setter = setterMap[category];
    if (setter) {
      setter(prev => prev.filter(item => item.id !== id));
    }
  };

  const resetToDefaults = () => {
    setTravelCosts(initialTravelCosts);
    setManagementCosts(initialManagementCosts);
    setDevelopmentCosts(initialDevelopmentCosts);
    setDisseminationCosts(initialDisseminationCosts);
    setEquipmentCosts(initialEquipmentCosts);
  };

  // ===========================================================================
  // 7. DATOS AUXILIARES
  // ===========================================================================
  
  const activityNames = {
    M3: 'Ruta Andalucía (Italia)',
    M4: 'Ruta Abruzzo (Italia)',
    M5: 'Training Course Central',
    M6_7: 'Ruta Galicia',
    M8: 'Evento Final Gallego'
  };

  const activityDescriptions = {
    M3: '3 semanas documentando recetas mediterráneas en pueblos andaluces',
    M4: '3 semanas documentando recetas de montaña en los Apeninos italianos',
    M5: '10 días de formación intensiva para 15 jóvenes embajadores',
    M6_7: '3 semanas documentando recetas atlánticas en pueblos gallegos',
    M8: 'Evento masivo final con banquete comunitario para 200+ personas'
  };

  // ===========================================================================
  // 8. RENDER
  // ===========================================================================
  
  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">💰 Calculadora de Presupuesto General KA210</h1>
        <p className="text-gray-600 text-lg">
          Presupuesto detallado para el proyecto "Food Heritage Hubs" - Asociación a Pequeña Escala
        </p>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <div className="flex flex-wrap gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm text-gray-500">Presupuesto total actual:</span>
              <div className="text-2xl font-bold text-blue-700">{calculateGrandTotal().toLocaleString('es-ES')}€</div>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm text-gray-500">Margen disponible (hasta 60.000€):</span>
              <div className="text-2xl font-bold text-green-600">{(60000 - calculateGrandTotal()).toLocaleString('es-ES')}€</div>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm text-gray-500">Categorías de gasto:</span>
              <div className="text-2xl font-bold text-purple-600">5</div>
            </div>
          </div>
        </div>
      </header>

      {/* SECCIÓN 1: COSTES DE VIAJE */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">✈️ Costes de Viaje y Manutención</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Sincronizado con App2
          </span>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actividad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Coste Viaje</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Coste Manutención</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(travelCosts).map(([key, activity]) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{activityNames[key]}</div>
                      <div className="text-sm text-gray-500">{activityDescriptions[key]}</div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={activity.travel}
                        onChange={(e) => updateTravelCost(key, 'travel', e.target.value)}
                        className="w-32 p-2 border border-gray-300 rounded text-right"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={activity.daily}
                        onChange={(e) => updateTravelCost(key, 'daily', e.target.value)}
                        className="w-32 p-2 border border-gray-300 rounded text-right"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-blue-700 text-lg">
                        {activity.total.toLocaleString('es-ES')}€
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-blue-50">
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-right font-bold text-gray-700">
                    TOTAL VIAJES Y MANUTENCIÓN:
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-2xl font-bold text-blue-800">
                      {calculateTotalTravel().toLocaleString('es-ES')}€
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: OTRAS PARTIDAS */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Otras Partidas del Presupuesto</h2>
        
        {/* Navegación por categorías */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'management', label: 'Gestión', color: 'bg-green-100 text-green-800' },
            { id: 'development', label: 'Desarrollo', color: 'bg-blue-100 text-blue-800' },
            { id: 'dissemination', label: 'Difusión', color: 'bg-purple-100 text-purple-800' },
            { id: 'equipment', label: 'Equipamiento', color: 'bg-orange-100 text-orange-800' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === cat.id 
                  ? `${cat.color} border-2 border-current` 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tabla de la categoría activa */}
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Concepto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Importe (€)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(() => {
                  const costsMap = {
                    management: managementCosts,
                    development: developmentCosts,
                    dissemination: disseminationCosts,
                    equipment: equipmentCosts
                  };
                  
                  return costsMap[activeCategory]?.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateCostItem(activeCategory, item.id, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateCostItem(activeCategory, item.id, 'description', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={item.amount}
                          onChange={(e) => updateCostItem(activeCategory, item.id, 'amount', e.target.value)}
                          className="w-32 p-2 border border-gray-300 rounded text-right"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeCostItem(activeCategory, item.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ));
                })()}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-right font-bold text-gray-700">
                    Subtotal {activeCategory}:
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xl font-bold text-gray-900">
                      {(() => {
                        const costsMap = {
                          management: managementCosts,
                          development: developmentCosts,
                          dissemination: disseminationCosts,
                          equipment: equipmentCosts
                        };
                        return calculateSubtotal(costsMap[activeCategory]).toLocaleString('es-ES');
                      })()}€
                    </div>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: AÑADIR NUEVO CONCEPTO */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">➕ Añadir Nuevo Concepto de Gasto</h2>
        
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Categoría</label>
              <select
                value={newCostItem.category}
                onChange={(e) => setNewCostItem({...newCostItem, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded"
              >
                <option value="">Selecciona categoría</option>
                <option value="management">Gestión y coordinación</option>
                <option value="development">Desarrollo de productos</option>
                <option value="dissemination">Difusión y explotación</option>
                <option value="equipment">Equipamiento y material</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Importe (€)</label>
              <input
                type="number"
                value={newCostItem.amount}
                onChange={(e) => setNewCostItem({...newCostItem, amount: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Ej: 1500"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Nombre del concepto</label>
            <input
              type="text"
              value={newCostItem.name}
              onChange={(e) => setNewCostItem({...newCostItem, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ej: Contratación de traductor profesional"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Descripción detallada</label>
            <textarea
              value={newCostItem.description}
              onChange={(e) => setNewCostItem({...newCostItem, description: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded"
              rows="3"
              placeholder="Describe brevemente en qué se gastará este dinero..."
            />
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={addNewCostItem}
              disabled={!newCostItem.category || !newCostItem.name}
              className={`px-6 py-3 rounded-lg font-bold ${
                !newCostItem.category || !newCostItem.name
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Añadir Concepto
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: RESUMEN FINAL */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Resumen del Presupuesto General</h2>
        
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl shadow border border-gray-200">
          <div className="space-y-4">
            {[
              { label: 'Viajes y manutención', amount: calculateTotalTravel(), color: 'text-blue-700' },
              { label: 'Gestión y coordinación', amount: calculateSubtotal(managementCosts), color: 'text-green-700' },
              { label: 'Desarrollo de productos', amount: calculateSubtotal(developmentCosts), color: 'text-blue-700' },
              { label: 'Difusión y explotación', amount: calculateSubtotal(disseminationCosts), color: 'text-purple-700' },
              { label: 'Equipamiento y material', amount: calculateSubtotal(equipmentCosts), color: 'text-orange-700' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">{item.label}</span>
                <span className={'text-lg font-bold ' + item.color}>
                  {item.amount.toLocaleString('es-ES')}€
                </span>
              </div>
            ))}
            
            <div className="flex justify-between items-center py-4 border-t-2 border-gray-300 mt-4">
              <span className="text-2xl font-bold text-gray-900">TOTAL GENERAL DEL PROYECTO</span>
              <span className="text-3xl font-bold text-blue-800">
                {calculateGrandTotal().toLocaleString('es-ES')}€
              </span>
            </div>
            
            <div className={'p-4 rounded-lg ' + (calculateGrandTotal() <= 60000 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200')}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-700">Límite KA210 (lump sum): </span>
                  <span className="text-gray-600">60.000€</span>
                </div>
                <div className={'text-xl font-bold ' + (calculateGrandTotal() <= 60000 ? 'text-green-700' : 'text-red-700')}>
                  {calculateGrandTotal() <= 60000 ? '✅ DENTRO DEL LÍMITE' : '❌ SUPERADO'}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {calculateGrandTotal() <= 60000 
                  ? `Margen disponible: ${(60000 - calculateGrandTotal()).toLocaleString('es-ES')}€`
                  : `Exceso: ${(calculateGrandTotal() - 60000).toLocaleString('es-ES')}€`
                }
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECCIÓN 5: BOTONES DE ACCIÓN */}
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={resetToDefaults}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg shadow"
          >
            Reiniciar a Valores Predeterminados
          </button>
          <button
            onClick={() => alert('Función de exportar a Excel en desarrollo')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow"
          >
            Exportar a Excel
          </button>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500 mb-2">Última actualización:</div>
          <div className="text-lg font-bold text-gray-800">
            {calculateGrandTotal().toLocaleString('es-ES')}€ / 60.000€
          </div>
        </div>
      </div>

      <footer className="mt-12 pt-6 border-t border-gray-300 text-center text-gray-500 text-sm">
        <p>💡 <strong>Consejo:</strong> El lump sum de KA210 (60.000€) debe cubrir TODOS los gastos del proyecto.</p>
        <p className="mt-1">Asegúrate de que cada partida esté justificada en la solicitud.</p>
      </footer>
    </div>
  );
};

export default App3;