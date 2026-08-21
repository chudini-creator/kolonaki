import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Phone,
  Mail,
  MapPin,
  Copy,
  Check,
  Send,
  Briefcase,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import PageHero from "../../components/pageHero/pageHero";
import "./contactStyle.css";

const INQUIRY_TYPES = [
  { id: "order", label: "Zamówienie i dostawa", icon: ShoppingBag },
  { id: "b2b", label: "Współpraca B2B & Gastro", icon: Briefcase },
];

const FAQ_DATA = [
  {
    question: "Jak zabezpieczacie szklane butelki przed stłuczeniem?",
    answer: "Wszystkie butelki pakujemy w certyfikowane, wielowarstwowe rękawy powietrzne i grube kartony amortyzujące. Mamy 99.8% wskaźnik bezpiecznych dostaw szkła."
  },
  {
    question: "W jakim czasie realizowana jest wysyłka zamówień?",
    answer: "Zamówienia złożone do godziny 14:00 w dni robocze nadajemy tego samego dnia. Dostawa kurierem DPD lub do Paczkomatu InPost zajmuje zazwyczaj 24–48 godzin."
  },
  {
    question: "Czy oferujecie warunki hurtowe dla gastronomii i firm?",
    answer: "Tak! Prowadzimy regularne dostawy oliw do cenionych restauracji, pizzerii i sklepów delikatesowych w całej Polsce. Przygotowujemy również personalizowane zestawy upominkowe dla firm."
  },
  {
    question: "Jakie są koszty wysyłki i próg darmowej dostawy?",
    answer: "Dla zamówień powyżej 200 zł dostawa na terenie całej Polski jest bezpłatna. Poniżej tej kwoty koszt wysyłki wynosi 14,99 zł (Paczkomaty) lub 16,99 zł (Kurier)."
  }
];

