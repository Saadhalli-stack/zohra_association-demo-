import React, { useEffect } from "react";
import "./Home.css";
import logo2 from "../assets/logo2.png";

export default function Home() {
  useEffect(() => {
    initReveal();
  }, []);

  return (
    <section className="home-section reveal">
      <h1>Association humanitaire - "Écoles de Zohra"</h1>
      <img src={logo2} alt="École rénovée" className="home-image" />
      <p>
        "Notre association humanitaire a pour objet l’amélioration du cadre de
        vie et la création d’espaces culturels et éducatifs dans les écoles
        publiques au Maroc, situées dans des quartiers défavorisés, afin de
        permettre aux écoliers d’avoir un environnement sain et propice à leur
        apprentissage".
      </p>
      <a href="/donate" className="btn-primary">
        Faire un don
      </a>
    </section>
  );
}
export function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}
