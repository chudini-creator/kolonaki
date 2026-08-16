import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import "./heroStyle.css";

const DEFAULT_SLIDES = [
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

function Hero({
  slides,
  title,
  subtitle,
  bgImage,
  interval = 5500,
  autoPlay = true,
  pauseOnHover = true,
  showControls = true,
  showIndicators = true,
  showProgressBar = true,
  showCounter = true
}) {

  const slideList = React.useMemo(() => {
    if (slides && Array.isArray(slides) && slides.length > 0) {
      return slides.map((slide, idx) => {
        if (typeof slide === "string") {
          return {
            image: slide,
            title: title || `KOLONAKI ${idx + 1}`,
            subtitle: subtitle || "",
            tagline: "KOLONAKI ATHENS",
            ctaText: "Odkryj więcej",
            ctaLink: "/products"
          };
        }
        return {
          image: slide.image || slide.bgImage || "/img/hero.jpg",
          tagline: slide.tagline || "GRECKA TRADYCJA",
          title: slide.title || title || "KOLONAKI",
          subtitle: slide.subtitle || subtitle || "",
          ctaText: slide.ctaText || "",
          ctaLink: slide.ctaLink || "",
          secondaryCtaText: slide.secondaryCtaText || "",
          secondaryCtaLink: slide.secondaryCtaLink || ""
        };
      });
    }

    if (bgImage) {
      return [
        {
          image: bgImage,
          tagline: "AUTENTYCZNA KUCHNIA GRECKA",
          title: title || "KOLONAKI",
          subtitle: subtitle || "Wyjątkowe smaki Grecji w sercu Twojego miasta",
          ctaText: "Odkryj menu",
          ctaLink: "/products"
        },
        ...DEFAULT_SLIDES.slice(1)
      ];
    }

    return DEFAULT_SLIDES;
  }, [slides, bgImage, title, subtitle]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderRef = useRef(null);

  const totalSlides = slideList.length;

  const goToSlide = useCallback((index) => {
    setCurrentIndex((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (!isPlaying || (pauseOnHover && isHovered) || totalSlides <= 1) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, pauseOnHover, totalSlides, interval, nextSlide, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const activeSlide = slideList[currentIndex] || slideList[0];

  return (
    <section
      ref={sliderRef}
      className="hero"
      aria-label="Galeria i pokaz slajdów Hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      <div className="heroBackgroundContainer">
        {slideList.map((slide, index) => {
          const isCurrent = index === currentIndex;
          const isVideo = slide.image && slide.image.endsWith(".mp4");

          return (
            <div
              key={index}
              className={`heroSlideBg ${isCurrent ? "active" : ""}`}
              aria-hidden={!isCurrent}
            >
              {isVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="heroMedia heroVideo"
                >
                  <source src={slide.image} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="heroMedia heroImage"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="heroOverlay" />

      <div className="heroContent">
        <div key={currentIndex} className="heroTextContainer">

          <h1 className="heroTitle">{activeSlide.title}</h1>

          {activeSlide.subtitle && (
            <p className="heroSubtitle">{activeSlide.subtitle}</p>
          )}

          {(activeSlide.ctaText || activeSlide.secondaryCtaText) && (
            <div className="heroActions">
              {activeSlide.ctaText && (
                <Link
                  to={activeSlide.ctaLink || "/products"}
                  className="heroCtaPrimary"
                >
                  {activeSlide.ctaText}
                </Link>
              )}
              {activeSlide.secondaryCtaText && (
                <Link
                  to={activeSlide.secondaryCtaLink || "/about"}
                  className="heroCtaSecondary"
                >
                  {activeSlide.secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>

      </div>

      {showControls && totalSlides > 1 && (
        <>
          <button
            type="button"
            className="heroNavButton heroNavPrev"
            onClick={prevSlide}
            aria-label="Poprzedni slajd"
          >
            <ChevronLeft size={30} />
          </button>

          <button
            type="button"
            className="heroNavButton heroNavNext"
            onClick={nextSlide}
            aria-label="Następny slajd"
          >
            <ChevronRight size={30} />
          </button>
        </>
      )}

      <div className="heroBottomBar">
        {showCounter && totalSlides > 1 && (
          <div className="heroCounter" aria-live="polite">
            <span className="heroCurrentNumber">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="heroCounterDivider">/</span>
            <span className="heroTotalNumber">
              {String(totalSlides).padStart(2, "0")}
            </span>
          </div>
        )}

        {showIndicators && totalSlides > 1 && (
          <div
            className="heroIndicators"
            role="tablist"
            aria-label="Wybór slajdu"
          >
            {slideList.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Przejdź do slajdu ${index + 1}`}
                className={`heroDot ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              >
                <span className="heroDotFill" />
              </button>
            ))}
          </div>
        )}

        {totalSlides > 1 && (
          <button
            type="button"
            className="heroPlayPauseBtn"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Wstrzymaj pokaz slajdów" : "Wznów pokaz slajdów"}
            title={isPlaying ? "Wstrzymaj" : "Odtwórz"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}
      </div>
    </section>
  );
}

export default Hero;
