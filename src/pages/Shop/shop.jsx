import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, ExternalLink, Sparkles, Store, ShieldCheck, RefreshCw } from "lucide-react";
import ProductsShowcase from "../../components/productsShowcase/productsShowcase";
import PageHero from "../../components/pageHero/pageHero";
import "./shopStyle.css";

const PARTNERS_DATA = [
  {
    id: "partner-1",
    name: "Partner 1",
    city: "Warszawa",
    address: "ul. Mokotowska 12",
    badge: "Restauracja",
    url: "https://instagram.com",
    logoText: "DŚ",
    logoImage: null,
  },
  {
    id: "partner-2",
    name: "Partner 2",
    city: "Łódź",
    address: "ul. Floriańska 28",
    badge: "Bistro",
    url: "https://instagram.com",
    logoText: "BP",
    logoImage: null,
  },
  {
    id: "partner-3",
    name: "Partner 3",
    city: "Kraków",
    address: "Rynek 15",
    badge: "Degustacje & Wine Bar",
    url: "https://instagram.com",
    logoText: "ES",
    logoImage: null,
  },
];

function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shopPage">
      <Helmet>
        <title>Sklep • Kolonaki | Autentyczna Grecka Oliwa Extra Virgin</title>
        <meta
          name="description"
          content="Kup autentyczną grecką oliwę z oliwek Extra Virgin z Peloponezu. Sprawdź także punkty stacjonarne i restauracje partnerskie, w których możesz spróbować naszych oliw."
        />
      </Helmet>

      <PageHero
        title="Grecka Oliwa Extra Virgin"
        description="Rzemieślnicza oliwa tłoczona na zimno w dolinie Arkadii z wyselekcjonowanych odmian Koroneiki i Manaki. Wybierz butelkę dla siebie lub odwiedź nasze punkty stacjonarne."
      >
        <div className="shopPerksGrid">
          <div className="perkItem">
            <ShieldCheck size={18} className="perkIcon" />
            <span>100% Certyfikowane Pochodzenie</span>
          </div>
          <div className="perkItem">
            <RefreshCw size={18} className="perkIcon" />
            <span>Pancernie pakowane butelki</span>
          </div>
        </div>
      </PageHero>

      <section className="partnersSection">
        <div className="partnersContainer">
          <div className="partnersHeader">
            <span className="partnersKicker">Dostępne również stacjonarnie</span>
            <p className="partnersDescription">
              Spróbuj i kup nasze oliwy w wyselekcjonowanych delikatesach i restauracjach partnerskich:
            </p>
          </div>

          <div className="partnersLogoRow">
            {PARTNERS_DATA.map((partner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="partnerLogoItem"
                title={`${partner.name} (${partner.city}) – kliknij, aby przejść do strony partnera`}
              >
                {partner.logoImage ? (
                  <img
                    src={partner.logoImage}
                    alt={partner.name}
                    className="partnerBrandLogo"
                  />
                ) : (
                  <span className="partnerBrandText">
                    {partner.name}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      <main className="shopMainContent">
        <ProductsShowcase showHeader={false} />
      </main>
    </div>
  );
}

export default Shop;
