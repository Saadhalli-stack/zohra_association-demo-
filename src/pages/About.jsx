import React from "react";
import "./About.css";
import logo from "../assets/logo.png"; 

export default function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-logo">
          <img src={logo} alt="Logo Écoles de Zohra" />
        </div>
        <div className="about-text">
          <h2>À propos de nous</h2>
          <p>
           "Écoles de Zohra est une organisation humanitaire marocaine qui œuvre
            à la rénovation des écoles dans les zones rurales. Nous créons des
            environnements éducatifs sains et stimulants pour les enfants,
            favorisant l’égalité des chances et l’avenir des jeunes générations".
          </p>
         
        </div>
      </div>
    </section>
  );
}
