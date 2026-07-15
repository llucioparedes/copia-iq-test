import { useState, useEffect, useRef } from "react";

const BRAND = "Test de IQ";
const BRAND_COLOR = "#7C3AED";
const BRAND_LIGHT = "#EDE9FE";
const BRAND_DARK = "#5B21B6";
const ACCENT = "#F59E0B";

const preguntas = [
  {
    id: 1,
    categoria: "Lógica",
    icono: "🧩",
    pregunta: "Si todos los gatos son animales y algunos animales son perros, ¿cuál de las siguientes es necesariamente verdadera?",
    opciones: [
      "Algunos gatos son perros",
      "Algunos perros son gatos",
      "Todos los animales son gatos",
      "Ninguna de las anteriores",
    ],
    respuesta: 3,
    explicacion: "No podemos concluir que algunos gatos sean perros ni viceversa a partir de las premisas dadas.",
  },
  {
    id: 2,
    categoria: "Secuencias",
    icono: "🔢",
    pregunta: "¿Cuál es el siguiente número en la serie? 2, 6, 18, 54, ___",
    opciones: ["108", "162", "216", "270"],
    respuesta: 1,
    explicacion: "Cada número se multiplica por 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162.",
  },
  {
    id: 3,
    categoria: "Matrices",
    icono: "🔷",
    pregunta: "Completa la analogía: Libro es a Biblioteca como Pintura es a ___",
    opciones: ["Artista", "Museo", "Color", "Lienzo"],
    respuesta: 1,
    explicacion: "Un libro se guarda en una biblioteca, así como una pintura se exhibe en un museo.",
  },
  {
    id: 4,
    categoria: "Matemática",
    icono: "➗",
    pregunta: "Si un tren viaja a 120 km/h, ¿cuánto tiempo tardará en recorrer 300 km?",
    opciones: ["2 horas", "2.5 horas", "3 horas", "3.5 horas"],
    respuesta: 1,
    explicacion: "Tiempo = Distancia / Velocidad = 300 / 120 = 2.5 horas.",
  },
  {
    id: 5,
    categoria: "Memoria Visual",
    icono: "👁️",
    pregunta: "¿Cuántos triángulos hay en una estrella de 6 puntas (estrella de David)?",
    opciones: ["6", "8", "12", "14"],
    respuesta: 1,
    explicacion: "Una estrella de 6 puntas contiene 8 triángulos en total (6 pequeños en las puntas y 2 grandes superpuestos).",
  },
  {
    id: 6,
    categoria: "Lógica",
    icono: "🧩",
    pregunta: "María es más alta que Juan. Pedro es más bajo que Juan. ¿Quién es el más alto?",
    opciones: ["Juan", "María", "Pedro", "No se puede determinar"],
    respuesta: 1,
    explicacion: "María > Juan > Pedro, por lo tanto María es la más alta.",
  },
  {
    id: 7,
    categoria: "Secuencias",
    icono: "🔢",
    pregunta: "Encuentra el número que falta: 1, 1, 2, 3, 5, 8, ___, 21",
    opciones: ["11", "12", "13", "14"],
    respuesta: 2,
    explicacion: "Es la serie de Fibonacci: cada número es la suma de los dos anteriores. 5+8=13.",
  },
  {
    id: 8,
    categoria: "Vocabulario",
    icono: "📚",
    pregunta: "¿Qué palabra es la antónima de 'efímero'?",
    opciones: ["Fugaz", "Eterno", "Breve", "Instantáneo"],
    respuesta: 1,
    explicacion: "Efímero significa de corta duración, por lo que su antónimo es eterno.",
  },
  {
    id: 9,
    categoria: "Espacial",
    icono: "🎯",
    pregunta: "Si doblas una hoja de papel a la mitad 3 veces, ¿cuántas capas tendrás?",
    opciones: ["6", "8", "9", "12"],
    respuesta: 1,
    explicacion: "Cada doblez duplica las capas: 1→2→4→8. Con 3 dobleces tendrás 2³ = 8 capas.",
  },
  {
    id: 10,
    categoria: "Matemática",
    icono: "➗",
    pregunta: "¿Cuál es el 15% de 240?",
    opciones: ["32", "36", "38", "40"],
    respuesta: 1,
    explicacion: "240 × 0.15 = 36.",
  },
  {
    id: 11,
    categoria: "Lógica",
    icono: "🧩",
    pregunta: "En un grupo de 30 personas, 18 hablan inglés y 15 hablan francés. Si todos hablan al menos uno, ¿cuántos hablan ambos?",
    opciones: ["2", "3", "4", "5"],
    respuesta: 1,
    explicacion: "Ambos = Inglés + Francés - Total = 18 + 15 - 30 = 3.",
  },
  {
    id: 12,
    categoria: "Secuencias",
    icono: "🔢",
    pregunta: "¿Cuál sigue en la secuencia? A, C, F, J, O, ___",
    opciones: ["T", "U", "V", "W"],
    respuesta: 1,
    explicacion: "Los saltos son +2, +3, +4, +5, +6... O está en posición 15, el siguiente es U (posición 21).",
  },
  {
    id: 13,
    categoria: "Matrices",
    icono: "🔷",
    pregunta: "Agua es a Sed como Comida es a ___",
    opciones: ["Cocina", "Hambre", "Nutrición", "Restaurante"],
    respuesta: 1,
    explicacion: "El agua sacia la sed, así como la comida sacia el hambre.",
  },
  {
    id: 14,
    categoria: "Espacial",
    icono: "🎯",
    pregunta: "¿Cuántas caras tiene un cubo?",
    opciones: ["4", "5", "6", "8"],
    respuesta: 2,
    explicacion: "Un cubo tiene 6 caras: arriba, abajo, frente, atrás, izquierda y derecha.",
  },
  {
    id: 15,
    categoria: "Matemática",
    icono: "➗",
    pregunta: "Si 5 máquinas hacen 5 piezas en 5 minutos, ¿cuánto tiempo necesitan 100 máquinas para hacer 100 piezas?",
    opciones: ["1 minuto", "5 minutos", "100 minutos", "500 minutos"],
    respuesta: 1,
    explicacion: "Cada máquina hace 1 pieza en 5 minutos. 100 máquinas hacen 100 piezas en 5 minutos.",
  },
];

