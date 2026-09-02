import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
} from "lucide-react";
import "./footerStyle.css";

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="siteFooter" aria-label="Stopka strony">

      <div className="footerMainSection">
        <div className="footerMainContainer">

          <div className="footerCol brandCol">
            <Link to="/" onClick={scrollToTop} className="footerLogoLink">
              <span className="footerLogo">Kolonaki</span>
            </Link>
            <p className="footerBrandText">
              Autentyczna grecka oliwa z oliwek Extra Virgin z Peloponezu i Argolidy.
              Prawdziwe greckie złoto tłoczone metodami tradycyjnymi, bezpośrednio z rodzinnych gajów oliwnych.
            </p>

          </div>

          <div className="footerCol linksCol">
            <h4 className="footerColTitle">Nawigacja</h4>
            <ul className="footerLinksList">
              <li>
                <Link to="/" onClick={scrollToTop} className="footerLink">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link to="/o-nas" onClick={scrollToTop} className="footerLink">
                  O mnie
                </Link>
              </li>
              <li>
                <Link to="/produkty" onClick={scrollToTop} className="footerLink">
                  Produkty
                </Link>
              </li>
              <li>
                <Link to="/historia" onClick={scrollToTop} className="footerLink">
                  Historia
                </Link>
              </li>
              <li>
                <Link to="/sklep" onClick={scrollToTop} className="footerLink highlightLink">
                  Sklep Online
                </Link>
              </li>
              <li>
                <Link to="/kontakt" onClick={scrollToTop} className="footerLink">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div className="footerCol linksCol">
            <h4 className="footerColTitle">Kolekcja Oliw</h4>
            <ul className="footerLinksList">
              <li>
                <Link to="/produkty" onClick={scrollToTop} className="footerLink">
                  Manaki Early Harvest (500 ml)
                </Link>
              </li>
              <li>
                <Link to="/produkty" onClick={scrollToTop} className="footerLink">
                  Koroneiko Early Harvest (500 ml)
                </Link>
              </li>
              <li>
                <Link to="/produkty" onClick={scrollToTop} className="footerLink">
                  Manaki Selected Harvest (750 ml)
                </Link>
              </li>
              <li>
                <Link to="/produkty" onClick={scrollToTop} className="footerLink">
                  Manaki September Harvest (500 ml)
                </Link>
              </li>
            </ul>
          </div>

          <div className="footerCol contactCol">
            <h4 className="footerColTitle">Kontakt & Dystrybucja</h4>
            <div className="footerContactList">
              <a href="tel:+48605890987" className="footerContactItem">
                <Phone size={18} className="contactIcon" />
                <span>+48 605 890 987</span>
              </a>

              <a href="mailto:kontakt@kolonaki.pl" className="footerContactItem">
                <Mail size={18} className="contactIcon" />
                <span>kontakt@kolonaki.pl</span>
              </a>

            </div>
          </div>

        </div>
      </div>

      <div className="footerBottomStrip">
        <div className="footerBottomContainer">
          <p className="copyrightText">
            &copy; {new Date().getFullYear()} <strong>Igor Sobierajczyk</strong>. Wszelkie prawa zastrzeżone.
          </p>

          <div className="footerBottomLinks">
            <Link to="/kontakt" onClick={scrollToTop} className="legalLink">
              Dostawa i płatności
            </Link>
            <span className="dotDivider">&bull;</span>
            <Link to="/kontakt" onClick={scrollToTop} className="legalLink">
              Zwroty i reklamacje
            </Link>
            <span className="dotDivider">&bull;</span>
            <Link to="/kontakt" onClick={scrollToTop} className="legalLink">
              Polityka prywatności
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
