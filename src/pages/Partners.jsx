import React from "react";
import "./Partners.css"; 
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";


export default function Partners() {
  const partners = [
    { name: "Imprimerie Sabri", logo: logo },
    { name: "ONG Nationale", logo: logo2 },
    { name: "Artisans Locaux", logo: logo }
  ];

  return (
    <section className="partners-section">
      <h2 className="partners-title"> Nos Partenaires</h2>
      <p className="partners-desc">
        Nous collaborons avec des partenaires engagés pour la réussite de nos projets.
      </p>
      <div className="partners-grid">
        {partners.map((partner, index) => (
          <div key={index} className="partner-card">
            <img src={partner.logo} alt={partner.name} className="partner-logo" />
            <h3>{partner.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
