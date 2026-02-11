import React, { useState } from 'react';

const App2 = ({ travelCosts, setTravelCosts }) => {
  // Datos iniciales de las actividades
  const initialActivities = {
    M3: {
      name: 'Ruta Andalucía (Italia)',
      days: 17, // 2-3 semanas (promedio)
      participants: {
        travelersToItaly: 3, // Equipo español + 1 italiano/galego
        localParticipants: 0,
      },
      rates: {
        travel: 275, // Viaje España-Italia
        daily: 74,   // Manutención diaria
      }
    },
    M4: {
      name: 'Ruta Abruzzo (Italia)',
      days: 17,
      participants: {
        travelersToItaly: 0,
        localParticipants: 3, // Equipo italiano + 1 español/galego
      },
      rates: {
        travel: 275,
        daily: 74,
      }
    },
    M5: {
      name: 'Training Course Central',
      days: 7,
      participants: {
        travelersToItaly: 4, // Jóvenes españoles/gallegos a Italia
        localParticipants: 8, // Italianos + otros
      },
      rates: {
        travel: 275,
        daily: 74,
      }
    },
    M6_7: {
      name: 'Ruta Galicia',
      days: 21, // 3 semanas
      participants: {
        travelersToItaly: 1, // Italiano que va a Galicia
        localParticipants: 2, // Equipo gallego + 1 español
      },
      rates: {
        travel: 0, // Viaje interno (ajustar si es internacional)
        daily: 74,
      }
    },
    M8: {
      name: 'Evento Final Gallego',
      days: 4,
      participants: {
        travelersToItaly: 15, // Todos los socios internacionales
        localParticipants: 200, // Invitados locales
      },
      rates: {
        travel: 275, // Viaje internacional para socios
        daily: 74,
      }
    }
  };

  const [activities, setActivities] = useState(initialActivities);
  const [budget, setBudget] = useState(travelCosts || {});

  // Calcular presupuesto para una actividad
  const calculateActivityBudget = (activityKey) => {
    const activity = activities[activityKey];
    const travelCost = activity.participants.travelersToItaly * activity.rates.travel;
    const dailyCost = (activity.participants.travelersToItaly + activity.participants.localParticipants) * activity.rates.daily * activity.days;
    return {
      travel: travelCost,
      daily: dailyCost,
      total: travelCost + dailyCost
    };
  };

  // Calcular todos los presupuestos
  const calculateAllBudgets = () => {
    const newBudget = {};
    Object.keys(activities).forEach(key => {
      newBudget[key] = calculateActivityBudget(key);
    });
    setBudget(newBudget);
    // Actualizar el estado compartido
    if (setTravelCosts) {
      setTravelCosts(newBudget);
    }
  };

  // Calcular total general
  const calculateTotal = () => {
    if (Object.keys(budget).length === 0) return 0;
    return Object.values(budget).reduce((sum, activity) => sum + activity.total, 0);
  };

  // Manejar cambios en días
  const handleDaysChange = (activityKey, value) => {
    const updatedActivities = {
      ...activities,
      [activityKey]: {
        ...activities[activityKey],
        days: Math.max(1, parseInt(value) || 1)
      }
    };
    setActivities(updatedActivities);
  };

  // Manejar cambios en participantes
  const handleParticipantsChange = (activityKey, type, value) => {
    const updatedActivities = {
      ...activities,
      [activityKey]: {
        ...activities[activityKey],
        participants: {
          ...activities[activityKey].participants,
          [type]: Math.max(0, parseInt(value) || 0)
        }
      }
    };
    setActivities(updatedActivities);
  };

  // Reiniciar valores
  const resetValues = () => {
    setActivities(initialActivities);
    setBudget({});
    if (setTravelCosts) {
      setTravelCosts({});
    }
  };

  // Actualizar budget cuando cambian los costes de viaje desde fuera
  React.useEffect(() => {
    if (travelCosts && Object.keys(travelCosts).length > 0) {
      setBudget(travelCosts);
    }
  }, [travelCosts]);

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Calculadora de Presupuesto Erasmus+ KA210</h1>
      <p className="text-gray-600 mb-6">Calcula el presupuesto para viajes y manutenciones de las actividades del proyecto</p>
      
      {/* Resumen general */}
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">💰 Resumen de Tasas (por persona)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded shadow">
            <h3 className="font-medium text-gray-700">Viaje España-Italia</h3>
            <p className="text-2xl font-bold text-blue-600">275€</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <h3 className="font-medium text-gray-700">Manutención diaria</h3>
            <p className="text-2xl font-bold text-blue-600">74€/día</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <h3 className="font-medium text-gray-700">Participantes totales</h3>
            <p className="text-2xl font-bold text-blue-600">
              {Object.values(activities).reduce((sum, activity) => 
                sum + activity.participants.travelersToItaly + activity.participants.localParticipants, 0
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Controles de actividades */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Configuración de Actividades</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(activities).map(([key, activity]) => (
            <div key={key} className="bg-white p-5 rounded-xl shadow border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3">{activity.name}</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Días de actividad:</label>
                <input
                  type="number"
                  min="1"
                  value={activity.days}
                  onChange={(e) => handleDaysChange(key, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-1">Viajeros internacionales:</label>
                  <input
                    type="number"
                    min="0"
                    value={activity.participants.travelersToItaly}
                    onChange={(e) => handleParticipantsChange(key, 'travelersToItaly', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Participantes locales:</label>
                  <input
                    type="number"
                    min="0"
                    value={activity.participants.localParticipants}
                    onChange={(e) => handleParticipantsChange(key, 'localParticipants', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              
              {budget[key] && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">Estimación actual:</p>
                  <p className="font-bold text-lg">
                    {budget[key].total.toLocaleString('es-ES')}€
                  </p>
                  <p className="text-xs text-gray-500">
                    Viaje: {budget[key].travel.toLocaleString('es-ES')}€ + 
                    Manutención: {budget[key].daily.toLocaleString('es-ES')}€
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-4 mb-10">
        <button
          onClick={calculateAllBudgets}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow"
        >
          Calcular Presupuesto Total
        </button>
        <button
          onClick={resetValues}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg shadow"
        >
          Reiniciar Valores
        </button>
      </div>

      {/* Resultados del presupuesto */}
      {Object.keys(budget).length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Resultados del Presupuesto</h2>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actividad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Participantes</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Días</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Coste Viaje</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Coste Manutención</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(budget).map(([key, activityBudget]) => {
                  const activity = activities[key];
                  return (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{activity.name}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {activity.participants.travelersToItaly + activity.participants.localParticipants}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{activity.days}</td>
                      <td className="px-4 py-3 text-gray-700">{activityBudget.travel.toLocaleString('es-ES')}€</td>
                      <td className="px-4 py-3 text-gray-700">{activityBudget.daily.toLocaleString('es-ES')}€</td>
                      <td className="px-4 py-3 font-bold text-blue-700">{activityBudget.total.toLocaleString('es-ES')}€</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-800 text-white">
                <tr>
                  <td colSpan="5" className="px-4 py-3 text-right font-bold">TOTAL GENERAL:</td>
                  <td className="px-4 py-3 font-bold text-xl">{calculateTotal().toLocaleString('es-ES')}€</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-800 mb-2">📝 Notas importantes</h3>
            <ul className="list-disc pl-5 text-yellow-700 text-sm">
              <li>Los costes de viaje (275€) aplican solo para viajes internacionales entre España e Italia</li>
              <li>La manutención diaria (74€/día) aplica a todos los participantes de cada actividad</li>
              <li>Los "Participantes locales" también reciben manutención pero no coste de viaje internacional</li>
              <li>Estos cálculos son estimaciones basadas en las tasas estándar de Erasmus+ KA210</li>
              <li>⚠️ Los cambios se sincronizan automáticamente con la App3 de Presupuesto General</li>
            </ul>
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t border-gray-300 text-center text-gray-500 text-sm">
        <p>Calculadora diseñada específicamente para proyectos Erasmus+ KA210 - Tasas basadas en los estándares europeos</p>
      </div>
    </div>
  );
};

export default App2;