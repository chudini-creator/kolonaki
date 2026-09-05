import React, { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import "./historyStyle.css";

const CHAPTERS = [
  {
    id: "gaj",
    step: "01",
    subtitle: "Doliana · Arkadia · Grecja",
    title: "Gaj",
    description:
      "Początkiem każdej butelki jest gaj. Rodzina Iatridis uprawia tu oliwki od pokoleń — wśród drzew liczących sobie około 150 lat, w górskiej Doliana na Peloponezie.",
    keywords: ["150-letnie drzewa", "Własna uprawa", "Pełna kontrola surowca"],
    image: "/img/Gaj.jpg",
  },
  {
    id: "selekcja",
    step: "02",
    subtitle: "Manaki · Koroneiko",
    title: "Selekcja",
    description:
      "Nie wszystkie oliwki zasługują na tę samą butelkę. Każda partia selekcjonowana jest według odmiany, momentu zbioru i oczekiwanego profilu sensorycznego — decyzje podejmowane jeszcze w gaju.",
    keywords: ["Dwie odmiany", "Profil sensoryczny", "Każda partia wyjątkowa"],
    image: "/img/hero-3.webp",
  },
  {
    id: "zbior",
    step: "03",
    subtitle: "Wrzesień · Październik",
    title: "Zbiór",
    description:
      "Wczesny zbiór to świadomy wybór. Oliwki zbierane przed pełną dojrzałością zawierają więcej polifenoli. Iatridis Estate rezygnuje z pojazdów spalinowych — żeby żaden kontakt ze spalinami nie naruszył czystości owoców.",
    keywords: ["Wczesny zbiór", "Zero spalin", "Czystość sensoryczna"],
    image: "/img/hero-2.jpg",
  },
  {
    id: "tlocznia",
    step: "04",
    subtitle: "Kilka godzin od drzewa do oleju",
    title: "Tłocznia",
    description:
      "Własna tłocznia, kilka godzin od zbioru do tłoczenia na zimno. Każda odmiana na osobnej linii — przed kolejną partią cała linia produkcyjna jest dokładnie czyszczona. Zero przypadkowych mieszanek.",
    keywords: ["Własna tłocznia", "Zimne tłoczenie ≤27°C", "Osobna linia"],
    image: "/img/hero.jpg",
  },
  {
    id: "oliwa",
    step: "05",
    subtitle: "Limitowane serie · 500 ml",
    title: "Gotowa Oliwa",
    description:
      "W butelce zamknięty jest cały ten proces. Wyselekcjonowane partie trafiają do limitowanych edycji z pełną identyfikacją zbioru. Każda butelka to wyraz troski o każdy szczegół.",
    keywords: ["Limitowane edycje", "Identyfikacja zbioru", "Bez kompromisów"],
    image: "/img/Produkty/Koroneiko.webp",
  },
];

function History() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visitedSections, setVisitedSections] = useState(new Set([0]));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const idx = Math.min(
        CHAPTERS.length - 1,
        Math.max(0, Math.floor(window.scrollY / window.innerHeight))
      );
      setActiveIndex(idx);
      setVisitedSections((prev) => {
        if (prev.has(idx)) return prev;
        return new Set([...prev, idx]);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = useCallback((index) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  const progressWidth = `${((activeIndex + 1) / CHAPTERS.length) * 100}%`;

  return (
    <div className="historyPage">
      <Helmet>
        <title>Historia • Kolonaki | Iatridis Estate</title>
        <meta
          name="description"
          content="Poznaj historię i filozofię Iatridis Estate — od 150-letnich gajów w Doliana, przez selekcję i wczesny zbiór, aż po własną tłocznię i butelkowanie."
        />
      </Helmet>

      <div className="chWrapper" style={{ height: `${CHAPTERS.length * 100}vh` }}>
        {CHAPTERS.map((chapter, i) => {
          const isVisited = visitedSections.has(i);

          return (
            <section
              key={chapter.id}
              className={`chSection ${isVisited ? "chActive" : ""}`}
              style={{ zIndex: i + 1 }}
            >
              <div className="chLeft">
                <span className="chBigNumber" aria-hidden="true">
                  {chapter.step}
                </span>

                <div className="chContent">
                  <span className="chEyebrow">{chapter.subtitle}</span>
                  <h2 className="chTitle">{chapter.title}</h2>
                  <p className="chDesc">{chapter.description}</p>
                  <div className="chKeywords">
                    {chapter.keywords.map((kw, idx) => (
                      <React.Fragment key={idx}>
                        <span className="chKeyword">{kw}</span>
                        {idx < chapter.keywords.length - 1 && (
                          <span className="chKeywordSep" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="chBottom">
                  <div className="chDots">
                    {CHAPTERS.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        className={`chDot ${activeIndex === dotIdx ? "chDotActive" : ""}`}
                        onClick={() => scrollToChapter(dotIdx)}
                        aria-label={`Przejdź do rozdziału ${dotIdx + 1}: ${CHAPTERS[dotIdx].title}`}
                      />
                    ))}
                  </div>
                  <div className="chProgress" role="progressbar" aria-valuenow={activeIndex + 1} aria-valuemax={CHAPTERS.length}>
                    <div className="chProgressFill" style={{ width: progressWidth }} />
                  </div>
                  <span className="chCounter" aria-live="polite">
                    {String(activeIndex + 1).padStart(2, "0")}
                    <span className="chCounterSep">/</span>
                    {String(CHAPTERS.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="chRight">
                <img
                  src={chapter.image}
                  alt=""
                  className="chRightImg"
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default History;
