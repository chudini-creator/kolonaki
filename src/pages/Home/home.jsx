import "./homeStyle.css";
import Hero from "../../components/hero/hero";
import ProductsGallery from "../../components/productsGallery/productsGallery";

const heroSlides = [
  {
    image: "/img/hero.jpg",
    tagline: "KOLONAKI • IATRIDIS ESTATE",
    title: "150 lat historii. Zamknięte w jednej butelce.",
    subtitle: "Autentyczna grecka oliwa extra virgin z rodzinnego gaju w sercu Peloponezu.",
    ctaText: "Przejdź do sklepu",
    ctaLink: "/sklep",
    secondaryCtaText: "Nasza historia",
    secondaryCtaLink: "/historia"
  },
  {
    image: "/img/hero-2.jpg",
    tagline: "RZEMIEŚLNICZA SELEKCJA",
    title: "Jeden gaj. Jeden zbiór. Wyjątkowy charakter.",
    subtitle: "Oliwa tłoczona na zimno we własnej tłoczni zaledwie kilka godzin po zbiorze.",
    ctaText: "Odkryj kolekcję",
    ctaLink: "/sklep",
    secondaryCtaText: "O mnie",
    secondaryCtaLink: "/o-mnie"
  },
  {
    image: "/img/hero-3.webp",
    tagline: "BEZKOMPROMISOWA JAKOŚĆ",
    title: "Nie każda oliwka zasługuje na to, by znaleźć się w butelce.",
    subtitle: "Ręczna selekcja owoców i dbałość o czystość surowca jeszcze przed opuszczeniem gaju.",
    ctaText: "Zobacz ofertę",
    ctaLink: "/sklep",
    secondaryCtaText: "Proces produkcji",
    secondaryCtaLink: "/historia"
  },
  {
    image: "/img/hero.jpg",
    tagline: "GRECKA TRADYCJA",
    title: "Prawdziwy smak Peloponezu.",
    subtitle: "Śródziemnomorska elegancja i naturalne polifenole na Twoim stole.",
    ctaText: "Kup teraz",
    ctaLink: "/sklep",
    secondaryCtaText: "Kontakt",
    secondaryCtaLink: "/kontakt"
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