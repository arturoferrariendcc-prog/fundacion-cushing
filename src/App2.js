import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, PawPrint } from "lucide-react";

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
  const [donations] = useState(12500);
  const [selectedDog, setSelectedDog] = useState(null);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#020617", color: "white", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{
        background: "rgba(2,6,23,0.85)",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1e293b"
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

        <a href="#donar" style={{
          background: "linear-gradient(135deg,#3b82f6,#1e3a8a)",
          padding: "10px 20px",
          borderRadius: 999,
          textDecoration: "none",
          color: "white",
          fontWeight: "bold"
        }}>Donar</a>
      </header>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "100px 20px" }}>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 56 }}>
          Historias que salvan vidas
        </motion.h2>
        <p style={{ color: "#94a3b8", maxWidth: 600, margin: "auto" }}>
          Cada aportación ayuda a salvar vidas y mejorar tratamientos.
        </p>
      </section>

      {/* 🔥 STATS PRO */}
      <section style={{ display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap", marginBottom: 40 }}>
        {[
          { val: "+50", label: "Perros rescatados" },
          { val: "+200", label: "Tratamientos financiados" },
          { val: `$${donations}`, label: "Recaudado" }
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
      </section>

      {/* Dogs */}
      <section style={{ padding: 60 }}>
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
      </section>

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
              alignItems: "center"
            }}
            onClick={() => setSelectedDog(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={{
                background: "#020617",
                padding: 30,
                borderRadius: 20,
                maxWidth: 400,
                textAlign: "center",
                border: "1px solid #3b82f6"
              }}
            >
              <h2 style={{ color: "#3b82f6" }}>{selectedDog.name}</h2>
              <p>{selectedDog.story}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Donation */}
      <section id="donar" style={{ textAlign: "center", padding: 80 }}>
        <h3>Apoya nuestra causa</h3>
        <button
          onClick={() => window.open("https://www.paypal.com/donate")}
          style={{
            marginTop: 20,
            padding: "15px 40px",
            borderRadius: 999,
            background: "linear-gradient(135deg,#3b82f6,#1e3a8a)",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          <Heart /> Donar ahora
        </button>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: 20, borderTop: "1px solid #1e293b" }}>
        <p>© {new Date().getFullYear()} Fundación Cushing Canino</p>
      </footer>

    </div>
  );
}


