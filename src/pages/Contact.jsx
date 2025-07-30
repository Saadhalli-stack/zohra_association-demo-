import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    emailjs
      .sendForm(
        "service_wavdb0b",  
        "template_cdg900q", 
        formRef.current,
        "uQTwWcjgcNbqPIN5D"      
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Message envoyé avec succès ✅");
          formRef.current.reset();
        },
        (error) => {
          console.log(error.text);
          setStatus("Erreur lors de l'envoi ❌");
        }
      );
  };

  return (
    <section className="contact-section">
      <h2 className="contact-title"> Contactez-nous</h2>
      <p className="contact-desc">
        Nous serons ravis de répondre à vos questions ou de collaborer avec vous.
      </p>

      <div className="contact-container">
      
        <div className="contact-info">
         <h3>Informations</h3>

  <p>
    <i className="fas fa-phone-alt"></i>{" "}
    <a href="tel:+212601647292">+212 6 01 64 72 92</a>
  </p>

  <p>
    <i className="fas fa-envelope"></i>{" "}
    <a href="mailto:ecolesdezohra@gmail.com">ecolesdezohra@gmail.com</a>
  </p>

  <p>
    <i className="fab fa-instagram"></i>{" "}
    <a href="https://www.instagram.com/ton_nom" target="_blank" rel="noopener noreferrer">Instagram</a>
  </p>

  <p>
    <i className="fab fa-facebook-f"></i>{" "}
    <a href="https://www.facebook.com/ton_nom" target="_blank" rel="noopener noreferrer">Facebook</a>
  </p>

  <p>
    <i className="fab fa-whatsapp"></i>{" "}
    <a href="https://wa.me/212601647292" target="_blank" rel="noopener noreferrer">WhatsApp</a>
  </p>
</div>


        <div className="contact-form">
          <h3>Envoyez-nous un message</h3>
          <form ref={formRef} onSubmit={sendEmail}>
            <input type="text" name="name" placeholder="Votre Nom" required />
            <input type="email" name="email" placeholder="Votre Email" required />
            <textarea name="message" placeholder="Votre Message" rows="5" required></textarea>
            <button type="submit" className="contact-btn">Envoyer</button>
          </form>
          {status && <p className="status-message">{status}</p>}
        </div>
      </div>

      <div className="contact-map">
        <iframe
          title="Localisation"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.276213843543!2d7.890486276604277!3d48.69394431526667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796d8b1d3b9b5e7%3A0x9d6a29dd7ebdb5a5!2s25%20Rue%20de%20l'Ancienne%20Eglise%2C%2067760%20Gambsheim%2C%20France!5e0!3m2!1sfr!2sma!4v1696357390999!5m2!1sfr!2sma"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