const categorias = ["Lógica", "Secuencias", "Matrices", "Matemática", "Memoria Visual", "Vocabulario", "Espacial"];

function calcularIQ(correctas, total) {
  const porcentaje = correctas / total;
  if (porcentaje >= 0.97) return 145;
  if (porcentaje >= 0.93) return 135;
  if (porcentaje >= 0.87) return 128;
  if (porcentaje >= 0.80) return 122;
  if (porcentaje >= 0.73) return 116;
  if (porcentaje >= 0.67) return 112;
  if (porcentaje >= 0.60) return 108;
  if (porcentaje >= 0.53) return 104;
  if (porcentaje >= 0.47) return 100;
  if (porcentaje >= 0.40) return 96;
  if (porcentaje >= 0.33) return 92;
  if (porcentaje >= 0.27) return 88;
  if (porcentaje >= 0.20) return 83;
  if (porcentaje >= 0.13) return 78;
  return 72;
}

function clasificarIQ(iq) {
  if (iq >= 140) return { label: "Genio", color: "#7C3AED", emoji: "🌟", desc: "Capacidad intelectual extraordinaria. Estás en el 0.5% superior de la población." };
  if (iq >= 130) return { label: "Muy Superior", color: "#2563EB", emoji: "🚀", desc: "Inteligencia sobresaliente. Estás entre el 2% más inteligente de la población." };
  if (iq >= 120) return { label: "Superior", color: "#059669", emoji: "✨", desc: "Capacidad intelectual alta. Superas al 91% de la población." };
  if (iq >= 110) return { label: "Por Encima del Promedio", color: "#0891B2", emoji: "💡", desc: "Inteligencia por encima del promedio. Estás entre el 75% superior." };
  if (iq >= 90) return { label: "Promedio", color: "#D97706", emoji: "⚡", desc: "Inteligencia normal. La mayoría de la población se encuentra en este rango." };
  if (iq >= 80) return { label: "Por Debajo del Promedio", color: "#DC2626", emoji: "📈", desc: "Hay oportunidades de mejora. La práctica constante puede elevar tu rendimiento." };
  return { label: "Bajo", color: "#991B1B", emoji: "📚", desc: "Sigue practicando. Con esfuerzo y dedicación puedes mejorar significativamente." };
}

