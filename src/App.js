import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, PawPrint } from "lucide-react";
import { Analytics } from '@vercel/analytics/react';


const dogsData = [
  {
    name: "Max",
    status: "En tratamiento",
    img: "https://placedog.net/400/300?id=1",
    story: "Max fue rescatado en estado crítico. Hoy lucha cada día con tratamiento y amor."
  },
  {
    name: "Luna",
    status: "Recuperándose",
    img: "https://placedog.net/400/300?id=2",
    story: "Luna llegó con complicaciones severas, pero ahora vuelve a correr y jugar."
  },
  {
    name: "Rocky",
    status: "En adopción",
    img: "https://placedog.net/400/300?id=3",
    story: "Rocky está listo para una nueva familia tras superar su enfermedad."
  },
];


export default function CushingFoundation() {
  const [donations, setDonations] = useState(12500);
  const [displayDonations, setDisplayDonations] = useState(12500);
  const [selectedDog, setSelectedDog] = useState(null);
  const [donationOpen, setDonationOpen] = useState(false);

  useEffect(() => {
    if (donationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [donationOpen]);

  const [customAmount, setCustomAmount] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [faqAbierto, setFaqAbierto] = useState(null);
  const sonido = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3");

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const animateDonations = (newAmount) => {
  let current = displayDonations;
  const increment = Math.ceil((newAmount - current) / 20);


  const interval = setInterval(() => {
    current += increment;

    if (current >= newAmount) {
      current = newAmount;
      clearInterval(interval);
    }

    setDisplayDonations(current);
  }, 20);
};

const mostrarMensaje = (amount) => {
  setMensaje(`Gracias ${nombre || "amigo"} por donar $${amount} 🐶💙`);

  setTimeout(() => {
    setMensaje("");
  }, 3000);
};



  return (
    <div style={{ 
  fontFamily: "Inter, sans-serif",
  color: "white",
  minHeight: "100vh",
  background: "linear-gradient(-45deg, #020617, #020617, #0f172a, #1e3a8a)",
  backgroundSize: "400% 400%",
  animation: "gradientBG 15s ease infinite"
}}>

      {/* Header */}
      <header style={{
  background: "rgba(2,6,23,0.85)",
  padding: "20px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 1000 // 👈
}}>
  <div>
    <h1 style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, fontWeight: 700 }}>
      <PawPrint color="#3b82f6" />
      Fundación <span style={{ color: "#3b82f6" }}>Cushing</span>
    </h1>
    <p style={{ fontSize: 12, color: "#94a3b8" }}>
      Apoyo y tratamiento para perros con síndrome de Cushing
    </p>
  </div>

  {/*  NUEVA NAVEGACIÓN */}
  <div style={{ display: "flex", gap: 20, alignItems: "center" }}>

   <a 
  href="#info" 
  style={{
    color: "#e2e8f0",
    textDecoration: "none",
    fontWeight: 500,
    letterSpacing: "0.5px",
    fontSize: 15,
    padding: "6px 10px",
    borderRadius: 8,
    transition: "0.3s"
  }}
>
  Información
</a>

    <a href="#esperanza" style={{ color: "white", textDecoration: "none" }}>
    Esperanza de vida
    </a>

    <a href="#tratamiento" style={{ color: "white", textDecoration: "none" }}>
    Tratamiento
    </a>

    <a href="#faq" style={{ color: "white", textDecoration: "none" }}>
    FAQ
   </a>

    <a href="#contacto" style={{ color: "white", textDecoration: "none" }}>
      Contacto
    </a>

    <a href="#donar" style={{
      background: "linear-gradient(135deg,#3b82f6,#1e3a8a)",
      padding: "10px 20px",
      borderRadius: 999,
      textDecoration: "none",
      color: "white",
      fontWeight: "bold"
    }}>
      Donar
    </a>

  </div>
</header>

      {/* Hero */}
     <motion.section
  style={{ textAlign: "center", padding: "100px 20px" }}
  variants={fadeIn}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.8 }}
