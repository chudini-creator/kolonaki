import React, { useEffect, useRef } from "react";
import "./productsHorizontalShowroomStyle.css";

const PRODUCTS_DATA = [
  {
    id: "september-harvest",
    name: "September Harvest",
    variety: "Odmiana Manaki • Wrześniowy Zbiór",
    tagline: "Limitowany wrześniowy zbiór odmiany Manaki",
    description:
      "Wyjątkowa oliwa extra virgin o intensywnej owocowości, niskiej goryczy i średniej pikantności. Jej złożony profil łączy aromaty świeżo skoszonej trawy, pomidora i migdałów z nutami banana, czerwonego jabłka i owoców tropikalnych. Tłoczona na zimno z oliwek zbieranych już we wrześniu, zaledwie kilka godzin po zbiorze. Naturalnie zawiera polifenole oraz inne związki bioaktywne i cenne składniki odżywcze.",
    image: "/img/Produkty/Koroneiko.webp",
    acidity: "< 0,20%",
    harvest: "Wrzesień",
    origin: "Dolina Arkadii, Peloponez",
    tastingNotes: ["Świeżo skoszona trawa", "Pomidor", "Migdały", "Banan", "Czerwone jabłko", "Owoce tropikalne"],
  },
  {
    id: "manaki-early-harvest",
    name: "Manaki Early Harvest",
    variety: "Odmiana Manaki",
    tagline: "Odmiana Manaki w wersji wczesnego zbioru",
    description:
      "Elegancka oliwa extra virgin o umiarkowanej owocowości, niskiej goryczy i delikatnej pikantności. Jej subtelny profil aromatyczny łączy nuty zielonego migdała, dojrzałego banana i rumianku. Tłoczona na zimno z wcześnie zbieranych oliwek, zaledwie kilka godzin po zbiorze. Naturalnie zawiera polifenole oraz inne związki bioaktywne i cenne składniki odżywcze.",
    image: "/img/Produkty/Manaki-2.webp",
    acidity: "< 0,28%",
    harvest: "Wrzesień – Październik",
    origin: "Dolina Arkadii, Peloponez",
    tastingNotes: ["Zielony migdał", "Dojrzały banan", "Rumianek"],
  },
  {
    id: "koroneiko-early-harvest",
    name: "Koroneiko Early Harvest",
    variety: "Odmiana Koroneiki",
    tagline: "Klasyczna grecka odmiana w intensywnej odsłonie wczesnego zbioru",
    description:
      "Wyrazista oliwa extra virgin o zielonym charakterze, zdecydowanej goryczy i przyjemnie pikantnym finiszu. W jej aromacie dominują świeżo skoszona trawa, karczoch, skórka pomidora i zielonego orzecha. Tłoczona na zimno z wcześnie zbieranych oliwek, zaledwie kilka godzin po zbiorze. Naturalnie zawiera polifenole oraz inne związki bioaktywne i cenne składniki odżywcze.",
    image: "/img/Produkty/Koroneiko-2.webp",
    acidity: "< 0,24%",
    harvest: "Październik – Listopad",
    origin: "Dolina Arkadii, Peloponez",
    tastingNotes: ["Świeżo skoszona trawa", "Karczoch", "Skórka pomidora", "Zielony orzech"],
  },
  {
    id: "manaki",
    name: "Manaki",
    variety: "Odmiana Manaki",
    tagline: "Aksamitna i łagodna, z subtelnymi nutami dojrzałych owoców",
    description:
      "Delikatna oliwa extra virgin z odmiany Manaki, powstająca z regularnego, całorocznego zbioru, bez selekcji charakterystycznej dla limitowanych edycji Early Harvest. Jej łagodny profil z subtelnymi nutami owoców tropikalnych i czerwonego jabłka sprawia, że jest doskonałą propozycją na początek przygody z wysokiej jakości oliwą oraz dla osób preferujących mniej intensywne smaki. To podstawowa linia Iatridis Estate stworzona do codziennego wykorzystania w kuchni śródziemnomorskiej. Naturalnie zawiera polifenole oraz inne związki bioaktywne i cenne składniki odżywcze.",
    image: "/img/Produkty/Manaki.webp",
    acidity: "< 0,22%",
    harvest: "Całoroczny",
    origin: "Dolina Arkadii, Peloponez",
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
