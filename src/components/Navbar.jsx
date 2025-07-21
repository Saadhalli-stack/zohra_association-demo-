
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; 
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (isActive, base = "") =>
    isActive ? `active ${base}`.trim() : base;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={logo} alt="Logo Écoles de Zohra" className="logo-img" />
        </div>

        <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${menuOpen ? "open" : ""}`}></span>
        </button>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li><NavLink to="/" end className={({ isActive }) => linkClass(isActive)} onClick={handleLinkClick}>Accueil</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => linkClass(isActive)} onClick={handleLinkClick}>À propos</NavLink></li>
          <li><NavLink to="/projects" className={({ isActive }) => linkClass(isActive)} onClick={handleLinkClick}>Nos événements</NavLink></li>
          <li><NavLink to="/gallery" className={({ isActive }) => linkClass(isActive)} onClick={handleLinkClick}>Galerie</NavLink></li>
          {/* <li><NavLink to="/partners" className={({ isActive }) => linkClass(isActive)} onClick={handleLinkClick}>Partenaires</NavLink></li> */}
          <li><NavLink to="/contact" className={({ isActive }) => linkClass(isActive)} onClick={handleLinkClick}>Contact</NavLink></li>
          <li><NavLink to="/donate" className={({ isActive }) => linkClass(isActive, "btn-donate")} onClick={handleLinkClick}>Faire un don</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
