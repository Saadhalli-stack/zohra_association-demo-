import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Gallery.css";

export default function Gallery() {
  const galleryItems = [
    {
   
      image: "/images/galerie1.jpg",
      images: [
        "/images/galerie1.jpg",
        "/images/galerie2.png",
        "/images/galerie3.png",
      ],
      title: "Mise en place et lancement des programmes pilotes dans l’école Deroua",
      description:
        "Dans l’école de Deroua, nous avons lancé trois programmes clés : Programme de sensibilisation à la poursuite d’étude pour les jeunes femmes ; Programme pour élèves à besoins spécifiques (Petit Ayoub a reçu un fauteuil roulant) ; Programme environnemental avec ateliers et initiatives pour sensibiliser les élèves à la protection de leur environnement.",
    },
    {
      image: "/images/galerie1b.png",
      images: ["/images/galerie1b.png", "/images/galerie2b.png", "/images/galerie3b.png"],
      title: "Témoignage | Volontariat de Laurie Wolff à Casablanca.",
    
   description: "Laurie Wolff, une bénévole engagée dans l’association depuis quelques mois, s’est rendue à Casablanca pour soutenir nos actions sur le terrain. Aux côtés de Touria, la sœur de Souad (notre présidente), Laurie a contribué à la mise en place des programmes éducatifs, à la communication et à l’organisation administrative. Elle a également participé à des actions concrètes comme la peinture et la rénovation dans les écoles, renforçant notre impact sur place."

    },
    {
      image: "/images/galerie1c.png",
      images: ["/images/galerie1c.png", "/images/galerie2c.png"],
     
  title: "Inauguration du terrain de football à l’école Ben Abass",
  date: "23 novembre",
  description: "Le 23 novembre, nous avons célébré un moment fort pour l’école Ben Abass : l’inauguration officielle du terrain de football entièrement rénové. Pour marquer cet événement, un tournoi exceptionnel a été organisé, réunissant plusieurs équipes, dont deux équipes féminines. La famille venue de France était également présente pour soutenir cette belle initiative et partager ce moment unique avec les enfants. Ce projet, fruit d’efforts collectifs, est bien plus qu’un terrain de jeu : c’est un espace pour rêver, s’épanouir et grandir. Un grand merci à toutes celles et ceux qui ont contribué à rendre ce rêve possible.",

    },
  ];


  const [selectedIndex, setSelectedIndex] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0); 
  const autoplayRef = useRef(null);
  const hoverPauseRef = useRef(false);


  const selectedItem =
    selectedIndex === null ? null : galleryItems[selectedIndex] || null;
  const slides = selectedItem
    ? (selectedItem.images && selectedItem.images.length > 0
        ? selectedItem.images
        : selectedItem.image
        ? [selectedItem.image]
        : [])
    : [];
  const hasMultiple = slides.length > 1;

  /* -------------------- Open / Close modal -------------------- */
  const openModal = useCallback((idx) => {
    setSelectedIndex(idx);
    setSlideIndex(0);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    setSlideIndex(0);
  }, []);

  /* -------------------- Slide navigation -------------------- */
  const goNext = useCallback(() => {
    setSlideIndex((i) => (slides.length ? (i + 1) % slides.length : 0));
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setSlideIndex((i) =>
      slides.length ? (i - 1 + slides.length) % slides.length : 0
    );
  }, [slides.length]);

  const goTo = useCallback((i) => {
    if (i >= 0 && i < slides.length) setSlideIndex(i);
  }, [slides.length]);

 
  useEffect(() => {
    if (!selectedItem || !hasMultiple) return; 

    const start = () => {
      stop();
      autoplayRef.current = setInterval(() => {
        if (!hoverPauseRef.current) {
          setSlideIndex((i) => (i + 1) % slides.length);
        }
      }, 3000); 
    };
    const stop = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    start();
    return stop;
  }, [selectedItem, hasMultiple, slides.length]);


  useEffect(() => {
    const handleVisibility = () => {
      hoverPauseRef.current = document.hidden; 
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  
  useEffect(() => {
    if (selectedItem === null) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedItem, closeModal, goNext, goPrev]);

  /* -------------------- Render -------------------- */
  return (
    <section className="section gallery-section">
      <h2>Galerie</h2>
      <div className="projects-grid gallery-grid">
        {galleryItems.map((item, index) => (
          <GalleryCard
            key={index}
            item={item}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {selectedItem && (
        <GalleryModal
          slides={slides}
          title={selectedItem.title}
          description={selectedItem.description}
          slideIndex={slideIndex}
          onPrev={goPrev}
          onNext={goNext}
          onBullet={goTo}
          onClose={closeModal}
          onHoverChange={(isHover) => {
            hoverPauseRef.current = isHover;
          }}
        />
      )}
    </section>
  );
}

/* =============================================================
 * GalleryCard — cover card shown in the grid
 * ============================================================= */
function GalleryCard({ item, onClick }) {
  const cover = item.image || (item.images && item.images[0]);
  return (
    <div className="project-card gallery-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}>
      <div className="gallery-card-img-wrap">
        <img src={cover} alt={item.title} className="gallery-card-img" />
      </div>
      <div className="gallery-card-text">
        <h3 className="gallery-card-title">{item.title}</h3>
        <p className="gallery-card-desc">{item.description}</p>
      </div>
    </div>
  );
}

/* =============================================================
 * GalleryModal — fullscreen overlay slideshow
 * ============================================================= */
function GalleryModal({
  slides,
  title,
  description,
  slideIndex,
  onPrev,
  onNext,
  onBullet,
  onClose,
  onHoverChange,
}) {
  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div
        className="gallery-modal-content"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <button className="gallery-modal-close" onClick={onClose} aria-label="Fermer">×</button>

        <div
          className="gallery-modal-slider"
          onMouseEnter={() => onHoverChange(true)}
          onMouseLeave={() => onHoverChange(false)}
        >
          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} ${i + 1}`}
              className={
                i === slideIndex
                  ? "gallery-modal-slide is-active"
                  : "gallery-modal-slide"
              }
              style={{ transform: `translateX(${(i - slideIndex) * 100}%)` }}
            />
          ))}

          {slides.length > 1 && (
            <>
              <button
                className="gallery-modal-nav prev"
                onClick={onPrev}
                aria-label="Image précédente"
              >
                ‹
              </button>
              <button
                className="gallery-modal-nav next"
                onClick={onNext}
                aria-label="Image suivante"
              >
                ›
              </button>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div className="gallery-modal-bullets">
            {slides.map((_, i) => (
              <button
                key={i}
                className={
                  i === slideIndex ? "bullet is-active" : "bullet"
                }
                onClick={() => onBullet(i)}
                aria-label={`Aller à l'image ${i + 1}`}
              />
            ))}
          </div>
        )}

        <div className="gallery-modal-info">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
