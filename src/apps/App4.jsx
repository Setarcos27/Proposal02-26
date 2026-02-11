import React, { useState } from 'react';
import {
  Target, Users, Globe, ChevronDown, Calendar, Map,
  ChefHat, Leaf, BookOpen, Heart, Camera, MessageCircle,
  Coffee, Award, Home, Sparkles, Car, Network, Star,
  ThumbsUp, UtensilsCrossed, Wheat, Salad, Apple,
  Sun, Moon, Clock, Truck, TreePine, Wind
} from 'lucide-react';

// ============================================
// 1. DATOS DEL TRAINING COURSE
// ============================================

const trainingData = {
  title: "Training Course · Embajadores Food Heritage",
  subtitle: "Formación intensiva en liderazgo gastronómico comunitario",
  duration: "7 días | Octubre 2026",
  location: "Cortijo ecológico · La Luisiana, Sevilla",
  participants: "8-10 jóvenes (Andalucía / Abruzzo)",

  objectives: [
    {
      id: 1,
      title: "Comprender el modelo Food Heritage Hubs",
      description: "Conocer la filosofía del proyecto, las rutas etnográficas, los Food Labs y su potencial para la revitalización rural y el turismo gastronómico comunitario.",
      icon: <Target size={20} />
    },
    {
      id: 2,
      title: "Adquirir técnicas culinarias tradicionales y de aprovechamiento",
      description: "Cocinar recetas de Andalucía e Italia con productos locales y de temporada, aplicando criterios de sostenibilidad y cero desperdicios.",
      icon: <ChefHat size={20} />
    },
    {
      id: 3,
      title: "Desarrollar habilidades de facilitación comunitaria",
      description: "Dinamizar grupos, organizar Food Labs, gestionar eventos intergeneracionales y crear espacios de diálogo alrededor de la comida.",
      icon: <Users size={20} />
    },
    {
      id: 4,
      title: "Manejar herramientas digitales para la memoria y la difusión",
      description: "Storytelling audiovisual, fotografía con móvil, redes sociales y mapeo colaborativo del patrimonio gastronómico.",
      icon: <Camera size={20} />
    },
    {
      id: 5,
      title: "Analizar críticamente los sistemas alimentarios locales",
      description: "Visitar una huerta ecológica, conocer a productores, debatir sobre estacionalidad, km0 y soberanía alimentaria.",
      icon: <Leaf size={20} />
    },
    {
      id: 6,
      title: "Diseñar un plan de réplica local",
      description: "Cada participante elabora un proyecto concreto para implementar en su comunidad (mini‑ruta, cena temática, taller de cocina).",
      icon: <Sparkles size={20} />
    },
    {
      id: 7,
      title: "Experimentar el poder de la sobremesa como espacio educativo",
      description: "Reflexionar sobre cómo cambian las dinámicas cuando se aprende comiendo, y cómo replicarlo en otros contextos.",
      icon: <Coffee size={20} />
    }
  ],

  methodology: [
    {
      title: "🍳 Aprendizaje basado en la cocina (Kitchen‑Lab)",
      description: "Cada sesión práctica gira en torno a la preparación colectiva de recetas tradicionales. Mientras se cocina, se debate sobre ingredientes, técnicas, economía local y sostenibilidad."
    },
    {
      title: "🗣️ La sobremesa como aula",
      description: "Las comidas no son un descanso, sino el momento central de reflexión. Tras cocinar, el grupo se sienta a comer junto a invitados (agricultores, cocineras mayores, agentes turísticos). Con preguntas guiadas, se analiza la experiencia y se comparan realidades."
    },
    {
      title: "🚜 Inmersión en la comunidad local",
      description: "El cortijo está rodeado de agricultura ecológica. Visitaremos el huerto comunitario de La Luisiana, compartiremos comidas con vecinos y recibiremos a abuelas cocineras del pueblo. El último día, un 'MasterChef' con jueces locales pondrá a prueba lo aprendido."
    },
    {
      title: "📱 Herramientas digitales para la memoria",
      description: "Talleres prácticos de fotografía, vídeo y redes sociales para documentar recetas y testimonios. Cada participante creará un pequeño diario digital de su experiencia."
    },
    {
      title: "🤝 Co‑diseño de proyectos",
      description: "El último día, cada embajador presenta su plan de réplica local, que será retroalimentado por el grupo y los formadores. Se establecen compromisos de mentoría post‑curso."
    }
  ],

  dailyProgram: [
    {
      day: 1,
      title: "Bienvenida y contexto",
      morning: "Presentaciones, dinámicas de grupo, introducción al proyecto Food Heritage Hubs.",
      afternoon: "Visita al cortijo y sus huertos. Paseo por la campiña sevillana.",
      evening: "Almuerzo de bienvenida cocinado por el equipo. Sobremesa: ¿Qué significa para ti la comida tradicional?",
      icon: <Sun size={18} />
    },
    {
      day: 2,
      title: "Manos en la masa: cocina andaluza",
      morning: "Taller de cocina: gazpacho, salmorejo, berenjenas con miel, espinacas con garbanzos. Técnicas de aprovechamiento.",
      afternoon: "Debate sobre estacionalidad y km0. Preparación colectiva de la cena.",
      evening: "Comida comunitaria con vecinos de La Luisiana invitados. Sobremesa: comparativa con la cocina italiana.",
      icon: <UtensilsCrossed size={18} />
    },
    {
      day: 3,
      title: "Del campo a la mesa",
      morning: "Visita a una huerta ecológica cercana y a la cooperativa de productores 'La Luisiana Ecológica'. Encuentro con agricultores.",
      afternoon: "Taller de identificación de productos de temporada. Cata de aceite de oliva virgen extra.",
      evening: "Picnic en el campo con productos de la huerta. Sobremesa: ¿Cómo apoyar a la producción local desde nuestro consumo?",
      icon: <TreePine size={18} />
    },
    {
      day: 4,
      title: "Cocina italiana y diálogo intercultural",
      morning: "Taller de cocina de Abruzzo: pasta fresca (chitarra, raviolis), ragú, legumbres. Los participantes italianos enseñan a los españoles.",
      afternoon: "Dinámicas de intercambio cultural: similitudes y diferencias entre las cocinas mediterráneas.",
      evening: "Cena italiana cocinada por todos. Sobremesa: migración de recetas, identidad y globalización.",
      icon: <Wheat size={18} />
    },
    {
      day: 5,
      title: "Facilitación comunitaria y Food Labs",
      morning: "Dinámicas de grupo sobre liderazgo, escucha activa, resolución de conflictos. Diseño participativo de un Food Lab.",
      afternoon: "Preparación de una mini‑cena abierta al pueblo. Invitación a vecinos y autoridades locales.",
      evening: "Cena comunitaria en el cortijo con habitantes de La Luisiana. Los participantes facilitan la sobremesa y recogen feedback.",
      icon: <Users size={18} />
    },
    {
      day: 6,
      title: "Comunicación y herramientas digitales",
      morning: "Taller de storytelling audiovisual: cómo grabar una receta con móvil, edición básica, publicación en redes. Ejemplos de buenas prácticas.",
      afternoon: "Creación colectiva de un vídeo resumen del curso. Cada participante elabora su propio diario digital.",
      evening: "Comida temática: plato único con ingredientes de la despensa del cortijo (improvisación creativa). Sobremesa: el papel de la tecnología en la tradición.",
      icon: <Camera size={18} />
    },
    {
      day: 7,
      title: "MasterChef local y cierre",
      morning: "Gran MasterChef comunitario: los participantes cocinan un menú de tres platos con productos locales. Un jurado formado por vecinos de La Luisiana (abuelas, agricultores, hostelero) evalúa las creaciones.",
      afternoon: "Presentación de los planes de réplica local. Feedback grupal. Ceremonia de entrega de certificados Youthpass.",
      evening: "Comida de despedida cocinada entre todos. Sobremesa final: compromisos como red de embajadores.",
      icon: <Award size={18} />
    }
  ],

  localImmersion: [
    {
      title: "Huerto comunitario de La Luisiana",
      description: "Visita guiada al huerto gestionado por el Ayuntamiento y una asociación de vecinos. Los participantes conocerán de primera mano la agricultura ecológica de cercanía y colaborarán en una pequeña tarea de recolección.",
      icon: <Salad size={24} />
    },
    {
      title: "Comidas con el pueblo",
      description: "Dos comidas compartidas con vecinos de La Luisiana: una cena el día 5 (cocina a cargo de los participantes) y un almuerzo el día 2 (vecinos invitados). Espacio de intercambio intergeneracional y validación de las recetas recuperadas.",
      icon: <Heart size={24} />
    },
    {
      title: "MasterChef con jurado local",
      description: "El último día, un concurso de cocina donde los vecinos ejercen de jueces. Se valorará el uso de productos locales, la técnica y la historia detrás del plato. Los ganadores reciben un lote de productos ecológicos de la zona.",
      icon: <Star size={24} />
    },
    {
      title: "Entorno: campiña sevillana ecológica",
      description: "El cortijo está enclavado en un paisaje de olivares y cultivos ecológicos. Los paseos al atardecer y las conversaciones informales bajo los árboles forman parte del aprendizaje experiencial.",
      icon: <Wind size={24} />
    }
  ],

  trainers: [
    {
      name: "Belén",
      role: "Coordinadora pedagógica",
      expertise: "Experta en formación no formal, dinamización de grupos y educación para el desarrollo.",
      icon: <Users />
    },
    {
      name: "Chef María",
      role: "Formadora culinaria",
      expertise: "Cocinera tradicional andaluza, especializada en recetas de aprovechamiento y cocina de temporada.",
      icon: <ChefHat />
    },
    {
      name: "Germán",
      role: "Facilitador digital",
      expertise: "Tecnólogo, diseñador de herramientas digitales para la participación comunitaria.",
      icon: <Camera />
    },
    {
      name: "Antonio (agricultor)",
      role: "Invitado · Huerta ecológica",
      expertise: "Productor ecológico de La Luisiana, miembro de la cooperativa local.",
      icon: <Leaf />
    },
    {
      name: "Abuelas cocineras",
      role: "Invitadas · Sabiduría popular",
      expertise: "Vecinas de La Luisiana que compartirán sus recetas y secretos culinarios.",
      icon: <Heart />
    }
  ],

  tangibleOutcomes: [
    {
      title: "8-10 planes de réplica local",
      description: "Cada embajador elabora un proyecto concreto para implementar en su comunidad durante los 6 meses posteriores al curso.",
      icon: <Sparkles />
    },
    {
      title: "Recetario colaborativo digital",
      description: "Documento con las recetas cocinadas durante el curso, incluyendo variantes locales y consejos de aprovechamiento.",
      icon: <BookOpen />
    },
    {
      title: "Banco de recursos didácticos",
      description: "Dinámicas, guías de facilitación, tutoriales y plantillas generadas colectivamente durante el curso.",
      icon: <Target />
    },
    {
      title: "Vídeo resumen del curso",
      description: "Pieza audiovisual de 3-5 minutos realizada por los propios participantes durante el taller de storytelling.",
      icon: <Camera />
    }
  ],

  intangibleOutcomes: [
    {
      title: "Red de Embajadores Food Heritage",
      description: "Vínculos personales y profesionales entre jóvenes de España e Italia con un propósito común.",
      icon: <Network />
    },
    {
      title: "Confianza y liderazgo",
      description: "Aumento de la autoeficacia para organizar eventos comunitarios y actuar como agentes de cambio local.",
      icon: <ThumbsUp />
    },
    {
      title: "Conciencia crítica alimentaria",
      description: "Capacidad para analizar el sistema alimentario y tomar decisiones informadas como consumidores y cocineros.",
      icon: <Apple />
    }
  ],

  evaluation: {
    methods: [
      "Observación participante por parte del equipo formador (diario de campo)",
      "Diario reflexivo de los participantes (formato libre: texto, audio, vídeo)",
      "Presentación final del plan de réplica (evaluación por pares y formadores)",
      "Encuesta de satisfacción anónima"
    ],
    certification: "Se emitirá un certificado de participación avalado por las tres entidades socias, con reconocimiento oficial de Youthpass (competencias clave: aprendizaje, sociales, cívicas, iniciativa)."
  }
};

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
    yellow: 'border-yellow-200 hover:bg-yellow-50',
    teal: 'border-teal-200 hover:bg-teal-50'
  };

  return (
    <div className={`border rounded-2xl transition-all duration-300 ${colorClasses[color] || 'border-gray-200 hover:bg-gray-50'}`}>
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

const DayCard = ({ day, title, morning, afternoon, evening, icon }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="font-bold text-orange-700">D{day}</span>
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-900">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            {icon}
            <span>Jornada completa</span>
          </div>
        </div>
      </div>
      <div className="space-y-3 mt-4">
        <div className="flex gap-2">
          <span className="w-16 text-sm font-medium text-gray-600">🌅 Mañana</span>
          <span className="text-gray-700">{morning}</span>
        </div>
        <div className="flex gap-2">
          <span className="w-16 text-sm font-medium text-gray-600">☀️ Tarde</span>
          <span className="text-gray-700">{afternoon}</span>
        </div>
        <div className="flex gap-2">
          <span className="w-16 text-sm font-medium text-gray-600">🌙 Noche</span>
          <span className="text-gray-700">{evening}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 3. SECCIONES DEL COMPONENTE
// ============================================

const Header = () => (
  <div className="bg-white rounded-3xl p-8 shadow-lg border mb-8">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
            <ChefHat size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{trainingData.title}</h1>
            <p className="text-gray-600 text-lg">{trainingData.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium flex items-center gap-1">
            <Calendar size={16} /> {trainingData.duration}
          </span>
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium flex items-center gap-1">
            <Map size={16} /> {trainingData.location}
          </span>
          <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium flex items-center gap-1">
            <Users size={16} /> {trainingData.participants}
          </span>
        </div>
      </div>
      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
        <div className="text-3xl font-bold text-orange-700 mb-1">7 días</div>
        <p className="text-orange-600 text-sm">Inmersión total · 70+ horas de formación</p>
      </div>
    </div>
  </div>
);

const ObjectivesSection = () => (
  <div className="space-y-6 mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <Target size={28} className="text-orange-600" />
      Objetivos del curso
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {trainingData.objectives.map((obj) => (
        <div key={obj.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700">
              {obj.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{obj.title}</h3>
              <p className="text-gray-600">{obj.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MethodologySection = () => (
  <div className="space-y-6 mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <BookOpen size={28} className="text-orange-600" />
      Metodología: aprender comiendo
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainingData.methodology.map((item, i) => (
        <div key={i} className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl border border-orange-100">
          <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-700">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const LocalImmersionSection = () => (
  <div className="space-y-6 mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <Home size={28} className="text-green-600" />
      Inmersión en La Luisiana · Comunidad local
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      {trainingData.localImmersion.map((item, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border-2 border-green-100 shadow-sm flex items-start gap-4">
          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 flex-shrink-0">
            {item.icon}
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 p-6 bg-amber-50 rounded-2xl border border-amber-200">
      <p className="text-amber-800 flex items-start gap-3">
        <Heart size={24} className="flex-shrink-0 text-amber-600" />
        <span className="font-medium">El cortijo está rodeado de olivares y cultivos ecológicos. Cada tarde, los participantes podrán pasear por la campiña, conversar con agricultores y conectar con la tierra que alimenta sus recetas.</span>
      </p>
    </div>
  </div>
);

const DailyProgramSection = () => {
  const [expandedDay, setExpandedDay] = useState(null);

  return (
    <div className="space-y-6 mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Calendar size={28} className="text-orange-600" />
        Programa diario (7 días)
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingData.dailyProgram.map((day) => (
          <DayCard key={day.day} {...day} />
        ))}
      </div>
    </div>
  );
};

const TrainersSection = () => (
  <div className="space-y-6 mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <Users size={28} className="text-blue-600" />
      Equipo formador e invitados
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainingData.trainers.map((trainer, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 flex-shrink-0">
            {trainer.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{trainer.name}</h3>
            <p className="text-sm font-medium text-blue-700 mb-2">{trainer.role}</p>
            <p className="text-gray-600 text-sm">{trainer.expertise}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OutcomesSection = () => (
  <div className="space-y-6 mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <Award size={28} className="text-purple-600" />
      Resultados del Training
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
            <Sparkles size={24} className="text-green-700" />
          </div>
          <h3 className="text-2xl font-bold text-green-900">Tangibles</h3>
        </div>
        <div className="space-y-4">
          {trainingData.tangibleOutcomes.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-green-600">{item.icon}</div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
              </div>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Heart size={24} className="text-blue-700" />
          </div>
          <h3 className="text-2xl font-bold text-blue-900">Intangibles</h3>
        </div>
        <div className="space-y-4">
          {trainingData.intangibleOutcomes.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-blue-600">{item.icon}</div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
              </div>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const EvaluationSection = () => (
  <div className="space-y-6 mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <Target size={28} className="text-indigo-600" />
      Evaluación y certificación
    </h2>
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle size={20} className="text-indigo-600" />
            Métodos de evaluación
          </h3>
          <ul className="space-y-3">
            {trainingData.evaluation.methods.map((method, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-indigo-700 text-xs font-bold">{i + 1}</span>
                </div>
                <span className="text-gray-700">{method}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <Award size={20} className="text-indigo-600" />
            Certificación
          </h3>
          <p className="text-gray-700">{trainingData.evaluation.certification}</p>
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-indigo-800 text-sm font-medium">
              🎓 Youthpass: competencias clave reconocidas a nivel europeo.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CallToActionSection = () => (
  <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-xl">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">¿Quieres ser Embajador Food Heritage?</h2>
        <p className="text-orange-100 text-lg">
          El Training Course es gratuito para los participantes seleccionados. 
          Alojamiento, manutención y actividades cubiertos por el proyecto Erasmus+.
        </p>
      </div>
      <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/50">
        <div className="text-2xl font-bold">8-10 plazas</div>
        <div className="text-sm">Convocatoria abierta · Verano 2026</div>
      </div>
    </div>
  </div>
);

// ============================================
// 4. COMPONENTE PRINCIPAL
// ============================================

const App4 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <Header />
        <ObjectivesSection />
        <MethodologySection />
        <LocalImmersionSection />
        <DailyProgramSection />
        <TrainersSection />
        <OutcomesSection />
        <EvaluationSection />
        <CallToActionSection />
        
        <footer className="mt-12 pt-6 border-t border-gray-300 text-center text-gray-500 text-sm">
          <p>Training Course · Food Heritage Hubs · Proyecto KA210 Erasmus+</p>
          <p className="mt-2">Cortijo ecológico · La Luisiana (Sevilla) · Octubre 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default App4;