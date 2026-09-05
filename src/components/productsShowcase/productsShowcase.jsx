import React, { useState, useEffect } from "react";
import { ShoppingBag, Check, Plus, Minus, X, Bell, CalendarClock } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./productsShowcaseStyle.css";

const WP_GRAPHQL_URL = "https://admin.kolonaki.pl/graphql";

const LOCAL_PRODUCTS_META = [
  {
    id: "september-harvest",
    slug: "september-harvest",
    name: "September Harvest",
    edition: "Edycja Prezentowa",
    variety: "Odmiana Koroneiki • Wczesny Zbiór",
    badge: "Wczesny Zbiór",
    tagline: "Najwcześniejsze zbiory, maksymalna ilość polifenoli",
    description: "Tłoczona z jeszcze niedojrzałych, mocno zielonych oliwek we wrześniu. Ekstremalnie bogata w antyoksydanty.",
    defaultImage: "/img/Produkty/Koroneiko.webp",
    acidity: "< 0.20%",
    harvest: "Wrzesień",
    origin: "Dolina Arkadii, Grecja",
    tastingNotes: ["Świeża trawa", "Pomidor", "Migdały", "Jabłko", "Banan", "Owoce tropikalne"],
    intensity: 95,
    fruitiness: 85,
    bitterness: 85,
    pairings: "Do picia na surowo w celach zdrowotnych, mocne czerwone mięsa."
  },
  {
    id: "manaki-early-harvest",
    slug: "manaki-early-harvest",
    name: "Manaki Early Harvest",
    edition: "Butelka 500 ml",
    variety: "Odmiana Manaki",
    badge: "Limitowana Edycja",
    tagline: "Rzadsza odmiana w wersji wczesnego zbioru",
    description: "Wyselekcjonowane wczesne zbiory z rodzinnego gaju. Aksamitna struktura i urzekający, owocowy bukiet dla koneserów.",
    defaultImage: "/img/Produkty/Manaki-2.webp",
    harvest: "Wrzesień - Październik",
    origin: "Dolina Arkadii, Grecja",
    tastingNotes: ["Zielone migdały", "Banan", "Rumianek"],
    intensity: 65,
    fruitiness: 98,
    bitterness: 40,
    pairings: "Białe ryby, carpaccio z przegrzebków, sałatki."
  },
  {
    id: "koroneiko-early-harvest",
    slug: "koroneiko-early-harvest",
    name: "Koroneiko Early Harvest",
    edition: "Butelka 500 ml",
    variety: "Odmiana Koroneiki",
    badge: "Bestseller",
    tagline: "Klasyczna grecka pikantność wczesnego zbioru",
    description: "Królowa greckich oliwek. Charakteryzuje się intensywnym, trawiastym bukietem aromatycznym i przyjemnie pieprznym finiszem.",
    defaultImage: "/img/Produkty/Koroneiko-2.webp",
    harvest: "Październik - Listopad",
    origin: "Dolina Arkadii, Grecja",
    tastingNotes: ["Świeża trawa", "Karczoch", "Skórka pomidora", "Orzech Włoski"],
    intensity: 85,
    fruitiness: 80,
    bitterness: 75,
    pairings: "Dojrzałe pomidory, pieczywo na zakwasie, grillowane mięsa."
  },
  {
    id: "manaki",
    slug: "manaki",
    name: "Manaki",
    edition: "Butelka 750 ml",
    variety: "Odmiana Manaki",
    badge: "Aksamitna • Łagodna",
    tagline: "Aksamitna, łagodna z nutami dojrzałych owoców",
    description: "Rzadka i ceniona odmiana. Wyróżnia się maślaną konsystencją, subtelną słodyczą jabłek i całkowitym brakiem cierpkości.",
    defaultImage: "/img/Produkty/Manaki.webp",
    harvest: "Całoroczny",
    origin: "Dolina Arkadii, Grecja",
    tastingNotes: ["Owoce tropikalne", "Czerwone jabłko"],
    intensity: 50,
    fruitiness: 90,
    bitterness: 30,
    pairings: "Świeże sery feta, ryby, delikatne zupy krem."
  },
  {
    id: "manaki-5l",
    slug: "manaki-5l",
    name: "Manaki – Puszka 5 Litrów",
    edition: "Puszka 5000 ml",
    variety: "Odmiana Manaki",
    badge: "Ekonomiczny Wybór",
    tagline: "Najbardziej opłacalna pojemność do codziennego gotowania",
    description: "Autentyczna grecka oliwa w puszce chroniącej przed światłem. Wybór dla rodzin i szefów kuchni ceniących najwyższą jakość na co dzień.",
    defaultImage: "/img/Produkty/Manaki.webp",
    harvest: "Całoroczny",
    origin: "Dolina Arkadii, Grecja",
    tastingNotes: ["Owoce tropikalne", "Czerwone jabłko", "Świeże zioła"],
    intensity: 50,
    fruitiness: 90,
    bitterness: 30,
    pairings: "Do sałatek, pieczenia, marynat i codziennego gotowania."
  }
];

