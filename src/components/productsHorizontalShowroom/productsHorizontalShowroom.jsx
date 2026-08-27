import React, { useEffect, useRef } from "react";
import "./productsHorizontalShowroomStyle.css";

const PRODUCTS_DATA = [
  {
    id: "koroneiki-classic",
    name: "Oliwa Koroneiki Extra Virgin",
    variety: "Odmiana Koroneiki",
    tagline: "Intensywna, wyrazista i bogata w cenne polifenole",
    description:
      "Królowa greckich oliwek z regionu Peloponezu. Charakteryzuje się intensywnym, trawiastym bukietem aromatycznym i przyjemnie pieprznym finiszem. Tłoczona z oliwek zebranych w szczycie dojrzałości, zachowuje maksymalne stężenie antyoksydantów — tych samych związków, które od wieków czynią grecką oliwę synonimem zdrowia i długowieczności.",
    image: "/img/Produkty/Koroneiko.webp",
    acidity: "< 0,3%",
    harvest: "Listopad – Grudzień",
    origin: "Peloponez, Grecja",
    tastingNotes: ["Świeża trawa", "Zielony pieprz", "Karczoch", "Dzika oliwka"],
  },
  {
    id: "koroneiki-reserve",
    name: "Oliwa Koroneiki Reserve",
    variety: "Odmiana Koroneiki · Single Estate",
    tagline: "Wczesny zbiór z najstarszych drzew oliwnych w tubie ozdobnej",
    description:
      "Limitowana edycja z pojedynczego gaju oliwnego, gdzie wiekowe drzewa kryją w sobie ponadstuletnią pamięć ziemi. Tłoczona z wczesnych, zielonych oliwek (Agoureleo) — zanim dojrzeją do pełni — aby uchwycić maksimum polifenoli i aromat dzikości, która zanika wraz ze zmianą sezonu.",
    image: "/img/Produkty/Koroneiko-2.webp",
    acidity: "< 0,24%",
    harvest: "Październik (Wczesny Zbiór)",
    origin: "Single Estate · Peloponez",
    tastingNotes: ["Agoureleo", "Liść pomidora", "Młody migdał", "Dziki tymianek"],
  },
  {
    id: "manaki-classic",
    name: "Oliwa Manaki Extra Virgin",
    variety: "Odmiana Manaki",
    tagline: "Aksamitna, łagodna z nutami dojrzałych owoców i migdałów",
    description:
      "Rzadka i ceniona odmiana z regionu Argolidy. Wyróżnia się maślaną konsystencją, subtelną słodyczą dojrzałych jabłek i całkowitym brakiem cierpkości. To oliwa, która nie przekonuje siłą — ona uwodzi delikatnością. Idealna dla tych, którzy szukają elegancji bez kompromisów.",
    image: "/img/Produkty/Manaki.webp",
    acidity: "< 0,28%",
    harvest: "Grudzień – Styczeń",
    origin: "Argolida, Grecja",
    tastingNotes: ["Dojrzałe jabłko", "Słodki migdał", "Masło ziołowe", "Kwiaty cytrusów"],
  },
  {
    id: "manaki-reserve",
    name: "Oliwa Manaki Reserve",
    variety: "Odmiana Manaki · Single Estate",
    tagline: "Ekskluzywne wydanie w ozdobnej tubie kolekcjonerskiej",
    description:
      "Wyselekcjonowane zbiory z rodzinnego gaju w Argolidzie — miejsca, gdzie każda oliwka jest zbierana ręcznie, a każda butelka to wyraz troski o szczegół. Aksamitna struktura i urzekający, kwiatowo-owocowy bukiet tworzą oliwę przeznaczoną dla tych, którzy wiedzą czego szukają.",
    image: "/img/Produkty/Manaki-2.webp",
    acidity: "< 0,22%",
    harvest: "Grudzień (Selekcja Ręczna)",
    origin: "Single Estate · Argolida",
    tastingNotes: ["Kremowy migdał", "Morela", "Kwiat pomarańczy", "Lekkie zioła"],
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
