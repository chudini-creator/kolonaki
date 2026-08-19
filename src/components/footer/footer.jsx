import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Droplet,
  Sparkles,
  Check,
  Truck
} from "lucide-react";
import "./footerStyle.css";

function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

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
                <Link to="/sklep" onClick={scrollToTop} className="footerLink">
                  Koroneiki Extra Virgin (500 ml)
                </Link>
              </li>
              <li>
                <Link to="/sklep" onClick={scrollToTop} className="footerLink">
                  Koroneiki Reserve Edition (Tuba)
                </Link>
              </li>
              <li>
                <Link to="/sklep" onClick={scrollToTop} className="footerLink">
                  Manaki Extra Virgin (500 ml)
                </Link>
              </li>
              <li>
                <Link to="/sklep" onClick={scrollToTop} className="footerLink">
                  Manaki Reserve Edition (Tuba)
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

              <a href="mailto:kolonaki@kontakt.pl" className="footerContactItem">
                <Mail size={18} className="contactIcon" />
                <span>kolonaki@kontakt.pl</span>
              </a>

              <div className="footerContactItem addressItem">
                <MapPin size={18} className="contactIcon" />
                <div>
                  <span>ul. Tymienieckiego 24C</span>
                  <span className="subAddress">90-349 Łódź &bull; Wysyłka cała Polska</span>
                </div>
              </div>

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
