import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import ProductsShowcase from "../../components/productsShowcase/productsShowcase";
import "./shopStyle.css";

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
          content="Kup autentyczną grecką oliwę z oliwek Extra Virgin z Peloponezu. Odmiany Koroneiki i Manaki tłoczone na zimno. Bezpieczna i szybka dostawa."
        />
      </Helmet>

      <section className="shopHero">
        <div className="shopHeroContainer">

          <h1 className="shopHeroTitle">
            Grecka Oliwa Extra Virgin
          </h1>

          <p className="shopHeroDescription">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio aperiam culpa, aut voluptas accusantium iste magnam tempora aliquid molestiae illo maiores mollitia repellat iure quidem recusandae iusto vel numquam ab earum saepe labore cum laudantium ea sit? Alias, beatae consequatur.
          </p>

          <div className="shopPerksGrid">
            <div className="perkItem">
              <Truck size={18} className="perkIcon" />
              <span>Darmowa dostawa od 200 zł</span>
            </div>
            <div className="perkItem">
              <ShieldCheck size={18} className="perkIcon" />
              <span>100% Certyfikowane Pochodzenie</span>
            </div>
            <div className="perkItem">
              <RefreshCw size={18} className="perkIcon" />
              <span>Pancernie pakowane butelki</span>
            </div>
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
