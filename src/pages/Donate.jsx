import React, { useState } from "react";
import "./Donate.css";

export default function Donate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="donate-section">
      <div className="donate-container">
      
        <div
          className={`envelope-3d ${isOpen ? "is-open" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? setIsOpen(true) : null)}
          aria-label="Ouvrir la lettre de remerciement"
          aria-expanded={isOpen}
          aria-controls="donate-letter"
        >
          <div className="env-back"></div>
          <div className="env-front"></div>
          <div className="env-flap"></div>
          <span className="env-text">Clique moi ❤️</span>
        </div>

       
        <div
          id="donate-letter"
          className={`donate-letter ${isOpen ? "show" : ""}`}
          aria-hidden={!isOpen}
        >
          <h2 className="donate-title">Merci pour votre soutien !</h2>
          <p className="donate-message">
            Chaque don est un geste d’amour qui aide les enfants des écoles rurales.
            Grâce à vous, nous rénovons, équipons et redonnons espoir.
            <br />
            <strong>Merci de tout cœur. 💚</strong>
          </p>
          <a
            href="https://www.helloasso.com/associations/ecoles-de-zohra/formulaires/1"
            target="_blank"
            rel="noopener noreferrer"
            className="donate-btn"
          >
            Faire un don
          </a>
          <button
            type="button"
            className="donate-close"
            onClick={() => setIsOpen(false)}
          >
            Fermer
          </button>
        </div>
      </div>
    </section>
  );
}
  