function calcularPercentil(iq) {
  if (iq >= 145) return 99.9;
  if (iq >= 135) return 99;
  if (iq >= 130) return 97.5;
  if (iq >= 125) return 95;
  if (iq >= 120) return 91;
  if (iq >= 115) return 84;
  if (iq >= 110) return 75;
  if (iq >= 105) return 63;
  if (iq >= 100) return 50;
  if (iq >= 95) return 37;
  if (iq >= 90) return 25;
  if (iq >= 85) return 16;
  if (iq >= 80) return 9;
  if (iq >= 75) return 5;
  return 2;
}

// --- Componentes de pantallas ---

function PantallaInicio({ onStart }) {
  const [hover, setHover] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DDD6FE 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{
          fontSize: "3.5rem",
          marginBottom: "0.5rem",
          filter: "drop-shadow(0 4px 8px rgba(124,58,237,0.3))",
        }}>🧠</div>
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: "800",
          color: BRAND_COLOR,
          letterSpacing: "-1px",
          margin: "0 0 0.4rem",
        }}>{BRAND}</h1>
        <p style={{
          color: "#6B7280",
          fontSize: "1.05rem",
          fontWeight: "500",
        }}>Descubre tu coeficiente intelectual real</p>
      </div>

      {/* Card */}
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "2.5rem 2rem",
        maxWidth: "520px",
        width: "100%",
        boxShadow: "0 20px 60px rgba(124,58,237,0.15)",
        marginBottom: "2rem",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "2rem",
        }}>
          {[
            { icon: "📋", label: "15 preguntas", sub: "cuidadosamente seleccionadas" },
            { icon: "⏱️", label: "~12 minutos", sub: "tiempo estimado" },
            { icon: "🎯", label: "7 categorías", sub: "de inteligencia" },
            { icon: "📊", label: "Resultado detallado", sub: "con análisis completo" },
          ].map((item, i) => (
            <div key={i} style={{
              background: BRAND_LIGHT,
              borderRadius: "16px",
              padding: "1rem",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "1.6rem", marginBottom: "0.3rem" }}>{item.icon}</div>
              <div style={{ fontWeight: "700", color: BRAND_DARK, fontSize: "0.9rem" }}>{item.label}</div>
              <div style={{ color: "#6B7280", fontSize: "0.75rem" }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: "#FFFBEB",
          border: "1px solid #FDE68A",
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "2rem",
          display: "flex",
          gap: "0.75rem",
          alignItems: "flex-start",
        }}>
          <span style={{ fontSize: "1.2rem" }}>💬</span>
          <p style={{ color: "#92400E", fontSize: "0.85rem", lineHeight: "1.5", margin: 0 }}>
            <strong>Instrucciones:</strong> Lee cada pregunta con calma y selecciona la respuesta que consideres correcta. No hay límite de tiempo por pregunta. Responde con honestidad para obtener un resultado preciso.
          </p>
        </div>

        <button
          onClick={onStart}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            width: "100%",
            padding: "1rem 2rem",
            background: hover
              ? `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_COLOR})`
              : `linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_DARK})`,
            color: "#fff",
            border: "none",
            borderRadius: "14px",
            fontSize: "1.1rem",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            transform: hover ? "translateY(-2px)" : "translateY(0)",
            boxShadow: hover
              ? "0 12px 30px rgba(124,58,237,0.45)"
              : "0 6px 20px rgba(124,58,237,0.3)",
            letterSpacing: "0.3px",
          }}
        >
          🚀 Comenzar el Test
        </button>
      </div>

      <p style={{ color: "#9CA3AF", fontSize: "0.78rem", textAlign: "center" }}>
        Gratis · Sin registro · Resultado inmediato
      </p>
    </div>
  );
}

