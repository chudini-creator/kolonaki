import React, { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import "./historyStyle.css";

const CHAPTERS = [
  {
    id: "gaj",
    step: "01",
    subtitle: "Doliana · Arkadia · Grecja",
    title: "Gaj",
    lead: "Każda butelka Iatridis Estate ma swój początek w gaju.",
    paragraphs: [
      "W górskiej Dolianie, położonej w Arkadii na Peloponezie, rodzina Iatridis od pokoleń uprawia oliwki, dbając o drzewa, z których część liczy około 150 lat. To właśnie tutaj, w rytmie kolejnych sezonów, dojrzewają owoce odmian Manaki i Koroneiko, z których powstają oliwy Iatridis Estate.",
      "Podczas zbiorów wykorzystanie pojazdów i urządzeń spalinowych w gaju ograniczane jest do minimum. Tam, gdzie jest to możliwe, stosowany jest sprzęt elektryczny, aby ograniczyć kontakt zbieranych owoców ze spalinami i innymi potencjalnymi źródłami zanieczyszczeń. Dbałość o czystość surowca zaczyna się więc jeszcze przed opuszczeniem gaju.",
    ],
    image: "/img/Gaj.jpg",
  },
  {
    id: "selekcja",
    step: "02",
    subtitle: "Manaki · Koroneiko",
    title: "Selekcja",
    lead: "Nie wszystkie oliwki zasługują na to, by znaleźć się w butelce.",
    paragraphs: [
      "Jakość oliwy zaczyna się jeszcze w gaju. Każda partia owoców jest starannie selekcjonowana pod względem odmiany, momentu zbioru i oczekiwanego profilu sensorycznego. To właśnie tutaj podejmowane są pierwsze decyzje, które później definiują charakter każdej oliwy Iatridis Estate.",
    ],
    image: "/img/hero-3.webp",
  },
  {
    id: "zbior",
    step: "03",
    subtitle: "Wrzesień · Październik",
    title: "Zbiór",
    lead: "Moment zbioru nie jest przypadkiem — to jedna z najważniejszych decyzji kształtujących charakter oliwy.",
    paragraphs: [
      "Iatridis Estate rozpoczyna zbiory jeszcze przed osiągnięciem przez owoce pełnej dojrzałości. Wczesny zbiór sprzyja zachowaniu naturalnie występujących w oliwkach polifenoli i pozwala uzyskać charakterystyczny, wyrazisty profil sensoryczny. Podczas zbiorów producent rezygnuje z pojazdów spalinowych w gaju, ograniczając kontakt świeżo zebranych owoców ze spalinami.",
    ],
    image: "/img/hero-2.jpg",
  },
  {
    id: "tlocznia",
    step: "04",
    subtitle: "Kilka godzin od drzewa do oleju",
    title: "Tłocznia",
    lead: "Od zebrania owoców do tłoczenia mijają zaledwie godziny.",
    paragraphs: [
      "Oliwki trafiają bezpośrednio do własnej tłoczni Iatridis Estate, gdzie są przetwarzane na zimno. Każda odmiana i wyselekcjonowana partia tłoczona jest oddzielnie, a przed rozpoczęciem kolejnego procesu cała linia produkcyjna jest dokładnie czyszczona. Dzięki temu zachowany zostaje indywidualny charakter każdej oliwy — bez przypadkowego mieszania poszczególnych partii.",
      "Świeżo wytłoczona oliwa nie czeka miesiącami w zbiornikach. Każdego roku, bezpośrednio po zakończeniu procesu, trafia do szklanych butelek, zachowując charakter konkretnego zbioru i wyselekcjonowanej partii.",
    ],
    image: "/img/hero.jpg",
  },
  {
    id: "oliwa",
    step: "05",
    subtitle: "Limitowane serie · Iatridis Estate",
    title: "Gotowa oliwa",
    lead: "W każdej butelce zamknięta jest historia konkretnego zbioru.",
    paragraphs: [
      "Wyselekcjonowane partie trafiają do limitowanych edycji, zachowując swoją tożsamość — od odmiany i momentu zbioru po charakterystyczny profil sensoryczny. Każda butelka Iatridis Estate jest zwieńczeniem procesu, który zaczyna się w gaju i na każdym etapie pozostaje pod kontrolą producenta.",
    ],
    motto: "Od drzewa do butelki — z troską o każdy szczegół.",
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
                  {chapter.lead && <p className="chLead">{chapter.lead}</p>}
                  <div className="chParagraphs">
                    {chapter.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="chDesc">{p}</p>
                    ))}
                  </div>
                  {chapter.motto && (
                    <div className="chMotto">
                      <span className="chMottoLine" />
                      <span className="chMottoText">{chapter.motto}</span>
                    </div>
                  )}
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
