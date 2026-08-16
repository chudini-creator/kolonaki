import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import "./headerStyle.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Track scroll position for dynamic background blur and shadow
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
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

  // Close on Escape key
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

  return (
    <header className={`siteHeader ${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menuOpen" : ""}`}>
      <div className="headerContainer">
        {/* Brand Logo */}
        <h1 className="logo">
          <Link to="/" onClick={closeMenu}>
            Kolonaki
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className="headerNav desktopNav" aria-label="Nawigacja główna">
          <ul className="navList">
            <li>
              <Link to="/about" className="navLink">
                O mnie
              </Link>
            </li>
            <li>
              <Link to="/products" className="navLink">
                Produkty
              </Link>
            </li>
            <li>
              <Link to="/story" className="navLink">
                Historia
              </Link>
            </li>
            <li>
              <Link to="/contact" className="navLink">
                Kontakt
              </Link>
            </li>
            <li id="shopHeadBut">
              <Link to="/shop" className="shopButton">
                <ShoppingBag size={18} className="shopIcon" />
                <span>Sklep</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
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

      {/* Mobile Backdrop */}
      <div
        className={`mobileBackdrop ${isMenuOpen ? "open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer / Dropdown */}
      <nav
        id="mobileNavigation"
        className={`mobileNav ${isMenuOpen ? "open" : ""}`}
        aria-label="Nawigacja mobilna"
      >
        <div className="mobileNavContent">
          <ul className="mobileNavList">
            <li>
              <Link to="/about" className="mobileNavLink" onClick={closeMenu}>
                O mnie
              </Link>
            </li>
            <li>
              <Link to="/products" className="mobileNavLink" onClick={closeMenu}>
                Produkty
              </Link>
            </li>
            <li>
              <Link to="/story" className="mobileNavLink" onClick={closeMenu}>
                Historia
              </Link>
            </li>
            <li>
              <Link to="/contact" className="mobileNavLink" onClick={closeMenu}>
                Kontakt
              </Link>
            </li>
          </ul>

          <div className="mobileShopContainer">
            <Link to="/shop" className="mobileShopButton" onClick={closeMenu}>
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