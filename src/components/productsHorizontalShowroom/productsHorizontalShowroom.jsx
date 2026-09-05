import React, { useEffect, useRef } from "react";
import "./productsHorizontalShowroomStyle.css";

const PRODUCTS_DATA = [
  {
    id: "september-harvest",
    name: "Oliwa Manaki September Harvest",
    variety: "Odmiana Manaki",
    tagline: "Intensywna, wyrazista i bogata w cenne polifenole",
    description:
      "Wyjątkowa oliwa z oliwek z pierwszego tłoczenia odmiany Manaki (z wrześniowych zbiorów) wyróżnia się intensywną owocowością, niską goryczką i średnią pikantnością. W jej profilu aromatycznym dominują nuty skoszonej trawy, pomidora i migdałów w aromatach niedojrzałych, natomiast banan, czerwone jabłko i owoce tropikalne w aromatach dojrzałych dopełniają złożoność smakową i aromatyczną, która sprawia, że oliwa ta tak bardzo się wyróżnia.",
    image: "/img/Produkty/Koroneiko.webp",
    acidity: "< 0,3%",
    harvest: "Listopad – Grudzień",
    origin: "Peloponez, Grecja",
    tastingNotes: ["Świeża trawa", "Pomidor", "Migdały", "Jabłko", "Banan", "Owoce tropikalne"],
  },
  {
    id: "manaki-early-harvest",
    name: "Oliwa Manaki Early Harvest",
    variety: "Odmiana Manaki",
    tagline: "Aksamitna, łagodna z nutami dojrzałych owoców i migdałów",
    description:
      "Oliwa z oliwek extra virgin z limitowanej edycji wczesnych zbiorów, odmiany Manaki, odznacza się słodkim charakterem o umiarkowanej owocowości oraz niskiej goryczce i pikantności. Jej profil aromatyczny uwydatnia nuty zielonych migdałów, dojrzałego banana i rumianku.",
    image: "/img/Produkty/Manaki-2.webp",
    acidity: "< 0,28%",
    harvest: "Grudzień – Styczeń",
    origin: "Argolida, Grecja",
    tastingNotes: ["Zielone migdały", "Banan", "Rumianek"],
  },
  {
    id: "koroneiko-early-harvest",
    name: "Oliwa Koroneiko Early Harvest",
    variety: "Odmiana Koroneiki",
    tagline: "Wczesny zbiór z najstarszych drzew oliwnych w tubie ozdobnej",
    description:
      "Oliwa z oliwek extra virgin odmiany Koroneiki charakteryzuje się zasadniczo zielonym i niedojrzałym profilem aromatycznym z intensywnymi nutami świeżo skoszonej trawy, karczocha, skórki pomidora i zielonej łupiny orzecha włoskiego, które stają się jeszcze wyrazistsze podczas degustacji. Średnia owocowość oraz wysoka goryczka i pikantność plasują ją w gronie oliw extra virgin o niezwykle silnym charakterze smakowym.",
    image: "/img/Produkty/Koroneiko-2.webp",
    acidity: "< 0,24%",
    harvest: "Październik (Wczesny Zbiór)",
    origin: "Peloponez",
    tastingNotes: ["Świeża trawa", "Karczoch", "Skórka pomidora", "Orzech Włoski"],
  },
  {
    id: "manaki",
    name: "Oliwa Manaki Selected Harvest",
    variety: "Odmiana Manaki",
    tagline: "Ekskluzywne wydanie w ozdobnej tubie kolekcjonerskiej",
    description:
      "Oliwa z oliwek extra virgin z wybranych zbiorów (Selected Harvest) odmiany Manaki dopełnia trylogię Iatridis Estate swoją dojrzałością oraz subtelnymi, słodkimi aromatami owoców tropikalnych i czerwonego jabłka. Jej celem jest to, by stać się codziennym dodatkiem do naszej diety śródziemnomorskiej.",
    image: "/img/Produkty/Manaki.webp",
    acidity: "< 0,22%",
    harvest: "Grudzień (Selekcja Ręczna)",
    origin: "Argolida",
    tastingNotes: ["Owoce tropikalne", "Czerwone jabłko"],
  },
];

function ProductsEditorial() {
  const sectionsRef = useRef([]);
  const imgSidesRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      imgSidesRef.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;

        const img = el.querySelector("img");
        if (img) {
          const scale = 1 + Math.abs(centerOffset) * 0.07;
          img.style.transform = `translateY(${centerOffset * 110}px) scale(${scale})`;
        }

        const num = el.querySelector(".psImgNumber");
        if (num) {
          num.style.transform = `translateY(${-centerOffset * 65}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                section.classList.add("psEntered");
                section.querySelectorAll(".psAnimate").forEach((el) => {
                  el.classList.add("psVisible");
                });
              });
            });
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.08 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="psWrapper">
      {PRODUCTS_DATA.map((product, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={product.id}
            ref={(el) => (sectionsRef.current[i] = el)}
            className={`psSection ${isEven ? "psEven" : "psOdd"}`}
            style={{ zIndex: i + 1 }}
          >
            <div className={`psSectionInner ${isEven ? "psRowNormal" : "psRowReverse"}`}>

              <div
                className="psImgSide"
                ref={(el) => (imgSidesRef.current[i] = el)}
              >
                <span className="psImgNumber" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="psImg"
                  loading="lazy"
                />
              </div>

              <div className="psTextSide">
                <div className="psTextInner">
                  <span className="psVariety psAnimate" style={{ "--d": "0.1s" }}>
                    {product.variety}
                  </span>
                  <h2 className="psName psAnimate" style={{ "--d": "0.2s" }}>
                    {product.name}
                  </h2>
                  <p className="psTagline psAnimate" style={{ "--d": "0.3s" }}>
                    {product.tagline}
                  </p>
                  <p className="psDesc psAnimate" style={{ "--d": "0.4s" }}>
                    {product.description}
                  </p>
                  <div className="psNotes psAnimate" style={{ "--d": "0.5s" }}>
                    <span className="psNotesLabel">Nuty aromatyczne</span>
                    <p className="psNotesList">
                      {product.tastingNotes.join(" — ")}
                    </p>
                  </div>
                  <div className="psMeta psAnimate" style={{ "--d": "0.6s" }}>
                    <span>{product.origin}</span>
                    <span className="psMetaSep" aria-hidden="true">·</span>
                    <span>{product.harvest}</span>
                    <span className="psMetaSep" aria-hidden="true">·</span>
                    <span>Kwasowość {product.acidity}</span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        );
      })}
    </div>
  );
}

export default ProductsEditorial;
