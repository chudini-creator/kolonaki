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
    variety: "Odmiana Manaki • Wrześniowy Zbiór",
    badge: "Wczesny Zbiór",
    tagline: "Limitowany wrześniowy zbiór odmiany Manaki.",
    description: "Wyjątkowa oliwa extra virgin o intensywnej owocowości, niskiej goryczy i średniej pikantności. Jej złożony profil łączy aromaty świeżo skoszonej trawy, pomidora i migdałów z nutami banana, czerwonego jabłka i owoców tropikalnych. Tłoczona na zimno z oliwek zbieranych już we wrześniu, zaledwie kilka godzin po zbiorze. Naturalnie zawiera polifenole oraz inne związki bioaktywne i cenne składniki odżywcze.",
    defaultImage: "/img/Produkty/Koroneiko.webp",
    acidity: "< 0.20%",
    harvest: "Wrzesień",
    origin: "Dolina Arkadii, Grecja",
    tastingNotes: ["Świeżo skoszona trawa", "Pomidor", "Migdały", "Banan", "Czerwone jabłko", "Owoce tropikalne"],
    intensity: 65,
    fruitiness: 90,
    bitterness: 30,
    pairings: "Do picia na surowo w celach zdrowotnych, do wyrazistych sałat i świeżego pieczywa."
  },
  {
    id: "manaki-early-harvest",
    slug: "manaki-early-harvest",
    name: "Manaki Early Harvest",
    edition: "Butelka 500 ml",
    variety: "Odmiana Manaki",
    badge: "Limitowana Edycja",
    tagline: "Odmiana Manaki w wersji wczesnego zbioru.",
    description: "Elegancka oliwa extra virgin o umiarkowanej owocowości, niskiej goryczy i delikatnej pikantności. Jej subtelny profil aromatyczny łączy nuty zielonego migdała, dojrzałego banana i rumianku. Tłoczona na zimno z wcześnie zbieranych oliwek, zaledwie kilka godzin po zbiorze. Naturalnie zawiera polifenole oraz inne związki bioaktywne i cenne składniki odżywcze.",
    defaultImage: "/img/Produkty/Manaki-2.webp",
    harvest: "Wrzesień - Październik",
    origin: "Dolina Arkadii, Grecja",
    tastingNotes: ["Zielony migdał", "Dojrzały banan", "Rumianek"],
    intensity: 50,
    fruitiness: 70,
    bitterness: 30,
    pairings: "Białe ryby, carpaccio z przegrzebków, sałatki."
  },
  {
    id: "koroneiko-early-harvest",
    slug: "koroneiko-early-harvest",
    name: "Koroneiko Early Harvest",
    edition: "Butelka 500 ml",
    variety: "Odmiana Koroneiki",
    badge: "Bestseller",
    tagline: "Klasyczna grecka odmiana w intensywnej odsłonie wczesnego zbioru.",
    description: "Wyrazista oliwa extra virgin o zielonym charakterze, zdecydowanej goryczy i przyjemnie pikantnym finiszu. W jej aromacie dominują świeżo skoszona trawa, karczoch, skórka pomidora i zielonego orzecha. Tłoczona na zimno z wcześnie zbieranych oliwek, zaledwie kilka godzin po zbiorze. Naturalnie zawiera polifenole oraz inne związki bioaktywne i cenne składniki odżywcze.",
    defaultImage: "/img/Produkty/Koroneiko-2.webp",
    harvest: "Październik - Listopad",
    origin: "Dolina Arkadii, Grecja",
    tastingNotes: ["Świeżo skoszona trawa", "Karczoch", "Skórka pomidora", "Zielony orzech"],
    intensity: 85,
    fruitiness: 75,
    bitterness: 85,
    pairings: "Dojrzałe pomidory, pieczywo na zakwasie, grillowane mięsa."
  },
  {
    id: "manaki",
    slug: "manaki",
    name: "Manaki",
    edition: "Butelka 750 ml",
    variety: "Odmiana Manaki",
    badge: "Aksamitna • Łagodna",
    tagline: "Aksamitna i łagodna, z subtelnymi nutami dojrzałych owoców.",
    description: "Delikatna oliwa extra virgin z odmiany Manaki, powstająca z regularnego, całorocznego zbioru, bez selekcji charakterystycznej dla limitowanych edycji Early Harvest. Jej łagodny profil z subtelnymi nutami owoców tropikalnych i czerwonego jabłka sprawia, że jest doskonałą propozycją na początek przygody z wysokiej jakości oliwą oraz dla osób preferujących mniej intensywne smaki. To podstawowa linia Iatridis Estate stworzona do codziennego wykorzystania w kuchni śródziemnomorskiej. Naturalnie zawiera polifenole oraz inne związki bioaktywne i cenne składniki odżywcze.",
    defaultImage: "/img/Produkty/Manaki.webp",
    harvest: "Całoroczny",
    origin: "Dolina Arkadii, Grecja",
    tastingNotes: ["Owoce tropikalne", "Czerwone jabłko"],
    intensity: 40,
    fruitiness: 75,
    bitterness: 20,
    pairings: "Świeże sery feta, ryby, delikatne zupy krem."
  },
  {
    id: "manaki-5l",
    slug: "manaki-5l",
    name: "Manaki – 5 Litrów",
    edition: "Puszka 5000 ml",
    variety: "Odmiana Manaki",
    badge: "Ekonomiczny Wybór",
    tagline: "Najbardziej ekonomiczny format do codziennego gotowania.",
    description: "Łagodna i uniwersalna oliwa extra virgin z odmiany Manaki w dużym, 5-litrowym opakowaniu chroniącym oliwę przed dostępem światła. Jej delikatny profil sprawia, że doskonale sprawdza się w codziennej kuchni — zarówno na zimno, jak i podczas przygotowywania potraw. Idealny wybór dla rodzin, restauracji i szefów kuchni, którzy potrzebują większej ilości dobrej greckiej oliwy do regularnego wykorzystania. Naturalnie zawiera polifenole oraz inne związki bioaktywne i cenne składniki odżywcze.",
    defaultImage: "/img/Produkty/Manaki-5l.png",
    harvest: "Całoroczny",
    origin: "Dolina Arkadii, Grecja",
    tastingNotes: ["Owoce tropikalne", "Czerwone jabłko", "Świeże zioła"],
    intensity: 40,
    fruitiness: 75,
    bitterness: 20,
    pairings: "Do sałatek, pieczenia, marynat i codziennego gotowania."
  }
];

