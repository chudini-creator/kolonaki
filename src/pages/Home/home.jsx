import "./homeStyle.css";
import Hero from "../../components/hero/hero";
import ProductsGallery from "../../components/productsGallery/productsGallery";

const heroSlides = [
  {
    image: "/img/hero.jpg",
    tagline: "AUTENTYCZNA KUCHNIA GRECKA",
    title: "KOLONAKI",
    subtitle: "Tradycyjna oliwa",
    ctaText: "Zobacz produkty",
    ctaLink: "/produkty",
    secondaryCtaText: "Nasza historia",
    secondaryCtaLink: "/historia"
  },
  {
    image: "/img/hero-2.jpg",
    tagline: "ŚRÓDZIEMNOMORSKI KLIMAT",
    title: "POCZUJ KLIMAT ATEN WE WŁASNYM DOMU",
    subtitle: "Wyjątkowe produkty",
    ctaText: "Skontaktuj się z nami",
    ctaLink: "/kontakt",
    secondaryCtaText: "O mnie",
    secondaryCtaLink: "/o-mnie"
  },
  {
    image: "/img/hero-3.webp",
    tagline: "TRADYCYJNE RECEPTURY",
    title: "OLIWNA TRADYCJA",
    subtitle: "Oryginalne greckie produkty, oliwa tłoczona na zimno.",
    ctaText: "Przejdź do sklepu",
    ctaLink: "/sklep",
    secondaryCtaText: "Produkty",
    secondaryCtaLink: "/produkty"
  }
];

function Home() {
  return (
    <div className="homeContainer">
      <Hero
        slides={heroSlides}
        interval={5500}
        autoPlay={true}
        pauseOnHover={true}
        showControls={true}
        showIndicators={true}
        showProgressBar={true}
        showCounter={true}
      />
      <ProductsGallery />
      
    </div>
  );
}

export default Home;