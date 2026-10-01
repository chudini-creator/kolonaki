import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./productsGalleryStyle.css";

const PRODUCTS_GRID_DATA = [
  {
    id: "september-harvest",
    num: "01",
    name: "September Harvest",
    category: "Limited Edition",
    tagline: "Limitowany wrześniowy zbiór odmiany Manaki.",
    image: "/img/Produkty/Koroneiko.webp",
    watermark: "SEPTEMBER HARVEST",
    link: "/sklep"
  },
  {
    id: "manaki-early-harvest",
    num: "02",
    name: "Manaki Early Harvest",
    category: "Premium Edition",
    tagline: "Odmiana Manaki w wersji wczesnego zbioru.",
    image: "/img/Produkty/Manaki-2.webp",
    watermark: "MANAKI",
    link: "/sklep"
  },
  {
    id: "koroneiko-early-harvest",
    num: "03",
    name: "Koroneiko Early Harvest",
    category: "Premium Edition",
    tagline: "Klasyczna grecka odmiana w intensywnej odsłonie wczesnego zbioru.",
    image: "/img/Produkty/Koroneiko-2.webp",
    watermark: "KORONEIKO",
    link: "/sklep"
  },
  {
    id: "manaki-basic",
    num: "04",
    name: "Manaki",
    category: "Basic Edition",
    tagline: "Aksamitna i łagodna, z subtelnymi nutami dojrzałych owoców.",
    image: "/img/Produkty/Manaki.webp",
    watermark: "MANAKI",
    link: "/sklep"
  }
];

function ProductGridCard({ product }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
      transition: "transform 0.1s ease-out"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
    });
  };

  return (
    <div
      ref={cardRef}
      className="galleryCardWrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
    >

      <article className="galleryCard">

        <div className="cardHeader">
          <div className="cardHeaderLeft">
            <span className="cardNumber">{product.num}</span>
          </div>
        </div>

        <div className="cardVisualStage">
          <div className="visualAmbientGlow" />
          
          <div className="bottleImageContainer">
            <img
              src={product.image}
              alt={product.name}
              className="stageBottleImage"
              loading="lazy"
            />
          </div>

          <div className="bottlePedestal" />
        </div>

        <div className="cardFooter">
          <div className="cardTitles">
            <span className="cardCategory">{product.category}</span>
            <h3 className="cardProductName">{product.name}</h3>
            <p className="cardTagline">{product.tagline}</p>
          </div>

          <Link to={product.link} className="cardActionLink">
            <span>Odkryj</span>
            <div className="actionArrowWrap">
              <ArrowUpRight size={17} />
            </div>
          </Link>
        </div>
      </article>
    </div>
  );
}

function ProductsGallery() {
  return (
    <section className="productsGallerySection" aria-label="Kolekcja Oliwy Kolonaki">
      <div className="galleryContainer">
        
        <header className="gallerySectionHeader">

          <h2 className="gallerySectionTitle">
            Grecka Tradycja <br />
            <span>Kolekcja Oliw Extra Virgin</span>
          </h2>

          <p className="gallerySectionDescription">
            Cztery wyjątkowe wydania, wytłoczone na zimno z pojedynczych zbiorów
          </p>
        </header>

        <div className="galleryCardsGrid">
          {PRODUCTS_GRID_DATA.map((product) => (
            <ProductGridCard key={product.id} product={product} />
          ))}
        </div>

        <div className="galleryBottomCta">
          <Link to="/sklep" className="galleryMainShopBtn">
            <span>Zobacz kolekcję w sklepie</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ProductsGallery;
