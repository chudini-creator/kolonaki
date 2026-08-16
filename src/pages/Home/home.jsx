import "./homeStyle.css";
import Hero from "../../components/hero/hero";

const heroSlides = [
  {
    image: "/img/hero.jpg",
    tagline: "AUTENTYCZNA KUCHNIA GRECKA",
    title: "KOLONAKI",
    subtitle: "Tradycyjna oliwa",
    ctaText: "Odkryj menu",
    ctaLink: "/products",
    secondaryCtaText: "Nasza historia",
    secondaryCtaLink: "/story"
  },
  {
    image: "/img/hero-2.jpg",
    tagline: "ŚRÓDZIEMNOMORSKI KLIMAT",
    title: "POCZUJ KLIMAT ATEN",
    subtitle: "Wyjątkowa atmosfera",
    ctaText: "Zarezerwuj stolik",
    ctaLink: "/contact",
    secondaryCtaText: "O nas",
    secondaryCtaLink: "/about"
  },
  {
    image: "/img/hero-3.webp",
    tagline: "TRADYCYJNE RECEPTURY",
    title: "SMAKI Z OLIWNEGO GAJU",
    subtitle: "Oryginalne greckie produkty, oliwa tłoczona na zimno.",
    ctaText: "Przejdź do sklepu",
    ctaLink: "/shop",
    secondaryCtaText: "Produkty",
    secondaryCtaLink: "/products"
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
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nesciunt? Debitis minus doloremque distinctio, impedit ullam odit possimus vel magni deserunt natus porro perspiciatis laboriosam ipsum. Incidunt accusantium voluptatem quidem quam aperiam cumque beatae molestiae nihil, maxime possimus perspiciatis est itaque delectus ullam natus odit deleniti qui aspernatur facere officiis aliquam. Sed unde ad illum voluptas porro aut sequi minus voluptatem asperiores nemo deleniti eaque, deserunt quos fuga nihil. Maxime!</p>
      </div>
    </div>
  );
}

export default Home;