>
  <motion.h2
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{ fontSize: 56 }}
  >
    Historias que salvan vidas
  </motion.h2>

  <p style={{ color: "#94a3b8", maxWidth: 600, margin: "auto" }}>
    Cada aportación ayuda a salvar vidas y mejorar tratamientos.
  </p>
</motion.section>

      {/*  */}
      <motion.section
  style={{ display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap", marginBottom: 40 }}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
        {[
          { val: "+50", label: "Perros rescatados" },
          { val: "+200", label: "Tratamientos financiados" },
          { val: `$${displayDonations}`, label: "Recaudado" }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08, y: -5 }}
            style={{
              background: "#0f172a",
              padding: 30,
              borderRadius: 20,
              textAlign: "center",
              width: 200,
              border: "1px solid #1e293b",
              cursor: "pointer"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(59,130,246,0.4)";
              e.currentTarget.style.border = "1px solid #3b82f6";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.border = "1px solid #1e293b";
            }}
          >
            <h3 style={{ color: "#3b82f6", fontSize: 26 }}>{item.val}</h3>
            <p style={{ color: "#94a3b8" }}>{item.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Dogs */}
      <motion.section
  style={{ padding: 60 }}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
        <h3 style={{ textAlign: "center", marginBottom: 30 }}>Haz click para conocer su historia</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          {dogsData.map((dog, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07, y: -5 }}
              onClick={() => setSelectedDog(dog)}
              style={{
                background: "#0f172a",
                borderRadius: 20,
                overflow: "hidden",
                width: 260,
                cursor: "pointer",
                border: "1px solid #1e293b"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(59,130,246,0.4)";
                e.currentTarget.style.border = "1px solid #3b82f6";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.border = "1px solid #1e293b";
              }}
            >
              <img src={dog.img} alt={dog.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
              <div style={{ padding: 15 }}>
                <h4>{dog.name}</h4>
                <p style={{ color: "#94a3b8" }}>{dog.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
    </motion.section>
  

      {/* Modal */}
      <AnimatePresence>
  {selectedDog && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999
      }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        style={{
          background: "#020617",
          padding: 30,
          borderRadius: 20
        }}
      >
        {/* contenido */}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Donation */}
     
      <motion.section
  id="donar"
  style={{ textAlign: "center", padding: 80 }}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
        <h3>Apoya nuestra causa</h3>
        <button
  onClick={() => setDonationOpen(true)}
  style={{
    marginTop: 20,
    padding: "15px 40px",
    borderRadius: 999,
    background: "linear-gradient(135deg,#3b82f6,#1e3a8a)",
    border: "none",
    color: "white",
    cursor: "pointer",
    transition: "0.3s"
  }}
>
  <Heart /> Dona y salva una vida 🐶
</button>
      </motion.section>
      <AnimatePresence>
  {donationOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
     style={{
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99999 // 
}}
      onClick={() => setDonationOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#020617",
          padding: 30,
          borderRadius: 20,
          textAlign: "center",
          border: "1px solid #3b82f6",
          width: 350
        }}
      >
        <h2 style={{ color: "#3b82f6" }}>Apoya con una donación 💙</h2>
        <p style={{ color: "#94a3b8" }}>
          Tu ayuda salva vidas reales
        </p>
<div style={{ display: "flex", justifyContent: "center" }}>
        <input
  type="text"
  placeholder="Tu nombre"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
  style={{
    marginTop: 10,
    padding: 10,
    width: "70%",
    maxWidth: 250,
    borderRadius: 10,
    border: "1px solid #1e293b",
    background: "#0f172a",
    color: "white",
    textAlign: "center"
  }}
/>
</div>


<div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>

  {[50, 100, 200].map((amount) => (
    <button
      key={amount}
      onClick={() => {
        const newTotal = donations + amount;
        setDonations(newTotal);
        animateDonations(newTotal);
       
        mostrarMensaje(amount);
        sonido.play();
        window.open(
  `https://www.paypal.com/donate/?business=arturoferrari.endcc@gmail.com&amount=${amount}&currency_code=MXN`,
  "paypal",
  "width=600,height=700"
);
        setDonationOpen(false);
      }}
      style={{
        padding: "10px 20px",
        borderRadius: 10,
        border: "none",
        background: "#1e293b",
        color: "white",
        cursor: "pointer"
      }}
    >
      ${amount}
    </button>
  ))}

</div> {/* 👈 MUY IMPORTANTE: cerrar aquí */}

{/* 👇 NUEVO BLOQUE SEPARADO */}
<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

  <input
    type="number"
    placeholder="Ej. 150"
    value={customAmount}
    onChange={(e) => setCustomAmount(e.target.value)}
    style={{
      marginTop: 15,
      padding: 12,
      width: "80%",
      borderRadius: 12,
      border: "1px solid #1e293b",
      background: "#0f172a",
      color: "white",
      textAlign: "center"
    }}
  />

  

</div>

        <button
          onClick={() => setDonationOpen(false)}
          style={{
            marginTop: 20,
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer"
          }}
        >
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {mensaje && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      style={{
        position: "fixed",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#3b82f6",
        padding: "15px 25px",
        borderRadius: 12,
        color: "white",
        fontWeight: "bold",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}
    >
      {mensaje}
    </motion.div>
  )}
</AnimatePresence>




<motion.section
  id="info"
  whileHover={{ scale: 1.01 }}
 style={{
  padding: 80,
  maxWidth: 900,
  margin: "40px auto",
  textAlign: "center",
  background: "rgba(15,23,42,0.6)",
  borderRadius: 20,
  border: "1px solid rgba(59,130,246,0.2)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  transition: "0.3s"
}}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <h2 style={{
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 20,
  background: "linear-gradient(90deg,#3b82f6,#60a5fa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "0.5px"
}}>
    ¿Qué es el síndrome de Cushing?
  </h2>

  <p style={{ 
    color: "#cbd5f5",
    fontSize: 17,
    lineHeight: 1.7,
    marginBottom: 15
  }}>
    El síndrome de Cushing es una enfermedad hormonal que afecta a muchos perros,
    causada por un exceso de cortisol en el cuerpo. Puede provocar síntomas como
    aumento de sed, pérdida de pelo, debilidad y cambios en el comportamiento.
  </p>

  <p style={{ 
    color: "#94a3b8",
    fontSize: 16,
    lineHeight: 1.6
  }}>
    Con diagnóstico temprano y tratamiento adecuado, los perros pueden tener una
    mejor calidad de vida y vivir más tiempo.
  </p>
</motion.section>




<motion.section
  id="tratamiento"
  whileHover={{ scale: 1.01 }}
  style={{
  padding: 80,
  maxWidth: 900,
  margin: "40px auto",
  textAlign: "center",
  background: "rgba(15,23,42,0.6)",
  borderRadius: 20,
  border: "1px solid rgba(59,130,246,0.2)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  transition: "0.3s"
}}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <h2 style={{
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 20,
  background: "linear-gradient(90deg,#3b82f6,#60a5fa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "0.5px"
}}>
    Tratamiento 
  </h2>

  <p style={{
    color: "#cbd5f5",
    fontSize: 17,
    lineHeight: 1.7,
    marginBottom: 15
  }}>
    El tratamiento del síndrome de Cushing en perros suele incluir medicamentos que ayudan a
    controlar los niveles de cortisol en el organismo.
  </p>

  <p style={{
    color: "#94a3b8",
    fontSize: 16,
    lineHeight: 1.6
  }}>
    Con seguimiento veterinario adecuado, muchos perros pueden vivir una vida larga y de buena calidad.
  </p>
</motion.section>


<motion.section
  id="esperanza"
  whileHover={{ scale: 1.01 }}
  style={{
  padding: 80,
  maxWidth: 900,
  margin: "40px auto",
  textAlign: "center",
  background: "rgba(15,23,42,0.6)",
  borderRadius: 20,
  border: "1px solid rgba(59,130,246,0.2)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  transition: "0.3s"
}}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <h2 style={{
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 20,
  background: "linear-gradient(90deg,#3b82f6,#60a5fa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "0.5px"
}}>
    Esperanza de vida
  </h2>

  <p style={{
    color: "#cbd5f5",
    fontSize: 17,
    lineHeight: 1.7,
    marginBottom: 15
  }}>
    Sin tratamiento, el síndrome de Cushing puede reducir significativamente la calidad
    de vida del perro y provocar complicaciones graves.
  </p>

  <p style={{
    color: "#94a3b8",
    fontSize: 16,
    lineHeight: 1.6
  }}>
    Con tratamiento adecuado, muchos perros pueden vivir varios años con buena calidad de vida.
  </p>
</motion.section>


<motion.section
whileHover={{ scale: 1.01 }}
  id="faq"
 style={{
  padding: 80,
  maxWidth: 900,
  margin: "40px auto",
  textAlign: "center",
  background: "rgba(15,23,42,0.6)",
  borderRadius: 20,
  border: "1px solid rgba(59,130,246,0.2)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  transition: "0.3s"
}}
>
  <h2 style={{
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 20,
  background: "linear-gradient(90deg,#3b82f6,#60a5fa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "0.5px"
}}>
    Preguntas frecuentes 
  </h2>

  <div style={{ maxWidth: 800, margin: "auto", marginTop: 30 }}>

    {[
      {
        pregunta: "¿El síndrome de Cushing tiene cura?",
        respuesta: "No siempre tiene cura, pero puede controlarse con tratamiento adecuado."
      },
      {
        pregunta: "¿Qué síntomas son más comunes?",
        respuesta: "Sed excesiva, aumento de apetito, pérdida de pelo y debilidad."
      },
      {
        pregunta: "¿El tratamiento es costoso?",
        respuesta: "Puede serlo, ya que requiere medicación continua y revisiones."
      },
      {
        pregunta: "¿Cuánto puede vivir un perro con tratamiento?",
        respuesta: "Muchos perros viven varios años con buena calidad de vida."
      }
    ].map((item, index) => (
      <div
        key={index}
        onClick={() => setFaqAbierto(faqAbierto === index ? null : index)}
        style={{
          background: "#0f172a",
          padding: 20,
          borderRadius: 12,
          marginBottom: 15,
          cursor: "pointer",
          border: "1px solid #1e293b"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
  <h4 style={{ margin: 0 }}>{item.pregunta}</h4>
  <span style={{
    transform: faqAbierto === index ? "rotate(180deg)" : "rotate(0deg)",
    transition: "0.3s"
  }}>
    ▼
  </span>
</div>

        <AnimatePresence>
          {faqAbierto === index && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ color: "#94a3b8", marginTop: 10, overflow: "hidden" }}
            >
              {item.respuesta}
            </motion.p>
          )}
        </AnimatePresence>

      </div>
    ))}

  </div>
</motion.section>


<motion.section
  id="contacto"
  whileHover={{ scale: 1.01 }}
  style={{
  padding: 80,
  maxWidth: 900,
  margin: "40px auto",
  textAlign: "center",
  background: "rgba(15,23,42,0.6)",
  borderRadius: 20,
  border: "1px solid rgba(59,130,246,0.2)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  transition: "0.3s"
}}
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
 <h2 style={{
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 20,
  background: "linear-gradient(90deg,#3b82f6,#60a5fa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "0.5px"
}}>
    Contacto 📩
  </h2>

  <p style={{
    color: "#cbd5f5",
    fontSize: 17,
    marginBottom: 15
  }}>
    Si deseas ayudar, colaborar o adoptar, contáctanos:
  </p>

  <p style={{
    fontSize: 18,
    fontWeight: 600,
    color: "#3b82f6"
  }}>
    cushingcanino.org@gmail.com
  </p>
</motion.section>





      {/* Footer */}
      <footer style={{ textAlign: "center", padding: 20, borderTop: "1px solid #1e293b" }}>
        <p>© {new Date().getFullYear()} Fundación Cushing Canino</p>
      </footer>

      <Analytics />
    </div>
  );
}
