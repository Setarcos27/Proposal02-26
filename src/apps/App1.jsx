import React, { useState } from 'react';
import {
  Target, AlertCircle, Users, Globe,
  ChevronDown, Calendar, Package, Brain,
  ChefHat, Map, Car, BookOpen, Heart,
  Utensils, Leaf, Smartphone, Network, Sparkles
} from 'lucide-react';

// ============================================
// 1. DATOS DEL PROYECTO (versión actualizada)
// ============================================
// ============================================
// 1. DATOS DEL PROYECTO (versión con turismo)
// ============================================

const projectData = {
  identifiedNeeds: [
    {
      id: 1,
      title: "Pérdida del patrimonio culinario",
      briefDescription: "Desconexión generacional y pérdida de recetas tradicionales basadas en productos locales",
      evidence: "70% de jóvenes europeos no prepara recetas tradicionales familiares (Eurobarómetro Food, 2023)",
      affectedGroups: ["Jóvenes 18-30 años", "Comunidades rurales", "Personas mayores"],
      keyData: "Solo el 20% de jóvenes sabe el origen de sus alimentos"
    },
    {
      id: 2,
      title: "Insostenibilidad del sistema alimentario juvenil",
      briefDescription: "Alto consumo de ultraprocesados con desconocimiento de sus impactos",
      evidence: "1 de cada 3 jóvenes consume comida ultraprocesada diariamente (OCDE, 2024)",
      affectedGroups: ["Estudiantes", "Jóvenes que viven solos", "Población urbana"],
      keyData: "65% de jóvenes 18-25 años no sabe cocinar 5 platos básicos desde cero"
    },
    {
      id: 3,
      title: "Despoblamiento rural y pérdida de comunidad",
      briefDescription: "Abandono de rituales sociales alrededor de la comida en entornos rurales",
      evidence: "48% de municipios rurales españoles en riesgo de desaparición (MITMA, 2024)",
      affectedGroups: ["Comunidades rurales", "Agricultores locales", "Comercios de proximidad"],
      keyData: "Pérdida del 40% de variedades locales en los últimos 50 años"
    },
    {
      id: 4,
      title: "Turismo desequilibrado y pérdida de identidad rural",
      briefDescription: "El turismo masivo se concentra en pocos destinos, mientras los pueblos con valioso patrimonio gastronómico quedan invisibilizados",
      evidence: "El 80% del turismo rural en España se concentra en menos del 20% de los municipios (INE, 2024)",
      affectedGroups: ["Comunidades rurales", "Pequeños productores", "Jóvenes que emigran"],
      keyData: "Solo el 15% de los viajeros elige destino por su gastronomía tradicional (Encuesta Turismo Rural, 2023)"
    }
  ],

  impactData: {
    individual: [
      "80% de participantes aumentan conocimientos sobre sistemas alimentarios sostenibles",
      "70% mejoran habilidades culinarias básicas (5+ platos tradicionales)",
      "90% valoran positivamente el intercambio intergeneracional"
    ],
    organizacional: [
      "8-10 jóvenes certificados como 'Embajadores Food Heritage'",
      "6+ eventos de réplica autogestionados post-proyecto",
      "Web del proyecto con 300+ visitas durante el proyecto"
    ],
    comunitario: [
      "20 recetas tradicionales documentadas y preservadas",
      "80+ conexiones intergeneracionales creadas",
      "2-3 espacios comunitarios dinamizados alrededor de la cocina",
      "Modelo de turismo gastronómico comunitario validado y transferible, con 2-3 pueblos piloto que incorporan las rutas como oferta cultural",
      "5+ iniciativas locales inspiradas en el proyecto (eventos, menús tradicionales, visitas guiadas)"
    ]
  },

  objectives: [
    {
      id: 1,
      conciseStatement: "Documentar 20 recetas tradicionales de 2 ecosistemas europeos (Andalucía e Italia)",
      tags: ["Patrimonio", "Investigación", "Digital"],
      detailedDescription: "Recopilación etnográfica de recetas con su contexto socio-ecológico, análisis de sostenibilidad y creación de archivo digital bilingüe (español-italiano) accesible.",
      indicators: [
        "10 recetas por ruta documentadas profesionalmente",
        "100% de fichas con análisis nutricional y de estacionalidad",
        "Archivo digital publicado bajo licencia Creative Commons",
        "1 vídeo resumen del proceso de documentación"
      ],
      timeline: "Meses 1-12 (trabajo de campo en rutas)",
      responsible: ["Violeta (Agroalimentación)", "Arci Chieti", "Universidad de Córdoba (apoyo)"],
      evaluationMethod: "Revisión por pares + métricas de acceso digital"
    },
    {
      id: 2,
      conciseStatement: "Formar 8-10 jóvenes como 'Embajadores Food Heritage' en competencias culinarias y comunitarias",
      tags: ["Formación", "Juventud", "Liderazgo"],
      detailedDescription: "Programa formativo residencial con módulos en cocina tradicional, facilitación comunitaria y comunicación digital. Los embajadores diseñarán y ejecutarán un mini-evento en su localidad.",
      indicators: [
        "8-10 jóvenes certificados (4-5 por país)",
        "Portfolio individual de proyectos implementados",
        "6+ eventos de réplica organizados post-formación",
        "85% de satisfacción en evaluación del curso"
      ],
      timeline: "Training Course: Mes 10 (7 días) + Mentoría: Meses 11-18",
      responsible: ["Belen (Formación)", "Chefs locales", "Facilitadores comunitarios"],
      evaluationMethod: "Evaluación 360° + seguimiento de proyectos"
    },
    {
      id: 3,
      conciseStatement: "Implementar 8-10 Food Labs comunitarios con participación intergeneracional",
      tags: ["Comunidad", "Eventos", "Intergeneracional"],
      detailedDescription: "Eventos participativos en plazas públicas que combinan cocina en vivo, intercambio de saberes y actividades culturales, con enfoque en producto local y tradición.",
      indicators: [
        "4-5 Food Labs por ruta (8-10 total)",
        "200+ participantes directos (50% jóvenes, 50% mayores)",
        "80+ conexiones intergeneracionales documentadas",
        "90% de satisfacción de participantes"
      ],
      timeline: "Meses 5-9 (durante las rutas etnográficas)",
      responsible: ["Equipo móvil proyecto", "Ayuntamientos locales", "Voluntariado comunitario"],
      evaluationMethod: "Encuestas post-evento + registro audiovisual + diarios de campo"
    },
    {
      id: 4,
      conciseStatement: "Crear y difundir recursos educativos abiertos: recetario, metodología, kit digital y vídeo",
      tags: ["Digital", "Difusión", "Sostenibilidad"],
      detailedDescription: "Desarrollo de una caja de herramientas que incluya recetario ilustrado, guía de replicabilidad, kit de herramientas digitales para turismo gastronómico y un vídeo documental del proceso.",
      indicators: [
        "Recetario digital + 100 copias físicas",
        "Metodología 'Food Heritage Hubs' descargable",
        "Kit de herramientas digitales para turismo gastronómico comunitario (guías, plantillas, tutoriales)",
        "1 vídeo documental (10-15 min)",
        "Web básica del proyecto"
      ],
      timeline: "Meses 2-17 (diseño continuo, publicación mes 17)",
      responsible: ["Germán (Tecnología)", "Diseñadores", "Traductores", "Equipo comunicación"],
      evaluationMethod: "Analítica web + feedback de usuarios + citaciones"
    },
    {
      id: 5,
      conciseStatement: "Diseñar y testear un modelo de turismo gastronómico comunitario replicable en entornos rurales europeos",
      tags: ["Turismo sostenible", "Desarrollo rural", "Replicabilidad"],
      detailedDescription: "A partir de la experiencia de las rutas, se elaborará una guía metodológica para que cualquier pueblo organice su propia 'ruta de sabores', incluyendo criterios de sostenibilidad, participación comunitaria y promoción digital. Se testeará en 2-3 municipios piloto.",
      indicators: [
        "Guía de turismo gastronómico comunitario (30+ páginas) descargable",
        "2-3 pilotos de réplica durante el proyecto en pueblos no participantes inicialmente",
        "10+ manifestaciones de interés de otros municipios",
        "Inclusión del modelo en al menos 1 red de desarrollo rural"
      ],
      timeline: "Meses 12-18 (diseño y pilotaje)",
      responsible: ["As Vacas Fracas", "Arci Chieti", "Equipo coordinador"],
      evaluationMethod: "Entrevistas con agentes locales, análisis de viabilidad, encuestas a visitantes de los pilotos"
    }
  ],

  activities: [
    {
      id: 1,
      title: "Fase 1 · Kick-off presencial (Galicia)",
      description: "Encuentro de las tres asociaciones en el Pazo (As Vacas Fracas). Alineación de objetivos, reparto de roles, planificación detallada.",
      date: "Mes 1",
      participants: "3 asociaciones (6-8 personas)",
      linkedObjective: "O1, O2, O3, O4, O5",
      location: "Pazo de Galicia",
      icon: <Users />,
      color: "purple"
    },
    {
      id: 2,
      title: "Fase 2 · Diseño de toolkit e identidad",
      description: "Creación de guías de campo, imagen de marca, web básica, estrategia de redes y primeros contenidos del kit digital para turismo gastronómico.",
      date: "Meses 2-3",
      participants: "Equipo técnico + diseñadores",
      linkedObjective: "O4, O5",
      location: "Online + encuentros puntuales",
      icon: <Sparkles />,
      color: "indigo"
    },
    {
      id: 3,
      title: "Fase 3 · Test piloto + Workshop (Galicia)",
      description: "Simulación de una jornada de ruta en el Pazo con abuelas locales. Cocina comunitaria, evaluación de metodología, ajustes antes de las rutas.",
      date: "Mes 4",
      participants: "Equipo consorcio + comunidad local",
      linkedObjective: "O1, O3",
      location: "Pazo de Galicia",
      icon: <ChefHat />,
      color: "green"
    },
    {
      id: 4,
      title: "Fase 4 · Ruta Andalucía",
      description: "7-10 días recorriendo 4-5 pueblos andaluces. Caravana, documentación de recetas, Food Labs en plazas, convivencia intergeneracional. Se identifican recursos turísticos gastronómicos locales.",
      date: "Meses 5-6",
      participants: "Equipo andaluz + italiano + colaboradores locales",
      linkedObjective: "O1, O3, O5",
      location: "Pueblos de Andalucía",
      icon: <Car />,
      color: "green"
    },
    {
      id: 5,
      title: "Fase 5 · Ruta Italia (Abruzzo)",
      description: "7-10 días por pueblos de los Apeninos. Intercambio de recetas, Food Labs, grabación de testimonios y cocina colectiva. Mapeo de recursos turísticos y productores locales.",
      date: "Meses 7-8",
      participants: "Equipo italiano + andaluz + comunidades apenínicas",
      linkedObjective: "O1, O3, O5",
      location: "Pueblos de Abruzzo",
      icon: <Map />,
      color: "blue"
    },
    {
      id: 6,
      title: "Fase 6 · Workshop post-rutas",
      description: "Encuentro presencial (Andalucía o Italia) para evaluar las rutas, extraer lecciones aprendidas, co-diseñar el Training Course y desarrollar el modelo de turismo gastronómico.",
      date: "Mes 9",
      participants: "Equipo consorcio + embajadores candidatos",
      linkedObjective: "O2, O4, O5",
      location: "Por definir",
      icon: <BookOpen />,
      color: "orange"
    },
    {
      id: 7,
      title: "Fase 7 · Training Course 'Embajadores Food Heritage'",
      description: "Formación intensiva de 7 días para 8-10 jóvenes. Cocina, facilitación, comunicación y diseño de experiencias turísticas gastronómicas. Cada participante sale con un plan de réplica local.",
      date: "Mes 10",
      participants: "8-10 jóvenes + formadores",
      linkedObjective: "O2, O5",
      location: "Cortijo ecológico (Andalucía)",
      icon: <ChefHat />,
      color: "orange"
    },
    {
      id: 8,
      title: "Fase 8 · Evento final y cierre (Galicia)",
      description: "Celebración anual del proyecto en el Pazo. Presentación del recetario, kit digital, guía de turismo gastronómico, proyección del vídeo documental, comida comunitaria abierta al público y networking con agentes de turismo rural.",
      date: "Mes 12",
      participants: "150+ personas (público general, agentes turísticos, redes desarrollo rural)",
      linkedObjective: "O4, O5",
      location: "Pazo de Galicia",
      icon: <Network />,
      color: "purple"
    }
  ],

  tangibleResults: [
    {
      title: "Recetario 'El Arca de los Sabores'",
      description: "Edición digital bilingüe (español-italiano) con 20 recetas documentadas, ilustraciones y contexto cultural. Tirada reducida de 100 copias físicas.",
      quantity: "100 copias físicas + PDF descargable",
      format: "ISBN / Creative Commons"
    },
    {
      title: "Metodología 'Food Heritage Hubs'",
      description: "Kit de replicabilidad: guías paso a paso, plantillas, consejos y lecciones aprendidas para organizar rutas gastronómicas comunitarias.",
      quantity: "PDF interactivo + infografías",
      format: "Descarga gratuita"
    },
    {
      title: "Kit de herramientas digitales para el turismo gastronómico comunitario",
      description: "Recursos prácticos (guías, plantillas, tutoriales) para que las comunidades rurales digitalicen y promocionen su patrimonio culinario como oferta turística sostenible. Incluye ejemplos de mapeo colaborativo, storytelling audiovisual y uso básico de redes sociales.",
      quantity: "PDF interactivo + minisitio web con recursos descargables",
      format: "Creative Commons, multidioma (ES, IT, GL)"
    },
    {
      title: "Guía de turismo gastronómico comunitario",
      description: "Modelo validado para que cualquier pueblo organice su propia 'ruta de sabores', con criterios de sostenibilidad, participación comunitaria y promoción digital. Incluye casos piloto.",
      quantity: "Documento de 30+ páginas",
      format: "PDF descargable"
    },
    {
      title: "Vídeo documental",
      description: "Pieza audiovisual de 10-15 minutos que resume el proceso, las rutas, los testimonios y el impacto del proyecto.",
      quantity: "1 vídeo",
      format: "YouTube / Vimeo"
    },
    {
      title: "Web del proyecto",
      description: "Página web sencilla con información del proyecto, recetario digital, blog, kit de herramientas y acceso a los recursos generados.",
      quantity: "1 sitio web",
      format: "Responsive, accesible"
    }
  ],

  intangibleResults: [
    {
      title: "Red de Embajadores Food Heritage",
      description: "8-10 jóvenes formados que continúan organizando eventos gastronómicos en sus comunidades, integrando el enfoque turístico.",
      impact: "6+ eventos autogestionados post-proyecto",
      measurement: "Portfolio de proyectos + entrevistas"
    },
    {
      title: "Conexiones intergeneracionales",
      description: "Vínculos reconstruidos entre jóvenes y mayores a través de la cocina y la transmisión oral.",
      impact: "80+ conexiones documentadas",
      measurement: "Testimonios, fotografías, diarios de campo"
    },
    {
      title: "Concienciación alimentaria crítica",
      description: "Cambio de percepción sobre la alimentación sostenible, el producto local y la cocina tradicional.",
      impact: "80% de participantes aumentan su conocimiento",
      measurement: "Encuestas pre/post, grupos focales"
    },
    {
      title: "Revitalización comunitaria y turismo sostenible",
      description: "Espacios públicos reactivados como puntos de encuentro alrededor de la comida; pueblos piloto que incorporan las rutas como oferta cultural estable.",
      impact: "2-3 'nodos' comunitarios activos post-proyecto, 5+ iniciativas turísticas inspiradas",
      measurement: "Participación en eventos, compromiso municipal, manifestaciones de interés"
    }
  ]
};

