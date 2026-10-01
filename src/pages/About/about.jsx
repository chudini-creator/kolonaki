import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Quote,
  CheckCircle2,
} from "lucide-react";
import "./aboutStyle.css";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aboutEditorialPage">
      <Helmet>
        <title>O mnie • Kolonaki | Dr Krzysztof Sasak</title>
        <meta
          name="description"
          content="Dr n. med. i n. o zdr. Krzysztof Sasak — naukowiec, podróżnik, smakosz. Poznaj historię pasji, w której nauka o antyoksydantach łączy się z rzemieślniczą grecką oliwą."
        />
      </Helmet>

      <header className="abHeroSection">
        <div className="abHeroContainer">

          <h1 className="abHeroTitle">
            Naukowiec. Podróżnik. Smakosz.
          </h1>

          <p className="abHeroLead">
            Oliwa extra virgin to jeden z tych wyjątkowych produktów, w których spotykają
            się dwa fascynujące światy — rzetelna wiedza o naturalnych antyoksydantach oraz
            wielowiekowa tradycja śródziemnomorskiego stołu.
          </p>
        </div>
      </header>

      <section className="abChapterSection">
        <div className="abChapterContainer">
          <div className="abChapterHeader">
            <span className="abChapterKicker">Rozdział 01</span>
            <h2 className="abChapterTitle">Nauka i Kuchnia</h2>
            <div className="abChapterDivider">
              <span className="abDividerLine" />
              <span className="abDividerDiamond" />
              <span className="abDividerLine" />
            </div>
          </div>

          <div className="abEditorialSplitGrid">
            <div className="abNarrativeColumn">
              <p className="abTextLead">
                Nazywam się Krzysztof Sasak. Jestem doktorem nauk medycznych i nauk o zdrowiu oraz naukowcem związanym z Uniwersytetem Medycznym w Łodzi.
              </p>
              <p className="abTextParagraph">
                W swojej pracy naukowej zajmuję się naturalnymi antyoksydantami, polifenolami i ich aktywnością w procesach związanych z wolnymi rodnikami. To właśnie tym zagadnieniom poświęciłem swoją rozprawę doktorską i publikacje naukowe.
              </p>
              <p className="abTextParagraph">
                Nic więc dziwnego, że oliwa extra virgin zainteresowała mnie czymś więcej niż tylko smakiem. To jeden z tych wyjątkowych produktów, w których spotykają się moje dwa światy — nauka i kuchnia.
              </p>
              <p className="abTextParagraph">
                Wysokiej jakości oliwa extra virgin zajmuje dziś ważne miejsce również we współczesnym podejściu do świadomego odżywiania i długowieczności. Dobrym przykładem jest protokół Blueprint Bryana Johnsona, w którym EVOO stanowi stały element codziennej diety. Dla mnie to interesujące spotkanie wielowiekowej tradycji kuchni śródziemnomorskiej ze współczesnym zainteresowaniem nauki jakością żywności i naturalnie występującymi w niej związkami bioaktywnymi.
              </p>
              <p className="abTextParagraph">
                Poza laboratorium od lat fascynują mnie podróże, gotowanie i odkrywanie dobrego smaku. Jednym z moich kulinarnych mentorów był Kurt Scheller, z którym miałem przyjemność gotować i od którego mogłem uczyć się nie tylko techniki, ale przede wszystkim szacunku do produktu i jakości składników. Brałem również udział w programie MasterChef, a szczególne miejsce w mojej kuchni zawsze zajmowały smaki i produkty śródziemnomorskie.
              </p>
              <p className="abTextParagraph">
                To właśnie przekonanie, że dobry produkt nie potrzebuje wielu dodatków — potrzebuje jakości, towarzyszy mi dziś również przy wyborze oliw do Kolonaki.
              </p>
            </div>

            <aside className="abInsightSidebar">
              <div className="abInsightCard">
                <div className="abInsightHeader">
                  <span className="abInsightTag">Polifenole & Longevity</span>
                </div>
                <h3 className="abInsightTitle">
                  Ochrona komórkowa przed stresem oksydacyjnym
                </h3>
                <p className="abInsightDesc">
                  Świeża, wcześnie zbierana oliwa tłoczona na zimno jest jednym z najbogatszych źródeł naturalnych polifenoli. Nowoczesne protokoły długowieczności (m.in. Blueprint) traktują oliwę extra virgin jako fundamentalny element codziennej diety prozdrowotnej.
                </p>
                <div className="abInsightFooter">
                  <CheckCircle2 size={16} />
                  <span>Czysty skład bez kompromisów</span>
                </div>
              </div>
            </aside>
          </div>

          <div className="abQuoteBanner">
            <Quote size={32} className="abQuoteMark" />
            <blockquote className="abQuoteText">
              „Jako naukowiec chcę wiedzieć, co znajduje się w produkcie i jak powstaje. Jako smakosz szukam aromatu, świeżości i charakteru. A jako podróżnik chcę poznać miejsce i ludzi, którzy za nim stoją.”
            </blockquote>
          </div>
        </div>
      </section>

      <section className="abChapterSection abSectionAlt">
        <div className="abChapterContainer">
          <div className="abChapterHeader">
            <span className="abChapterKicker">Rozdział 02</span>
            <h2 className="abChapterTitle">Dlaczego Kolonaki?</h2>
            <div className="abChapterDivider">
              <span className="abDividerLine" />
              <span className="abDividerDiamond" />
              <span className="abDividerLine" />
            </div>
          </div>

          <div className="abColumnsDuo">
            <div className="abDuoCard">
              <span className="abDuoSubtitle">Etymologia & Symbolika</span>
              <h3 className="abDuoTitle">Κολωνάκι — Mała Kolumna</h3>
              <p className="abDuoText">
                Kolonaki (Κολωνάκι) po grecku oznacza „małą kolumnę”. Dla mnie ta nazwa ma również znaczenie symboliczne.
              </p>
              <p className="abDuoText">
                Tak jak kolumna stanowi fundament i podporę klasycznej budowli, tak dobra, autentyczna oliwa jest jednym z filarów dobrej kuchni.
              </p>
            </div>

            <div className="abDuoCard">
              <span className="abDuoSubtitle">Ateńska Atmosfera</span>
              <h3 className="abDuoTitle">Tradycja i Współczesna Elegancja</h3>
              <p className="abDuoText">
                Kolonaki to także wyjątkowa dzielnica Aten — pełna butików, galerii sztuki, kawiarni i restauracji.
              </p>
              <p className="abDuoText">
                Miejsce, w którym grecka tradycja spotyka się ze współczesną elegancją, a dobry smak i bezkompromisowa jakość są naturalną częścią codzienności. To właśnie ta idea stała się inspiracją dla naszej marki.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="abChapterSection">
        <div className="abChapterContainer">
          <div className="abChapterHeader">
            <span className="abChapterKicker">Rozdział 03</span>
            <h2 className="abChapterTitle">Oliwy, których sam szukałem</h2>
            <div className="abChapterDivider">
              <span className="abDividerLine" />
              <span className="abDividerDiamond" />
              <span className="abDividerLine" />
            </div>
          </div>

          <div className="abStoryNarrative">
            <p className="abTextLead">
              Oddaję w Państwa ręce oliwy, których znalezienie zajęło mi trochę czasu.
            </p>
            <p className="abTextParagraph">
              Za każdą butelką stoją godziny rozmów z producentami, degustacje, wizyty w gajach i tłoczniach oraz wielogodzinne podróże. Chciałem zobaczyć nie tylko gotowy produkt, ale poznać całą jego drogę — od drzewa, przez zbiór i tłoczenie, aż po butelkę.
            </p>
            <p className="abTextParagraph">
              Nie szukałem największego producenta ani najdłuższej listy produktów. Szukałem oliwy, którą sam chciałbym postawić na swoim stole i którą z pełnym przekonaniem mógłbym podzielić się z innymi.
            </p>
            <p className="abTextParagraph abHighlightParagraph">
              Tak trafiłem do Iatridis Estate.
            </p>
            <p className="abTextParagraph">
              Dziś oddaję w Państwa ręce oliwy, które urzekły mnie autentycznością, świeżością i prawdziwie śródziemnomorskim charakterem. Powstają z ogromną dbałością o jakość owoców i cały proces produkcji, a naturalnie występujące w nich polifenole łączą świat dobrej kuchni z tym, czym od lat zajmuję się również naukowo.
            </p>
          </div>

          {/* --- DUAL PERSPECTIVE BOX --- */}
          <div className="abDualPerspectiveWrap">
            <div className="abPerspectiveCard">
              <span className="abPerspectiveKicker">Jako smakosz</span>
              <h4 className="abPerspectiveHeading">Pytam: „Jak smakują?”</h4>
              <p className="abPerspectiveDesc">
                Szukam autentycznego, żywego aromatu świeżej trawy, owoców tropikalnych i przyjemnie pieprznego finiszu, który dopełnia potrawę.
              </p>
            </div>

            <div className="abPerspectiveCard">
              <span className="abPerspectiveKicker">Jako naukowiec</span>
              <h4 className="abPerspectiveHeading">Chcę wiedzieć: „Dlaczego?”</h4>
              <p className="abPerspectiveDesc">
                Weryfikuję moment wczesnego zbioru, temperaturę zimnego tłoczenia poniżej 27°C oraz profil naturalnie występujących antyoksydantów.
              </p>
            </div>
          </div>

          <div className="abManifestoCard">
            <p className="abManifestoIntro">
              Mam nadzieję, że otwierając butelkę Kolonaki, odnajdą Państwo w niej choć część tego, czego sam szukałem podczas swoich podróży po Grecji — autentyczny produkt, naturalny charakter i prawdziwy śródziemnomorski smak.
            </p>

            <div className="abManifestoMottoWrap">
              <h3 className="abManifestoMotto">
                „Bo dobra oliwa nie jest dla mnie tylko dodatkiem do potrawy.
                Jest jednym z filarów dobrej kuchni.”
              </h3>
            </div>

            <div className="abSignatureBlock">
              <span className="abSignatureName">Dr n. med. i n. o zdr. Krzysztof Sasak</span>
              <span className="abSignatureRole">Założyciel Kolonaki</span>
            </div>

            <div className="abManifestoActions">
              <Link to="/sklep" className="btnAbPrimary">
                <span>Zobacz kolekcję w sklepie</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/historia" className="btnAbSecondary">
                <span>Poznaj historię gajów</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