const SHOP_SECTIONS = [
  {
    id: "limited",
    title: "Limited Edition",
    description: "Oliwa z najwcześniejszego zbioru niedojrzałych oliwek. Wybitne stężenie polifenoli i wyjątkowy, surowy charakter.",
    slugs: ["september-harvest"],
    layout: "single"
  },
  {
    id: "premium",
    title: "Premium Edition",
    description: "Wczesne zbiory z wyselekcjonowanych gajów Argolidy i Peloponezu. Mistrzowska harmonia aromatu, pikantności i owocowości.",
    slugs: ["manaki-early-harvest", "koroneiko-early-harvest"],
    layout: "grid"
  },
  {
    id: "basic",
    title: "Basic Edition",
    description: "Aksamitna, łagodna grecka oliwa extra virgin na każdy dzień. Dostępna w szkle oraz ekonomicznej puszce 5 litrów.",
    slugs: ["manaki", "manaki-5l"],
    layout: "grid"
  }
];

function ProductsShowcase() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(LOCAL_PRODUCTS_META);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [addedAnimation, setAddedAnimation] = useState({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(WP_GRAPHQL_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              {
                products {
                  nodes {
                    id
                    databaseId
                    name
                    slug
                    ... on SimpleProduct {
                      price
                    }
                    image {
                      sourceUrl
                    }
                  }
                }
              }
            `
          })
        });

        const json = await res.json();
        const wpProducts = json.data?.products?.nodes || [];

        const mergedProducts = LOCAL_PRODUCTS_META.map(localMeta => {
          const wpMatch = wpProducts.find(wp => wp.slug === localMeta.slug);
          if (wpMatch) {
            const rawPrice = Number(
              wpMatch.price
                .replace(/&nbsp;/g, "")
                .replace(/&#160;/g, "")
                .replace(/[^0-9,-]+/g, "")
                .replace(",", ".")
            );

            return {
              ...localMeta,
              wpId: wpMatch.id,
              wpDatabaseId: wpMatch.databaseId,
              name: wpMatch.name,
              price: rawPrice,
              priceFormatted: rawPrice.toFixed(2).replace(".", ",") + " zł",
              image: wpMatch.image?.sourceUrl || localMeta.defaultImage
            };
          }
          return { ...localMeta, price: 0, priceFormatted: "Brak ceny" };
        });

        setProducts(mergedProducts);

        const initialQty = {};
        mergedProducts.forEach(p => { initialQty[p.id] = 1; });
        setQuantities(initialQty);

      } catch (error) {
        console.error("Błąd pobierania produktów z WP:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [selectedNoticeProduct, setSelectedNoticeProduct] = useState(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(20, (prev[id] || 1) + delta))
    }));
  };

  const handleOpenNotice = (product) => {
    setSelectedNoticeProduct(product);
    setIsNoticeOpen(true);
    setNotifySuccess(false);
  };

  const handleCloseNotice = () => {
    setIsNoticeOpen(false);
  };

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    if (!notifyEmail) return;

    setIsNotifying(true);
    try {
      await fetch("https://formspree.io/f/mbgjogwe", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "Temat": "Zapis na powiadomienie o nowych zbiorach",
          "Email": notifyEmail,
          "Produkt": selectedNoticeProduct?.name || "Wszystkie zbiory"
        })
      });
      setNotifySuccess(true);
      setNotifyEmail("");
    } catch {
      setNotifySuccess(true);
    } finally {
      setIsNotifying(false);
    }
  };

  const handleAddToCart = (product) => {
    handleOpenNotice(product);
  };

  const renderProductCard = (product) => {
    const currentQty = quantities[product.id] || 1;
    const isJustAdded = addedAnimation[product.id];

    return (
      <article key={product.id} className="productCard">
        <div className="productImageWrapper">
          <div className="productImageGlow" />
          <img
            src={product.image}
            alt={product.name}
            className="productImage"
            loading="lazy"
          />
        </div>

        <div className="productCardContent">
          <div className="productHead">
            <span className="productVariety">{product.variety}</span>
            <h3 className="productName">{product.name}</h3>
            <p className="productTagline">{product.tagline}</p>
          </div>

          <p className="productDescription">{product.description}</p>

          <div className="productSpecsGrid">
            {product.acidity && (
              <div className="specItem">
                <span className="specLabel">Kwasowość:</span>
                <span className="specValue">{product.acidity}</span>
              </div>
            )}
            <div className="specItem">
              <span className="specLabel">Pochodzenie:</span>
              <span className="specValue">{product.origin}</span>
            </div>
            <div className="specItem">
              <span className="specLabel">Zbiór:</span>
              <span className="specValue">{product.harvest}</span>
            </div>
            <div className="specItem">
              <span className="specLabel">Tłoczenie:</span>
              <span className="specValue">Na zimno (&le; 27&deg;C)</span>
            </div>
          </div>

          <div className="tasteProfileContainer">
            <div className="tasteProfileHeader">
              <span className="tasteProfileTitle">Profil sensoryczny:</span>
            </div>
            <div className="tasteBarRow">
              <span className="tasteBarLabel">Owocowość</span>
              <div className="tasteBarTrack">
                <div className="tasteBarFill" style={{ width: `${product.fruitiness}%` }} />
              </div>
              <span className="tasteBarPercent">{product.fruitiness}%</span>
            </div>
            <div className="tasteBarRow">
              <span className="tasteBarLabel">Intensywność</span>
              <div className="tasteBarTrack">
                <div className="tasteBarFill" style={{ width: `${product.intensity}%` }} />
              </div>
              <span className="tasteBarPercent">{product.intensity}%</span>
            </div>
            <div className="tasteBarRow">
              <span className="tasteBarLabel">Pikantność</span>
              <div className="tasteBarTrack">
                <div className="tasteBarFill" style={{ width: `${product.bitterness}%` }} />
              </div>
              <span className="tasteBarPercent">{product.bitterness}%</span>
            </div>
          </div>

          <div className="tastingNotesWrapper">
            <span className="notesHeading">Nuty aromatyczne:</span>
            <div className="notesTags">
              {product.tastingNotes.map((note, idx) => (
                <span key={idx} className="noteTag">
                  <Check size={12} className="noteCheck" />
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="productPurchaseBlock">
            <div className="priceWrapper">
              <span className="productPrice">{product.priceFormatted}</span>
            </div>

            <div className="cartActionRow">
              <div className="quantitySelector" aria-label="Wybór ilości">
                <button
                  type="button"
                  className="qtyBtn"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  disabled={currentQty <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="qtyValue">{currentQty}</span>
                <button
                  type="button"
                  className="qtyBtn"
                  onClick={() => handleQuantityChange(product.id, 1)}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                className={`addToCartBtn ${isJustAdded ? "added" : ""}`}
                onClick={() => handleAddToCart(product)}
              >
                {isJustAdded ? (
                  <>
                    <Check size={18} />
                    <span>Dodano ({currentQty})!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Dodaj do koszyka</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="products" className="productsSection" aria-label="Katalog produktów Kolonaki">
      <div className="productsContainer">
        {loading && (
          <div className="productsLoadingState">
            Ładowanie produktów...
          </div>
        )}

        {!loading && (
          <div className="shopSectionsStack">
            {SHOP_SECTIONS.map((section) => {
              const sectionProducts = products.filter((p) =>
                section.slugs.includes(p.slug)
              );

              if (sectionProducts.length === 0) return null;

              return (
                <div key={section.id} className="shopTierSection">
                  <div className="tierHeader">
                    <h2 className="tierTitle">{section.title}</h2>
                    <p className="tierDescription">{section.description}</p>
                    <div className="tierDivider">
                      <span className="tierDividerLine" />
                      <span className="tierDividerDiamond" />
                      <span className="tierDividerLine" />
                    </div>
                  </div>

                  <div
                    className={`productsGrid ${
                      section.layout === "single" ? "singleLayoutGrid" : ""
                    }`}
                  >
                    {sectionProducts.map(renderProductCard)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isNoticeOpen && (
        <div className="noticeModalOverlay" onClick={handleCloseNotice} role="dialog" aria-modal="true">
          <div className="noticeModalCard" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="noticeCloseBtn"
              onClick={handleCloseNotice}
              aria-label="Zamknij powiadomienie"
            >
              <X size={20} />
            </button>

            <div className="noticeHeaderWrap">
              <div className="noticeIconBadge">
                <CalendarClock size={24} />
              </div>
              <span className="noticeKicker">Sezon Zbiorów 2026</span>
              <h3 className="noticeTitle">Oczekujemy na świeże tłoczenie</h3>
            </div>

            <p className="noticeText">
              Sklep jest obecnie nieczynny ze względu na wyprzedanie zapasów poprzedniego rocznika.
              Planowane otwarcie sprzedaży nowej, świeżej oliwy z pierwszego tłoczenia nastąpi na przełomie:
            </p>

            <div className="noticeDateHighlight">
              <span>Październik – Listopad 2026</span>
            </div>
            
            <button
              type="button"
              className="noticeDismissBtn"
              onClick={handleCloseNotice}
            >
              Rozumiem, przeglądaj dalej
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductsShowcase;
