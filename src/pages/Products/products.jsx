import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ProductsEditorial from "../../components/productsHorizontalShowroom/productsHorizontalShowroom";
import "./productsStyle.css";

function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="productsPage">
      <Helmet>
        <title>Produkty • Kolonaki | Oliwa Extra Virgin z Grecji</title>
        <meta
          name="description"
          content="Poznaj nasze cztery wyjątkowe oliwy Extra Virgin — odmiany Koroneiki i Manaki z Peloponezu i Argolidy. Klasyczne butelki i limitowane edycje kolekcjonerskie."
        />
      </Helmet>

      <div className="productsPageHero">
        <h1 className="productsPageTitle">Nasze Produkty</h1>
        <p className="productsPageSubtitle">
          Cztery oliwy, cztery charaktery — każda z własną historią, profilem smakowym i duszą greckiego gaju.
        </p>
        <div className="productsScrollIndicator" aria-hidden="true">
          <div className="productsScrollLine" />
        </div>
      </div>

      <ProductsEditorial />
    </div>
  );
}

export default Products;
