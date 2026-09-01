import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "./aboutStyle.css";

const NAME = "Krzysztof Sasak";
const IDENTITY_WORDS = ["Smakosz.", "Naukowiec.", "Pasjonat."];
const FACTS = [
  "Uczeń Kurta Schellera — absolwent kursów w Akademii Kurta Schellera",
  "Uczestnik programu MasterChef",
  "Pasjonat kuchni śródziemnomorskiej i kultury stołu",
  "Cenię dobrą oliwę, świeże składniki i rzemieślniczą jakość produktu",
];
const BADGES = ["MasterChef", "Akademia Kurta Schellera"];

function About() {
  const nameRef = useRef(null);
  const quoteRef = useRef(null);
  const identityRef = useRef(null);
  const credentialsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                entry.target.classList.add("amVisible");
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    [nameRef, quoteRef, identityRef, credentialsRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="aboutPage">
      <Helmet>
        <title>O mnie • Kolonaki | Dr Krzysztof Sasak</title>
        <meta
          name="description"
          content="Dr n. med. Krzysztof Sasak — smakosz, naukowiec, pasjonat kuchni śródziemnomorskiej. Uczestnik MasterChef, uczeń Kurta Schellera."
        />
      </Helmet>

      <section className="amHero">
        <div className="amHeroTop">
          <span className="amEyebrow">Dr n. med.</span>
          <div className="amLine" aria-hidden="true" />
        </div>

        <div className="amNameWrap" ref={nameRef}>
          <h1 className="amName">
            {NAME.split("").map((char, i) => (
              <span
                key={i}
                className="amLetter"
                style={{ "--i": i }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
      </section>

      <section className="amQuoteSection" ref={quoteRef}>
        <blockquote className="amQuote">
          <span className="amQuoteMark" aria-hidden="true">"</span>
          Kuchnia to coś więcej niż zawód czy hobby — to nieustanne poszukiwanie smaku, jakości i dobrych składników, od gaju oliwnego po talerz.
        </blockquote>
      </section>

      <section className="amIdentitySection" ref={identityRef}>
        {IDENTITY_WORDS.map((word, i) => (
          <div key={word} className={`amWordClip amWordClip--${i}`}>
            <span className="amWord" style={{ "--wi": i }}>
              {word}
            </span>
          </div>
        ))}
      </section>

      <section className="amCredentials" ref={credentialsRef}>
        <ul className="amFacts">
          {FACTS.map((fact, i) => (
            <li key={i} className="amFact" style={{ "--fi": i }}>
              <span className="amFactDot" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
        <div className="amBadges">
          {BADGES.map((badge) => (
            <span key={badge} className="amBadge">
              {badge}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