function Contact() {
  const [inquiryType, setInquiryType] = useState("order");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        orderNumber: "",
        message: ""
      });
    }, 900);
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="contactPage">
      <Helmet>
        <title>Kontakt • Kolonaki | Sklep z Grecką Oliwą</title>
        <meta
          name="description"
          content="Skontaktuj się z obsługą sklepu Kolonaki. Pytania o zamówienia online, hurtowe dostawy B2B i rzemieślnicze oliwy z Grecji."
        />
      </Helmet>

      <PageHero
        title="KONTAKT"
        description="Masz pytania dotyczące naszych oliw, statusu zamówienia lub współpracy B2B? Jesteśmy do Twojej dyspozycji."
      />

      <div className="contactMainContainer">
        
        <section className="contactGridSection">
          
          <div className="contactFormCard">
            <div className="formHeader">
              <span className="formBadge">Napisz do nas</span>
              <h2 className="formTitle">Formularz kontaktowy</h2>
              <p className="formSubtitle">
                Wypełnij formularz – odpowiadamy zazwyczaj w ciągu kilku godzin.
              </p>
            </div>

            <div className="inquiryTypeSelector" role="tablist" aria-label="Wybierz temat wiadomości">
              {INQUIRY_TYPES.map((type) => {
                const IconComponent = type.icon;
                const isActive = inquiryType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`inquiryTypeBtn ${isActive ? "active" : ""}`}
                    onClick={() => setInquiryType(type.id)}
                  >
                    <IconComponent size={16} />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {isSubmitted ? (
              <div className="formSuccessState">
                <div className="successIconWrap">
                  <Check size={32} />
                </div>
                <h3>Wiadomość została wysłana!</h3>
                <p>
                  Dziękujemy za kontakt. Nasz zespół odpowie na podany adres e-mail najszybciej jak to możliwe (zazwyczaj do 24h w dni robocze).
                </p>
                <button
                  type="button"
                  className="sendAnotherBtn"
                  onClick={() => setIsSubmitted(false)}
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contactForm">
                <div className="formRow dualRow">
                  <div className="formGroup">
                    <label htmlFor="name" className="formLabel">
                      Imię i nazwisko <span className="reqStar">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="np. Jan Kowalski"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="formInput"
                    />
                  </div>

                  <div className="formGroup">
                    <label htmlFor="email" className="formLabel">
                      Adres e-mail <span className="reqStar">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="np. jan@kowalski.pl"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="formInput"
                    />
                  </div>
                </div>

                <div className="formRow dualRow">
                  <div className="formGroup">
                    <label htmlFor="phone" className="formLabel">
                      Numer telefonu (opcjonalnie)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+48 ___ ___ ___"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="formInput"
                    />
                  </div>

                  {inquiryType === "order" ? (
                    <div className="formGroup">
                      <label htmlFor="orderNumber" className="formLabel">
                        Numer zamówienia (opcjonalnie)
                      </label>
                      <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        placeholder="np. #KOL-1042"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        className="formInput"
                      />
                    </div>
                  ) : (
                    <div className="formGroup">
                      <label htmlFor="orderNumber" className="formLabel">
                        Nazwa firmy (opcjonalnie)
                      </label>
                      <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        placeholder="np. Restauracja / Delikatesy"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        className="formInput"
                      />
                    </div>
                  )}
                </div>

                <div className="formGroup">
                  <label htmlFor="message" className="formLabel">
                    Treść wiadomości <span className="reqStar">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="W czym możemy Ci pomóc? Opisz swoje zapytanie..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="formTextarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`submitFormBtn ${isSubmitting ? "submitting" : ""}`}
                >
                  {isSubmitting ? (
                    <span>Wysyłanie wiadomości...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Wyślij wiadomość</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="contactSideContent">
            
            <div className="quickContactGrid">
              
              <div className="contactCardItem">
                <div className="cardIconWrap">
                  <Phone size={22} />
                </div>
                <div className="cardTextWrap">
                  <span className="cardMiniLabel">Infolinia i zamówienia</span>
                  <a href="tel:+48605890987" className="cardMainLink">
                    +48 605 890 987
                  </a>
                </div>
                <button
                  type="button"
                  className="copyActionBtn"
                  onClick={() => handleCopy("+48605890987", "phone")}
                  aria-label="Kopiuj numer telefonu"
                  title="Kopiuj numer"
                >
                  {copiedField === "phone" ? <Check size={16} className="copiedCheck" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="contactCardItem">
                <div className="cardIconWrap">
                  <Mail size={22} />
                </div>
                <div className="cardTextWrap">
                  <span className="cardMiniLabel">Napisz bezpośrednio</span>
                  <a href="mailto:kolonaki@kontakt.pl" className="cardMainLink">
                    kolonaki@kontakt.pl
                  </a>
                </div>
                <button
                  type="button"
                  className="copyActionBtn"
                  onClick={() => handleCopy("kolonaki@kontakt.pl", "email")}
                  aria-label="Kopiuj adres email"
                  title="Kopiuj email"
                >
                  {copiedField === "email" ? <Check size={16} className="copiedCheck" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="contactCardItem addressCard">
                <div className="cardIconWrap">
                  <MapPin size={22} />
                </div>
                <div className="cardTextWrap">
                  <span className="cardMiniLabel">Siedziba</span>
                  <span className="cardAddressText">
                    ul. Tymienieckiego 24C, 90-349 Łódź
                  </span>
                </div>
                <button
                  type="button"
                  className="copyActionBtn"
                  onClick={() => handleCopy("ul. Tymienieckiego 24C, 90-349 Łódź", "address")}
                  aria-label="Kopiuj adres"
                  title="Kopiuj adres"
                >
                  {copiedField === "address" ? <Check size={16} className="copiedCheck" /> : <Copy size={16} />}
                </button>
              </div>

            </div>

            <div className="styledMapWrapper">
              <div className="mapFloatingBadge">
                <span className="mapPinPulse" />
                <div className="mapBadgeText">
                  <strong>Kolonaki</strong>
                  <span>Łódź, ul. Tymienieckiego 24C</span>
                </div>
              </div>

              <iframe
                title="Lokalizacja siedziby Kolonaki"
                width="100%"
                height="280"
                src="https://www.openstreetmap.org/export/embed?bbox=19.468932151794437%2C51.75223428623943%2C19.486398696899418%2C51.7580521536215&amp;layer=mapnik"
                className="mapIframe"
                loading="lazy"
              />
            </div>

          </div>

        </section>

        <section className="contactFaqSection">
          <div className="faqSectionHeader">
            <span className="faqBadge">Często zadawane pytania</span>
            <h2 className="faqTitle">Wszystko o zakupach i dostawie</h2>
          </div>

          <div className="faqAccordionList">
            {FAQ_DATA.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`faqItem ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faqQuestionBtn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faqQuestionText">{item.question}</span>
                    <ChevronDown size={20} className={`faqArrow ${isOpen ? "rotated" : ""}`} />
                  </button>

                  <div className="faqAnswerWrapper">
                    <p className="faqAnswerText">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Contact;