function PantallaQuiz({ onFinish }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [seleccionada, setSeleccionada] = useState(null);
  const [confirmada, setConfirmada] = useState(false);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [animando, setAnimando] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setTiempo(t => t + 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const pregunta = preguntas[preguntaActual];
  const progreso = ((preguntaActual) / preguntas.length) * 100;

  const handleSeleccionar = (idx) => {
    if (confirmada) return;
    setSeleccionada(idx);
  };

  const handleConfirmar = () => {
    if (seleccionada === null || confirmada) return;
    setConfirmada(true);
    setMostrarExplicacion(true);
    setRespuestas(prev => ({ ...prev, [preguntaActual]: seleccionada }));
  };

  const handleSiguiente = () => {
    setAnimando(true);
    setTimeout(() => {
      if (preguntaActual + 1 >= preguntas.length) {
        clearInterval(intervalRef.current);
        onFinish({ respuestas: { ...respuestas, [preguntaActual]: seleccionada }, tiempo });
      } else {
        setPreguntaActual(prev => prev + 1);
        setSeleccionada(null);
        setConfirmada(false);
        setMostrarExplicacion(false);
      }
      setAnimando(false);
    }, 300);
  };

  const esCorrecta = seleccionada === pregunta.respuesta;

  const formatTiempo = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DDD6FE 100%)",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        background: "#fff",
        padding: "1rem 1.5rem",
        boxShadow: "0 2px 12px rgba(124,58,237,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.4rem" }}>🧠</span>
          <span style={{ fontWeight: "800", color: BRAND_COLOR, fontSize: "1rem" }}>{BRAND}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{
            background: BRAND_LIGHT,
            color: BRAND_DARK,
            padding: "0.3rem 0.7rem",
            borderRadius: "20px",
            fontSize: "0.82rem",
            fontWeight: "600",
          }}>⏱️ {formatTiempo(tiempo)}</span>
          <span style={{ color: "#6B7280", fontSize: "0.85rem", fontWeight: "600" }}>
            {preguntaActual + 1} / {preguntas.length}
          </span>
        </div>
      </div>

      {/* Barra de progreso */}
      <div style={{ background: "#E5E7EB", height: "6px", position: "relative" }}>
        <div style={{
          background: `linear-gradient(90deg, ${BRAND_COLOR}, ${ACCENT})`,
          height: "100%",
          width: `${progreso}%`,
          transition: "width 0.5s ease",
          borderRadius: "0 3px 3px 0",
        }} />
      </div>

      {/* Contenido */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem 1rem 2rem",
        opacity: animando ? 0 : 1,
        transition: "opacity 0.3s ease",
      }}>
        <div style={{ maxWidth: "580px", width: "100%" }}>
          {/* Categoría */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}>
            <span style={{
              background: BRAND_LIGHT,
              color: BRAND_DARK,
              padding: "0.3rem 0.8rem",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "700",
            }}>{pregunta.icono} {pregunta.categoria}</span>
          </div>

          {/* Pregunta */}
          <div style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "1.8rem",
            marginBottom: "1.2rem",
            boxShadow: "0 8px 30px rgba(124,58,237,0.1)",
          }}>
            <p style={{
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              fontWeight: "600",
              color: "#1F2937",
              lineHeight: "1.6",
              margin: 0,
            }}>{pregunta.pregunta}</p>
          </div>

          {/* Opciones */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.2rem" }}>
            {pregunta.opciones.map((opcion, idx) => {
              let bg = "#fff";
              let border = "2px solid #E5E7EB";
              let color = "#374151";
              let shadowColor = "rgba(0,0,0,0.05)";

              if (seleccionada === idx && !confirmada) {
                bg = BRAND_LIGHT;
                border = `2px solid ${BRAND_COLOR}`;
                color = BRAND_DARK;
              }
              if (confirmada) {
                if (idx === pregunta.respuesta) {
                  bg = "#D1FAE5";
                  border = "2px solid #10B981";
                  color = "#065F46";
                  shadowColor = "rgba(16,185,129,0.15)";
                } else if (idx === seleccionada && seleccionada !== pregunta.respuesta) {
                  bg = "#FEE2E2";
                  border = "2px solid #EF4444";
                  color = "#991B1B";
                  shadowColor = "rgba(239,68,68,0.15)";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSeleccionar(idx)}
                  style={{
                    background: bg,
                    border,
                    borderRadius: "14px",
                    padding: "1rem 1.2rem",
                    textAlign: "left",
                    cursor: confirmada ? "default" : "pointer",
                    color,
                    fontSize: "0.95rem",
                    fontWeight: seleccionada === idx ? "700" : "500",
                    transition: "all 0.2s ease",
                    boxShadow: `0 4px 12px ${shadowColor}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontFamily: "inherit",
                  }}
                >
                  <span style={{
                    minWidth: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: confirmada && idx === pregunta.respuesta
                      ? "#10B981"
                      : confirmada && idx === seleccionada && seleccionada !== pregunta.respuesta
                        ? "#EF4444"
                        : seleccionada === idx && !confirmada
                          ? BRAND_COLOR
                          : "#F3F4F6",
                    color: (confirmada && (idx === pregunta.respuesta || idx === seleccionada)) || (seleccionada === idx && !confirmada)
                      ? "#fff"
                      : "#6B7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    transition: "all 0.2s ease",
                  }}>
                    {confirmada && idx === pregunta.respuesta ? "✓" :
                      confirmada && idx === seleccionada && seleccionada !== pregunta.respuesta ? "✗" :
                        String.fromCharCode(65 + idx)}
                  </span>
                  {opcion}
                </button>
              );
            })}
          </div>

          {/* Explicación */}
          {mostrarExplicacion && (
            <div style={{
              background: esCorrecta ? "#ECFDF5" : "#FFF7ED",
              border: `1px solid ${esCorrecta ? "#6EE7B7" : "#FED7AA"}`,
              borderRadius: "14px",
              padding: "1rem",
              marginBottom: "1.2rem",
              animation: "fadeIn 0.3s ease",
            }}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.1rem" }}>{esCorrecta ? "🎉" : "💡"}</span>
                <div>
                  <p style={{ fontWeight: "700", color: esCorrecta ? "#065F46" : "#92400E", fontSize: "0.88rem", marginBottom: "0.3rem" }}>
                    {esCorrecta ? "¡Correcto!" : "Respuesta incorrecta"}
                  </p>
                  <p style={{ color: esCorrecta ? "#047857" : "#B45309", fontSize: "0.84rem", lineHeight: "1.5", margin: 0 }}>
                    {pregunta.explicacion}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Botones */}
          {!confirmada ? (
            <button
              onClick={handleConfirmar}
              disabled={seleccionada === null}
              style={{
                width: "100%",
                padding: "1rem",
                background: seleccionada !== null
                  ? `linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_DARK})`
                  : "#E5E7EB",
                color: seleccionada !== null ? "#fff" : "#9CA3AF",
                border: "none",
                borderRadius: "14px",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: seleccionada !== null ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                boxShadow: seleccionada !== null ? "0 6px 20px rgba(124,58,237,0.3)" : "none",
                fontFamily: "inherit",
              }}
            >
              Confirmar Respuesta
            </button>
          ) : (
            <button
              onClick={handleSiguiente}
              style={{
                width: "100%",
                padding: "1rem",
                background: `linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_DARK})`,
                color: "#fff",
                border: "none",
                borderRadius: "14px",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 20px rgba(124,58,237,0.3)",
                fontFamily: "inherit",
              }}
            >
              {preguntaActual + 1 >= preguntas.length ? "Ver mis resultados 🎯" : "Siguiente pregunta →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PantallaResultados({ resultado, onReiniciar }) {
  const { respuestas, tiempo } = resultado;
  const correctas = preguntas.filter((p, i) => respuestas[i] === p.respuesta).length;
  const iq = calcularIQ(correctas, preguntas.length);
  const clasificacion = clasificarIQ(iq);
  const percentil = calcularPercentil(iq);

  // Stats por categoría
  const statsCat = {};
  categorias.forEach(cat => {
    const preg = preguntas.filter(p => p.categoria === cat);
    const correctasCat = preg.filter((p, _) => {
      const idx = preguntas.indexOf(p);
      return respuestas[idx] === p.respuesta;
    }).length;
    statsCat[cat] = { total: preg.length, correctas: correctasCat };
  });

  const formatTiempo = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m} min ${sec} seg`;
  };

  const [hovReinicio, setHovReinicio] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DDD6FE 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: "0 0 3rem",
    }}>
      {/* Header */}
      <div style={{
        background: "#fff",
        padding: "1rem 1.5rem",
        boxShadow: "0 2px 12px rgba(124,58,237,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
      }}>
        <span style={{ fontSize: "1.4rem" }}>🧠</span>
        <span style={{ fontWeight: "800", color: BRAND_COLOR, fontSize: "1rem" }}>{BRAND}</span>
      </div>

      <div style={{ maxWidth: "580px", margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* Resultado principal */}
        <div style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "2.5rem 2rem",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(124,58,237,0.15)",
          marginBottom: "1.2rem",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{clasificacion.emoji}</div>
          <h2 style={{ color: "#6B7280", fontSize: "0.9rem", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Tu Puntuación de IQ
          </h2>
          <div style={{
            fontSize: "clamp(4rem, 12vw, 6rem)",
            fontWeight: "900",
            color: clasificacion.color,
            lineHeight: 1,
            marginBottom: "0.5rem",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
          }}>{iq}</div>
          <div style={{
            display: "inline-block",
            background: clasificacion.color,
            color: "#fff",
            padding: "0.4rem 1.2rem",
            borderRadius: "20px",
            fontWeight: "700",
            fontSize: "0.95rem",
            marginBottom: "1rem",
          }}>{clasificacion.label}</div>
          <p style={{ color: "#6B7280", fontSize: "0.9rem", lineHeight: "1.6", margin: "0 0 1.5rem" }}>
            {clasificacion.desc}
          </p>

          {/* Percentil visual */}
          <div style={{
            background: "#F9FAFB",
            borderRadius: "16px",
            padding: "1.2rem",
            marginBottom: "0.5rem",
          }}>
            <p style={{ color: "#374151", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.8rem" }}>
              Superas al <span style={{ color: clasificacion.color, fontSize: "1.2rem" }}>{percentil}%</span> de la población
            </p>
            <div style={{ background: "#E5E7EB", borderRadius: "8px", height: "12px", overflow: "hidden" }}>
              <div style={{
                background: `linear-gradient(90deg, ${BRAND_COLOR}, ${clasificacion.color})`,
                height: "100%",
                width: `${percentil}%`,
                borderRadius: "8px",
                transition: "width 1.5s ease",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
              <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>0%</span>
              <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>100%</span>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0.75rem",
          marginBottom: "1.2rem",
        }}>
          {[
            { label: "Correctas", value: `${correctas}/${preguntas.length}`, icon: "✅", color: "#10B981" },
            { label: "Precisión", value: `${Math.round((correctas / preguntas.length) * 100)}%`, icon: "🎯", color: BRAND_COLOR },
            { label: "Tiempo", value: formatTiempo(tiempo), icon: "⏱️", color: "#F59E0B" },
          ].map((stat, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "1rem 0.5rem",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>{stat.icon}</div>
              <div style={{ fontWeight: "800", color: stat.color, fontSize: "1rem" }}>{stat.value}</div>
              <div style={{ color: "#9CA3AF", fontSize: "0.72rem", fontWeight: "600" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Resultados por categoría */}
        <div style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "1.5rem",
          marginBottom: "1.2rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
        }}>
          <h3 style={{ color: "#1F2937", fontWeight: "700", fontSize: "1rem", marginBottom: "1.2rem" }}>
            📊 Análisis por Categoría
          </h3>
          {Object.entries(statsCat).filter(([_, v]) => v.total > 0).map(([cat, data]) => {
            const pct = data.total > 0 ? (data.correctas / data.total) * 100 : 0;
            const catColor = pct >= 70 ? "#10B981" : pct >= 40 ? "#F59E0B" : "#EF4444";
            const icono = preguntas.find(p => p.categoria === cat)?.icono || "📌";
            return (
              <div key={cat} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#374151" }}>
                    {icono} {cat}
                  </span>
                  <span style={{ fontSize: "0.82rem", fontWeight: "700", color: catColor }}>
                    {data.correctas}/{data.total}
                  </span>
                </div>
                <div style={{ background: "#F3F4F6", borderRadius: "6px", height: "8px", overflow: "hidden" }}>
                  <div style={{
                    background: catColor,
                    height: "100%",
                    width: `${pct}%`,
                    borderRadius: "6px",
                    transition: "width 1s ease",
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Curva de distribución IQ */}
        <div style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
        }}>
          <h3 style={{ color: "#1F2937", fontWeight: "700", fontSize: "1rem", marginBottom: "1rem" }}>
            📈 Escala de Inteligencia
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { range: "140+", label: "Genio", color: "#7C3AED", min: 140 },
              { range: "130–139", label: "Muy Superior", color: "#2563EB", min: 130 },
              { range: "120–129", label: "Superior", color: "#059669", min: 120 },
              { range: "110–119", label: "Por Encima del Promedio", color: "#0891B2", min: 110 },
              { range: "90–109", label: "Promedio", color: "#D97706", min: 90 },
              { range: "80–89", label: "Por Debajo del Promedio", color: "#DC2626", min: 80 },
              { range: "< 80", label: "Bajo", color: "#991B1B", min: 0 },
            ].map((nivel) => {
              const esNivel = iq >= nivel.min && (nivel.min === 0 ? iq < 80 : nivel.label === "Genio" ? iq >= 140 : iq < nivel.min + 10 || nivel.label === "Por Encima del Promedio" ? iq >= 110 && iq < 120 : true);
              const esTuNivel = clasificacion.label === nivel.label;
              return (
                <div key={nivel.range} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "10px",
                  background: esTuNivel ? `${nivel.color}15` : "transparent",
                  border: esTuNivel ? `2px solid ${nivel.color}` : "2px solid transparent",
                  transition: "all 0.2s",
                }}>
                  <div style={{
                    width: "10px", height: "10px",
                    borderRadius: "50%",
                    background: nivel.color,
                    flexShrink: 0,
                  }} />
                  <span style={{ color: "#374151", fontSize: "0.82rem", flex: 1 }}>{nivel.label}</span>
                  <span style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>{nivel.range}</span>
                  {esTuNivel && (
                    <span style={{
                      background: nivel.color,
                      color: "#fff",
                      padding: "0.1rem 0.5rem",
                      borderRadius: "8px",
                      fontSize: "0.72rem",
                      fontWeight: "700",
                    }}>Tú</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botón reiniciar */}
        <button
          onClick={onReiniciar}
          onMouseEnter={() => setHovReinicio(true)}
          onMouseLeave={() => setHovReinicio(false)}
          style={{
            width: "100%",
            padding: "1rem",
            background: hovReinicio
              ? `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_COLOR})`
              : `linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_DARK})`,
            color: "#fff",
            border: "none",
            borderRadius: "14px",
            fontSize: "1rem",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            transform: hovReinicio ? "translateY(-2px)" : "translateY(0)",
            boxShadow: hovReinicio
              ? "0 12px 30px rgba(124,58,237,0.45)"
              : "0 6px 20px rgba(124,58,237,0.3)",
            fontFamily: "inherit",
            marginBottom: "1rem",
          }}
        >
          🔄 Repetir el Test
        </button>

        <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: "0.78rem" }}>
          Los resultados son orientativos y no reemplazan una evaluación psicológica profesional.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [pantalla, setPantalla] = useState("inicio"); // inicio | quiz | resultado
  const [resultado, setResultado] = useState(null);

  const handleStart = () => setPantalla("quiz");

  const handleFinish = (datos) => {
    setResultado(datos);
    setPantalla("resultado");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReiniciar = () => {
    setResultado(null);
    setPantalla("inicio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; }
        button:focus-visible { outline: 3px solid #7C3AED; outline-offset: 2px; }
      `}</style>

      {pantalla === "inicio" && <PantallaInicio onStart={handleStart} />}
      {pantalla === "quiz" && <PantallaQuiz onFinish={handleFinish} />}
      {pantalla === "resultado" && <PantallaResultados resultado={resultado} onReiniciar={handleReiniciar} />}
    </>
  );
}