const SHOP_SECTIONS = [
  {
    id: "limited",
    title: "Limited Edition",
    description: "Jest taki moment we wrześniu, na który czeka się cały rok. Każdego sezonu przychodzi w innym dniu — decydują pogoda, opady i dojrzałość owoców. To trochę jak ruletka: trzeba uchwycić idealny moment, gdy oliwki są jeszcze intensywnie zielone. Z nich powstaje September Harvest — limitowana oliwa o wyjątkowym charakterze, będąca zapisem konkretnego sezonu.",
    slugs: ["september-harvest"],
    layout: "single"
  },
  {
    id: "premium",
    title: "Premium Edition",
    description: "Wczesny zbiór. Wyselekcjonowane partie. Wyjątkowy charakter. Oliwy Manaki i Koroneiko powstające z wcześnie zbieranych owoców w sercu Arkadii. Każda z nich oferuje własną harmonię owocowości, goryczy i pikantności — od subtelnego Manaki po intensywne Koroneiko.",
    slugs: ["manaki-early-harvest", "koroneiko-early-harvest"],
    layout: "grid"
  },
  {
    id: "basic",
    title: "Basic Edition",
    description: "Łagodna. Aksamitna. Na każdy dzień. Grecka oliwa extra virgin z odmiany Manaki o delikatnym, harmonijnym profilu, stworzona do codziennego wykorzystania w kuchni. Dostępna w klasycznej butelce oraz ekonomicznym formacie 5 L — idealnym dla rodzin i gastronomii.",
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
                      stockQuantity
                      stockStatus
                      manageStock
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
              name: localMeta.name || wpMatch.name,
              price: rawPrice,
              priceFormatted: rawPrice.toFixed(2).replace(".", ",") + " zł",
              image: localMeta.defaultImage || wpMatch.image?.sourceUrl,
              stockQuantity: wpMatch.stockQuantity,
              stockStatus: wpMatch.stockStatus,
              manageStock: wpMatch.manageStock
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

  const [stockMessages, setStockMessages] = useState({});
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [selectedNoticeProduct, setSelectedNoticeProduct] = useState(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);

  const handleQuantityChange = (product, delta) => {
    const isManaged = product.manageStock || product.manage_stock;
    const maxStock = isManaged && product.stockQuantity !== null ? product.stockQuantity : 20;

    setQuantities((prev) => {
      const current = prev[product.id] || 1;
      const next = current + delta;
      if (next < 1) return prev;
      if (isManaged && next > maxStock) {
        setStockMessages((m) => ({
          ...m,
          [product.id]: `Dostępna maksymalna ilość: ${maxStock} szt.`
        }));
        setTimeout(() => {
          setStockMessages((m) => ({ ...m, [product.id]: null }));
        }, 3000);
        return prev;
      }
      return {
        ...prev,
        [product.id]: Math.min(20, next)
      };
    });
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
    const isManaged = product.manageStock || product.manage_stock;
    const isOutOfStock =
      product.stockStatus === "OUT_OF_STOCK" ||
      product.stock_status === "outofstock" ||
      (isManaged && (product.stockQuantity ?? 0) <= 0);

    if (isOutOfStock) {
      setStockMessages((m) => ({
        ...m,
        [product.id]: "Produkt chwilowo wyprzedany."
      }));
      setTimeout(() => {
        setStockMessages((m) => ({ ...m, [product.id]: null }));
      }, 3500);
      return;
    }

    const qtyToAdd = quantities[product.id] || 1;
    const result = addToCart(product, qtyToAdd);

    if (!result.success) {
      setStockMessages((m) => ({
        ...m,
        [product.id]: result.message || "Brak wystarczającej ilości na stanie."
      }));
      setTimeout(() => {
        setStockMessages((m) => ({ ...m, [product.id]: null }));
      }, 3500);
      return;
    }

    setAddedAnimation((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const renderProductCard = (product) => {
    const isManaged = product.manageStock || product.manage_stock;
    const isOutOfStock =
      product.stockStatus === "OUT_OF_STOCK" ||
      product.stock_status === "outofstock" ||
      (isManaged && (product.stockQuantity ?? 0) <= 0);
    const stockMsg = stockMessages[product.id];
    const currentQty = quantities[product.id] || 1;
    const isJustAdded = addedAnimation[product.id];

    return (
      <article key={product.id} className={`productCard ${isOutOfStock ? "productCardOutOfStock" : ""}`}>
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
              <div className={`quantitySelector ${isOutOfStock ? "disabled" : ""}`} aria-label="Wybór ilości">
                <button
                  type="button"
                  className="qtyBtn"
                  onClick={() => handleQuantityChange(product, -1)}
                  disabled={isOutOfStock || currentQty <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="qtyValue">{isOutOfStock ? 0 : currentQty}</span>
                <button
                  type="button"
                  className="qtyBtn"
                  onClick={() => handleQuantityChange(product, 1)}
                  disabled={isOutOfStock}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                className={`addToCartBtn ${isOutOfStock ? "outOfStockBtn" : isJustAdded ? "added" : ""}`}
                onClick={() => handleAddToCart(product)}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? (
                  <span>Brak w magazynie</span>
                ) : isJustAdded ? (
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

            {stockMsg && (
              <div className="stockFeedbackToast" role="alert">
                <span>{stockMsg}</span>
              </div>
            )}
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
