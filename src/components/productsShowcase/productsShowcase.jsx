import React, { useState, useEffect } from "react";
import { ShoppingBag, Check, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./productsShowcaseStyle.css";

const WP_GRAPHQL_URL = "https://admin.kolonaki.pl/graphql";

const LOCAL_PRODUCTS_META = [
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
    acidity: "< 0.22%",
    harvest: "Październik",
    origin: "Argolida, Grecja",
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
    acidity: "< 0.25%",
    harvest: "Październik - Listopad",
    origin: "Peloponez, Grecja",
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
    acidity: "< 0.28%",
    harvest: "Grudzień",
    origin: "Argolida, Grecja",
    tastingNotes: ["Owoce tropikalne", "Czerwone jabłko"],
    intensity: 50,
    fruitiness: 90,
    bitterness: 30,
    pairings: "Świeże sery feta, ryby, delikatne zupy krem."
  },
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
    origin: "Peloponez, Grecja",
    tastingNotes: ["Świeża trawa", "Pomidor", "Migdały", "Jabłko", "Banan", "Owoce tropikalne"],
    intensity: 95,
    fruitiness: 85,
    bitterness: 85,
    pairings: "Do picia na surowo w celach zdrowotnych, mocne czerwone mięsa."
  },
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
                .replace(/[^0-9,-]+/g, "")
                .replace(",", ".")
            );

            return {
              ...localMeta,
              wpId: wpMatch.id,
              wpDatabaseId: wpMatch.databaseId,
              name: wpMatch.name,
              price: rawPrice,
              priceFormatted: wpMatch.price.replace(/&nbsp;/g, " "),
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

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(20, (prev[id] || 1) + delta))
    }));
  };

  const handleAddToCart = (product) => {
    const currentQty = quantities[product.id] || 1;
    addToCart({
      id: product.slug,
      wpDatabaseId: product.wpDatabaseId,
      name: product.name,
      price: product.price,
      priceFormatted: product.priceFormatted,
      image: product.image,
      variety: product.variety
    }, currentQty);

    setAddedAnimation((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product.id]: false }));
    }, 2200);
  };

  return (
    <section id="products" className="productsSection" aria-label="Katalog produktów Kolonaki">
      <div className="productsContainer">

        {loading && (
          <div style={{ textAlign: "center", padding: "100px 0", color: "rgba(var(--accent-color), 0.5)" }}>
            Ładowanie produktów z WooCommerce...
          </div>
        )}

        {!loading && (
          <div className="productsGrid">
            {products.map((product) => {
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
                      <div className="specItem">
                        <span className="specLabel">Kwasowość:</span>
                        <span className="specValue">{product.acidity}</span>
                      </div>
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
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsShowcase;
