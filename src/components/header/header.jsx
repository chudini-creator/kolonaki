import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import "./headerStyle.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isHome = location.pathname === "/";

  return (
    <header className={`siteHeader ${isHome ? "onHome" : "onSubpage"} ${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menuOpen" : ""}`}>
      <div className="headerContainer">
        
        <h1 className="logo">
          <Link to="/" onClick={closeMenu}>
            Kolonaki
          </Link>
        </h1>

        <nav className="headerNav desktopNav" aria-label="Nawigacja główna">
          <ul className="navList">
            <li>
              <Link to="/o-mnie" className="navLink">
                O mnie
              </Link>
            </li>
            <li>
              <Link to="/produkty" className="navLink">
                Produkty
              </Link>
            </li>
            <li>
              <Link to="/historia" className="navLink">
                Historia
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="navLink">
                Kontakt
              </Link>
            </li>
            <li id="shopHeadBut">
              <Link to="/sklep" className="shopButton">
                <ShoppingBag size={18} className="shopIcon" />
                <span>Sklep</span>
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className={`hamburgerButton ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobileNavigation"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`mobileBackdrop ${isMenuOpen ? "open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav
        id="mobileNavigation"
        className={`mobileNav ${isMenuOpen ? "open" : ""}`}
        aria-label="Nawigacja mobilna"
      >
        <div className="mobileNavContent">
          <ul className="mobileNavList">
            <li>
              <Link to="/o-nas" className="mobileNavLink" onClick={closeMenu}>
                O mnie
              </Link>
            </li>
            <li>
              <Link to="/produkty" className="mobileNavLink" onClick={closeMenu}>
                Produkty
              </Link>
            </li>
            <li>
              <Link to="/historia" className="mobileNavLink" onClick={closeMenu}>
                Historia
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="mobileNavLink" onClick={closeMenu}>
                Kontakt
              </Link>
            </li>
          </ul>

          <div className="mobileShopContainer">
            <Link to="/sklep" className="mobileShopButton" onClick={closeMenu}>
              <ShoppingBag size={20} />
              <span>Przejdź do sklepu</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;