// El resto del archivo (componentes, secciones, componente principal) se mantiene igual,
// solo actualizando las referencias a los nuevos objetivos y actividades cuando sea necesario.
// ============================================
// 2. COMPONENTES REUTILIZABLES
// ============================================

const CollapsibleCard = ({ title, brief, children, color = "gray", icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses = {
    blue: 'border-blue-200 hover:bg-blue-50',
    green: 'border-green-200 hover:bg-green-50',
    orange: 'border-orange-200 hover:bg-orange-50',
    purple: 'border-purple-200 hover:bg-purple-50',
    indigo: 'border-indigo-200 hover:bg-indigo-50',
    red: 'border-red-200 hover:bg-red-50',
  };

  return (
    <div className={`border rounded-2xl transition-all duration-300 ${colorClasses[color]}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-opacity-50 transition-colors"
      >
        <div className="flex items-start gap-4">
          {icon && <div className="mt-1 text-gray-700">{icon}</div>}
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600">{brief}</p>
          </div>
        </div>
        <ChevronDown className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''} text-gray-400`} />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t pt-6 animate-in fade-in duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

const ActivityTimelineItem = ({ activity, index, isLast }) => {
  const colorMap = {
    green: 'bg-green-500 border-green-500',
    blue: 'bg-blue-500 border-blue-500',
    orange: 'bg-orange-500 border-orange-500',
    purple: 'bg-purple-500 border-purple-500',
    indigo: 'bg-indigo-500 border-indigo-500',
    red: 'bg-red-500 border-red-500',
  };

  return (
    <div className="flex relative">
      {/* Línea vertical */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-300"></div>
      )}

      {/* Punto de timeline */}
      <div className="relative z-10">
        <div className={`w-12 h-12 bg-white border-4 rounded-full flex items-center justify-center ${colorMap[activity.color]}`}>
          <span className="font-bold text-white">{index + 1}</span>
        </div>
      </div>

      {/* Contenido de la actividad */}
      <div className="ml-6 flex-1 pb-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-gray-700">{activity.icon}</div>
            <h3 className="font-bold text-xl text-gray-900">{activity.title}</h3>
          </div>
          <p className="text-gray-600 mb-4">{activity.description}</p>

          {/* Metadatos */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {activity.date}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} /> {activity.participants}
            </span>
            <span className="flex items-center gap-1">
              <Target size={14} /> {activity.linkedObjective}
            </span>
            <span className="flex items-center gap-1">
              <Map size={14} /> {activity.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ result, type }) => {
  const isTangible = type === 'tangible';

  return (
    <div className={`p-4 rounded-xl border ${isTangible ? 'bg-white border-green-200' : 'bg-white border-blue-200'}`}>
      <h4 className="font-bold mb-2 flex items-center gap-2">
        {isTangible ? <Package size={18} className="text-green-600" /> : <Brain size={18} className="text-blue-600" />}
        {result.title}
      </h4>
      <p className="text-gray-700 mb-3">{result.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
          {isTangible ? result.quantity : result.impact}
        </span>
        <span className="text-gray-500">{isTangible ? result.format : result.measurement}</span>
      </div>
    </div>
  );
};

// ============================================
// 3. COMPONENTES DE SECCIÓN
// ============================================

const IdentifiedNeedsSection = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <AlertCircle size={24} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Necesidades Identificadas</h1>
            <p className="text-gray-600 text-lg">Por qué este proyecto es necesario y urgente</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {projectData.identifiedNeeds.map((need) => (
          <CollapsibleCard
            key={need.id}
            title={need.title}
            brief={need.briefDescription}
            color="blue"
            icon={<AlertCircle size={20} />}
          >
            <div className="mt-4 space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-bold text-blue-900 mb-2">📌 Evidencia Concreta</h4>
                <p className="text-blue-800">{need.evidence}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">👥 Grupos afectados</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {need.affectedGroups.map((group, i) => (
                      <li key={i}>{group}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">📊 Dato clave</h4>
                  <p className="text-gray-700">{need.keyData}</p>
                </div>
              </div>
            </div>
          </CollapsibleCard>
        ))}
      </div>
    </div>
  );
};

const ImpactSection = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-4">Impacto Esperado</h1>
          <p className="text-gray-600">Cambio transformador en tres niveles</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
          <div className="text-3xl font-bold text-green-700 mb-2">200+</div>
          <p className="text-green-600 text-sm">Participantes directos</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            level: "Individual",
            color: "green",
            icon: <Users size={20} />,
            data: projectData.impactData.individual
          },
          {
            level: "Organizacional",
            color: "blue",
            icon: <Network size={20} />,
            data: projectData.impactData.organizacional
          },
          {
            level: "Comunitario",
            color: "purple",
            icon: <Globe size={20} />,
            data: projectData.impactData.comunitario
          }
        ].map((item) => (
          <CollapsibleCard
            key={item.level}
            title={`Impacto ${item.level}`}
            brief={`Efectos medibles en nivel ${item.level.toLowerCase()}`}
            color={item.color}
            icon={item.icon}
          >
            <div className="mt-4 space-y-3">
              <h4 className="font-bold text-gray-900">Indicadores de éxito:</h4>
              <ul className="space-y-2">
                {item.data.map((indicator, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CollapsibleCard>
        ))}
      </div>
    </div>
  );
};

