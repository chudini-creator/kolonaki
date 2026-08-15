import "./headerStyle.css";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="siteHeader">
      <div className="headerContainer">
        <h1 className="logo">
          <Link to="/">Kolonaki</Link>
        </h1>
        <nav className="headerNav">
          <ul className="navList">
            <li><Link to="/about" className="navLink">O mnie</Link></li>
            <li><Link to="/products" className="navLink">Produkty</Link></li>
            <li><Link to="/story" className="navLink">Historia</Link></li>
            <li><Link to="/contact" className="navLink">Kontakt</Link></li>
            <li id="shopHeadBut">
              <Link to="/shop" className="shopButton">Sklep</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;