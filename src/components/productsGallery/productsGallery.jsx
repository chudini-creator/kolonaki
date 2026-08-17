import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Droplet } from "lucide-react";
import "./productsGalleryStyle.css";

const PRODUCTS_GRID_DATA = [
  {
    id: "koroneiki-classic",
    num: "01",
    name: "Koroneiko",
    category: "Oliwa Ekstra Dziewicza",
    tagline: "Królowa greckich oliwek o intensywnym aromacie.",
    image: "/img/Produkty/Koroneiko-2.webp",
    watermark: "KORONEIKO",
    link: "/products"
  },
  {
    id: "koroneiki-reserve",
    num: "02",
    name: "Manaki",
    category: "Edycja Prezentowa",
    tagline: "Limitowana selekcja z gajów oliwnych w eleganckiej tubie.",
    image: "/img/Produkty/Manaki-2.webp",
    watermark: "MANAKI",
    link: "/products"
  },
  {
    id: "manaki-classic",
    num: "03",
    name: "Limited edition September harvest",
    category: "Oliwa Ekstra Dziewicza",
    tagline: "Ekskluzywne wydanie z wrześniowego zbioru.",
    image: "/img/Produkty/Koroneiko.webp",
    watermark: "SEPTEMBER HARVEST",
    link: "/products"
  },
  {
    id: "manaki-reserve",
    num: "04",
    name: "Selected early harvest",
    category: "Edycja Prezentowa",
    tagline: "Ekskluzywne wydanie z późnego zbioru",
    image: "/img/Produkty/Manaki.webp",
    watermark: "MANAKI",
    link: "/products"
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
        <div className="cardWatermark" aria-hidden="true">
          {product.watermark}
        </div>

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
          <Link to="/shop" className="galleryMainShopBtn">
            <span>Zobacz kolekcję w sklepie</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ProductsGallery;