const ObjectivesSection = () => {
  const [expandedObjectives, setExpandedObjectives] = useState({});

  const toggleObjective = (id) => {
    setExpandedObjectives(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Objetivos del Proyecto</h1>
          <p className="text-gray-600">Metas SMART y estrategias para alcanzarlas</p>
        </div>
        <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-bold">
          {projectData.objectives.length} Objetivos Clave
        </div>
      </div>

      <div className="space-y-6">
        {projectData.objectives.map((obj, index) => (
          <div key={obj.id} className="group">
            {/* VISIBLE SIEMPRE: Frase concisa */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${index === 0 ? 'bg-green-100 text-green-700' :
                      index === 1 ? 'bg-blue-100 text-blue-700' :
                      index === 2 ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'}`}>
                    <span className="font-bold">O{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {obj.conciseStatement}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {obj.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleObjective(obj.id)}
                  className="text-gray-400 hover:text-orange-600 transition-colors"
                >
                  <ChevronDown className={`transform transition-transform ${expandedObjectives[obj.id] ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* CONTENIDO EXPANDIDO */}
            {expandedObjectives[obj.id] && (
              <div className="mt-2 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100 rounded-2xl p-6 animate-in slide-in-from-top">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Columna izquierda: Detalles */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                        <BookOpen size={18} /> Descripción ampliada
                      </h4>
                      <p className="text-gray-700">{obj.detailedDescription}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                        <Target size={18} /> Indicadores SMART
                      </h4>
                      <ul className="space-y-2">
                        {obj.indicators.map((indicator, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                              <span className="text-orange-700 text-sm font-bold">{i + 1}</span>
                            </div>
                            <span className="text-gray-700">{indicator}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Columna derecha: Info adicional */}
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" /> Timeline
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">{obj.timeline}</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Users size={16} className="text-gray-500" /> Responsables
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {obj.responsible.map((person, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-50 border rounded-full text-sm">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Heart size={16} className="text-gray-500" /> Método de evaluación
                      </h4>
                      <p className="text-sm text-gray-700">{obj.evaluationMethod}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ActivitiesSection = () => {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Actividades Planificadas</h1>
        <p className="text-gray-600">El corazón del proyecto: 8 fases que combinan encuentros presenciales, rutas etnográficas y formación</p>
      </div>

      {/* Timeline visual */}
      <div className="relative">
        {projectData.activities.map((activity, index) => (
          <ActivityTimelineItem
            key={activity.id}
            activity={activity}
            index={index}
            isLast={index === projectData.activities.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

const ResultsSection = () => {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Resultados Esperados</h1>
        <p className="text-gray-600">Productos tangibles e impactos intangibles del proyecto</p>
      </div>

      {/* Dashboard de resultados */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Resultados tangibles */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <Package size={24} className="text-green-700" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-900">Resultados Tangibles</h3>
              <p className="text-green-700">Productos concretos que generamos</p>
            </div>
          </div>
          <div className="space-y-4">
            {projectData.tangibleResults.map((result, i) => (
              <ResultCard key={i} result={result} type="tangible" />
            ))}
          </div>
        </div>

        {/* Resultados intangibles */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Brain size={24} className="text-blue-700" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900">Resultados Intangibles</h3>
              <p className="text-blue-700">Impactos y cambios duraderos</p>
            </div>
          </div>
          <div className="space-y-4">
            {projectData.intangibleResults.map((result, i) => (
              <ResultCard key={i} result={result} type="intangible" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NextStepsSection = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
            <Map size={24} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Próximos Pasos</h1>
            <p className="text-gray-600 text-lg">Ruta crítica para presentar la solicitud</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            step: "1. Revisión Interna",
            description: "Validación del consorcio y ajustes finales de la propuesta",
            deadline: "3 semanas",
            responsible: "Belen + Violeta",
            color: "blue"
          },
          {
            step: "2. Redacción Solicitud",
            description: "Completar formulario oficial Erasmus+ KA210",
            deadline: "5 semanas",
            responsible: "Equipo redacción",
            color: "green"
          },
          {
            step: "3. Presentación",
            description: "Envío a Agencia Nacional Española",
            deadline: "Marzo 2026",
            responsible: "Coordinación",
            color: "purple"
          }
        ].map((item, index) => (
          <div key={index} className={`p-6 rounded-2xl border-2 ${item.color === 'blue' ? 'border-blue-200 bg-blue-50' : item.color === 'green' ? 'border-green-200 bg-green-50' : 'border-purple-200 bg-purple-50'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color === 'blue' ? 'bg-blue-100 text-blue-700' : item.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                <span className="font-bold">{index + 1}</span>
              </div>
              <h3 className="font-bold text-xl">{item.step}</h3>
            </div>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Plazo: {item.deadline}</span>
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">
                {item.responsible}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 4. COMPONENTE PRINCIPAL
// ============================================

const ProjectPresentation = () => {
  const [activeSection, setActiveSection] = useState('needs');

  const sections = [
    { id: 'needs', label: 'Necesidades', component: <IdentifiedNeedsSection /> },
    { id: 'impact', label: 'Impacto', component: <ImpactSection /> },
    { id: 'objectives', label: 'Objetivos', component: <ObjectivesSection /> },
    { id: 'activities', label: 'Actividades', component: <ActivitiesSection /> },
    { id: 'results', label: 'Resultados', component: <ResultsSection /> },
    { id: 'next', label: 'Próximos Pasos', component: <NextStepsSection /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-3xl p-8 shadow-lg border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <ChefHat size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Food Heritage Hubs</h1>
                  <p className="text-gray-600 text-lg">Reconectando a la juventud europea con su patrimonio alimentario</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">KA210 - Asociación a Pequeña Escala</span>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">18 meses | 60.000€</span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium">Andalucía · Italia · Galicia</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 mb-2">Consorcio</div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" title="Asociación andaluza (coord.)"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" title="Arci Chieti (Italia)"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" title="As Vacas Fracas (Galicia)"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">3 socios · 2 países</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex overflow-x-auto pb-2 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border">
          {sections.find(s => s.id === activeSection)?.component}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Proyecto KA210 - Food Heritage Hubs | Preparado para convocatoria Erasmus+ 2026</p>
        <p className="mt-2">📅 Inicio previsto: <strong>octubre 2026</strong> · Plazo de solicitud: <strong>1 octubre 2026</strong></p>
      </div>
    </div>
  );
};

export default ProjectPresentation;