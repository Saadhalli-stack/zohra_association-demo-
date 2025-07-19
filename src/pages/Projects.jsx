import React, { useState } from "react";
import event1 from "../events/event1.png";
import "./Projects.css";

export default function Projects() {
  const [selected, setSelected] = useState(null);

  const openModal = () => setSelected({
    image: event1,
    title: "Repas Caritatif Marocain 2025",
    date: "Le 14 septembre 2025, à partir de 12h",
    description: "Senteurs et Saveurs du Maroc ; rejoignez-nous pour un moment délicieux et solidaire !"
  });

  const closeModal = () => setSelected(null);

  return (
  <section className="projects-section">
  <h2 className="section-title">Nos événements</h2>
  
  <div className="event-card" onClick={openModal}>
    <img src={event1} alt="Repas Caritatif" className="event-thumbnail" />
    <h3>Repas Caritatif Marocain 2025</h3>
    <p>Le 14 septembre 2025</p>
  </div>

  {selected && (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={selected.image} alt={selected.title} className="modal-image" />
        <h3>{selected.title}</h3>
        <p>{selected.date}</p>
        <p>{selected.description}</p>
        <button onClick={closeModal} className="close-btn">Fermer</button>
      </div>
    </div>
  )}
</section>

  );
}
