import React, { useState } from "react";
import { Droplet, Award, Sparkles, ShoppingBag, Check, Plus, Minus, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./productsShowcaseStyle.css";

const PRODUCTS_DATA = [
  {
    id: "koroneiki-classic",
    name: "Oliwa Koroneiki Extra Virgin",
    edition: "Butelka 500 ml",
    variety: "Odmiana Koroneiki",
    badge: "Bestseller • Złoty Medal",
    price: 69,
    priceFormatted: "69,00 zł",
    unitPrice: "138,00 zł / 1 l",
    tagline: "Intensywna, wyrazista i bogata w cenne polifenole",
    description: "Królowa greckich oliwek z regionu Peloponezu. Charakteryzuje się intensywnym, trawiastym bukietem aromatycznym i przyjemnie pieprznym finiszem.",
    image: "/img/Produkty/Koroneiko.webp",
    acidity: "< 0.3%",
    harvest: "Listopad – Grudzień",
    origin: "Peloponez, Grecja",
    tastingNotes: ["Świeża trawa", "Zielony pieprz", "Karczoch", "Dzika oliwka"],
    intensity: 90,
    fruitiness: 85,
    bitterness: 75,
    pairings: "Dojrzałe pomidory, carpaccio, pieczywo na zakwasie, grillowane mięsa i sałatki greckie."
  },
  {
    id: "koroneiki-reserve",
    name: "Oliwa Koroneiki Reserve",
    edition: "Edycja Prezentowa • Tuba 500 ml",
    variety: "Odmiana Koroneiki • Single Estate",
    badge: "Edycja Kolekcjonerska",
    price: 89,
    priceFormatted: "89,00 zł",
    unitPrice: "178,00 zł / 1 l",
    tagline: "Wczesny zbiór z najstarszych drzew oliwnych w tubie ozdobnej",
    description: "Limitowana edycja z pojedynczego gaju oliwnego. Tłoczona z wczesnych, zielonych oliwek (Agoureleo) o maksymalnym stężeniu antyoksydantów.",
    image: "/img/Produkty/Koroneiko-2.webp",
    acidity: "< 0.24%",
    harvest: "Październik (Wczesny Zbiór)",
    origin: "Single Estate • Peloponez",
    tastingNotes: ["Agoureleo", "Liść pomidora", "Młody migdał", "Dziki tymianek"],
    intensity: 95,
    fruitiness: 90,
    bitterness: 80,
    pairings: "Do degustacji na surowo, steków wołowych, twardych serów kozich i pieczonych warzyw."
  },
  {
    id: "manaki-classic",
    name: "Oliwa Manaki Extra Virgin",
    edition: "Butelka 500 ml",
    variety: "Odmiana Manaki",
    badge: "Aksamitna • Łagodna",
    price: 69,
    priceFormatted: "69,00 zł",
    unitPrice: "138,00 zł / 1 l",
    tagline: "Aksamitna, łagodna z nutami dojrzałych owoców i migdałów",
    description: "Rzadka i ceniona odmiana z regionu Argolidy. Wyróżnia się maślaną konsystencją, subtelną słodyczą dojrzałych jabłek i całkowitym brakiem cierpkości.",
    image: "/img/Produkty/Manaki.webp",
    acidity: "< 0.28%",
    harvest: "Grudzień – Styczeń",
    origin: "Argolida, Grecja",
    tastingNotes: ["Dojrzałe jabłko", "Słodki migdał", "Masło ziołowe", "Kwiaty cytrusów"],
    intensity: 60,
    fruitiness: 95,
    bitterness: 35,
    pairings: "Świeże sery feta i manouri, ryby, owoce morza, delikatne zupy krem i pieczywo pita."
  },
  {
    id: "manaki-reserve",
    name: "Oliwa Manaki Reserve",
    edition: "Edycja Prezentowa • Tuba 500 ml",
    variety: "Odmiana Manaki • Single Estate",
    badge: "Limitowana Edycja",
    price: 89,
    priceFormatted: "89,00 zł",
    unitPrice: "178,00 zł / 1 l",
    tagline: "Ekskluzywne wydanie w ozdobnej tubie kolekcjonerskiej",
    description: "Wyselekcjonowane zbiory z rodzinnego gaju w Argolidzie. Aksamitna struktura i urzekający, kwiatowo-owocowy bukiet dla koneserów.",
    image: "/img/Produkty/Manaki-2.webp",
    acidity: "< 0.22%",
    harvest: "Grudzień (Selekcja Ręczna)",
    origin: "Single Estate • Argolida",
    tastingNotes: ["Kremowy migdał", "Morela", "Kwiat pomarańczy", "Lekkie zioła"],
    intensity: 65,
    fruitiness: 98,
    bitterness: 30,
    pairings: "Do wykwintnych deserów cytrusowych, białych ryb, carpaccio z przegrzebków i sałatek."
  }
];

function ProductsShowcase({ title, subtitle, showHeader = true }) {
  const { addToCart } = useCart();

  const [quantities, setQuantities] = useState({
    "koroneiki-classic": 1,
    "koroneiki-reserve": 1,
    "manaki-classic": 1,
    "manaki-reserve": 1
  });

  const [addedAnimation, setAddedAnimation] = useState({});

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(20, (prev[id] || 1) + delta))
    }));
  };

  const handleAddToCart = (product) => {
    const currentQty = quantities[product.id] || 1;
    addToCart(product, currentQty);
    setAddedAnimation((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product.id]: false }));
    }, 2200);
  };

  return (
    <section id="products" className="productsSection" aria-label="Katalog produktów Kolonaki">
      <div className="productsContainer">

        <div className="productsGrid">
          {PRODUCTS_DATA.map((product) => {
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

                  {/* Parametry */}
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

                  {/* Profil smakowy */}
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

                  {/* Nuty */}
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
                      <span className="unitPrice">{product.unitPrice}</span>
                    </div>

                    <div className="cartActionRow">
                      <div className="quantitySelector" aria-label="Wybór ilości">
                        <button
                          type="button"
                          className="qtyBtn"
                          onClick={() => handleQuantityChange(product.id, -1)}
                          aria-label="Zmniejsz ilość"
                          disabled={currentQty <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qtyValue">{currentQty}</span>
                        <button
                          type="button"
                          className="qtyBtn"
                          onClick={() => handleQuantityChange(product.id, 1)}
                          aria-label="Zwiększ ilość"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className={`addToCartBtn ${isJustAdded ? "added" : ""}`}
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Dodaj ${product.name} do koszyka`}
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

        {/*<div className="trustBadgesBar">
          <div className="trustItem">
            <div className="trustIconWrap">
              <Award size={24} />
            </div>
            <div className="trustText">
              <h4>100% Extra Virgin</h4>
              <p>Najwyższa kategoria jakości, tłoczona wyłącznie mechanicznie.</p>
            </div>
          </div>

          <div className="trustItem">
            <div className="trustIconWrap">
              <Droplet size={24} />
            </div>
            <div className="trustText">
              <h4>Tłoczenie na zimno (&le; 27&deg;C)</h4>
              <p>Zachowuje pełnię naturalnych polifenoli, witamin i aromatów.</p>
            </div>
          </div>

          <div className="trustItem">
            <div className="trustIconWrap">
              <Truck size={24} />
            </div>
            <div className="trustText">
              <h4>Szybka & Bezpieczna Wysyłka</h4>
              <p>Bezpiecznie pakowane butelki w ekologiczne opakowania ochronne.</p>
            </div>
          </div>
        </div>*/}

      </div>
    </section>
  );
}

export default ProductsShowcase;
