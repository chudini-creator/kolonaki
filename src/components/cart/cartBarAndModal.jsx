import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag, X, Plus, Minus, Trash2, ArrowRight,
  Truck, Package, MapPin, ChevronRight,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import PaczkomatOverlay from "./paczkomatOverlay";
import "./cartStyle.css";

const SHIPPING_ICONS = { paczkomat: Package, kurier: Truck };

function CartBarAndModal() {
  const navigate = useNavigate();
  const {
    cart, isCartOpen, setIsCartOpen,
    removeFromCart, updateQuantity, clearCart,
    totalItems, productsTotal, shippingCost, totalPrice,
    shippingOptions, isLargeOrder,
    selectedShippingId, setSelectedShippingId,
    paczkomatPoint, setPaczkomatPoint,
    paczkomatRecipient, setPaczkomatRecipient,
    courierAddress, setCourierAddress,
  } = useCart();

  const [isBarAnimating, setIsBarAnimating] = useState(false);
  const [isPaczkomatOpen, setIsPaczkomatOpen] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsBarAnimating(true);
      const t = setTimeout(() => setIsBarAnimating(false), 600);
      return () => clearTimeout(t);
    }
  }, [totalItems, productsTotal]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && isCartOpen) setIsCartOpen(false); };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isCartOpen, setIsCartOpen]);

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [cartStockMessage, setCartStockMessage] = useState(null);

  const fmt = (n) => n.toFixed(2).replace(".", ",") + " zł";

  const handleCartQtyChange = (productId, newQty) => {
    const res = updateQuantity(productId, newQty);
    if (res && !res.success) {
      setCartStockMessage(res.message);
      setTimeout(() => setCartStockMessage(null), 3500);
    }
  };

  const handleAddressChange = (field) => (e) => {
    setCourierAddress((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleRecipientChange = (field) => (e) => {
    setPaczkomatRecipient((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCheckout = async () => {
    if (selectedShippingId === "kurier") {
      if (!courierAddress.fullName || !courierAddress.email || !courierAddress.street || !courierAddress.city || !courierAddress.phone) {
        alert("Wypełnij wymagane pola adresu dostawy (w tym email).");
        return;
      }
    }
    if (selectedShippingId === "paczkomat") {
      if (!paczkomatPoint || !paczkomatRecipient.fullName || !paczkomatRecipient.phone || !paczkomatRecipient.email) {
        alert("Wybierz paczkomat i wypełnij dane odbiorcy.");
        return;
      }
    }

    setIsCheckoutLoading(true);

    try {
      const WP_GRAPHQL_URL = "https://admin.kolonaki.pl/graphql";

      localStorage.removeItem("woo-session");
      let sessionToken = null;

      const getHeaders = () => {
        const headers = { "Content-Type": "application/json" };
        if (sessionToken) headers["woocommerce-session"] = `Session ${sessionToken}`;
        return headers;
      };

      for (const item of cart) {
        const addRes = await fetch(WP_GRAPHQL_URL, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            query: `
              mutation AddToCart($productId: Int!, $quantity: Int!) {
                addToCart(input: {productId: $productId, quantity: $quantity}) {
                  cartItem { key }
                }
              }
            `,
            variables: { productId: item.product.wpDatabaseId, quantity: item.quantity }
          })
        });

        const newToken = addRes.headers.get("woocommerce-session");
        if (newToken) {
          sessionToken = newToken;
          localStorage.setItem("woo-session", newToken);
        }
      }
      const [firstName, ...lastNameParts] = (selectedShippingId === "kurier" ? courierAddress.fullName : paczkomatRecipient.fullName).split(" ");
      const lastName = lastNameParts.join(" ") || "Brak";
      const email = selectedShippingId === "kurier" ? courierAddress.email : paczkomatRecipient.email;
      const phone = selectedShippingId === "kurier" ? courierAddress.phone : paczkomatRecipient.phone;

      const addressLine = selectedShippingId === "kurier"
        ? `${courierAddress.street} ${courierAddress.buildingNo}/${courierAddress.apartmentNo || ""}`
        : paczkomatPoint.code;

      const cityVal = selectedShippingId === "kurier" ? courierAddress.city : (paczkomatPoint.city || "Paczkomat");
      const postCodeVal = selectedShippingId === "kurier" ? courierAddress.postalCode : "00-000";

      const addressData = {
        firstName,
        lastName,
        email,
        phone,
        address1: addressLine,
        city: cityVal,
        postcode: postCodeVal,
        country: "PL"
      };

      const customerNote = selectedShippingId === "paczkomat"
        ? `Wybrany Paczkomat: ${paczkomatPoint.code} (${paczkomatPoint.address}, ${paczkomatPoint.city})`
        : "";

      const checkoutRes = await fetch(WP_GRAPHQL_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          query: `
            mutation Checkout($billing: CustomerAddressInput!, $shipping: CustomerAddressInput!, $note: String) {
              checkout(input: {
                billing: $billing,
                shipping: $shipping,
                customerNote: $note,
                shippingMethod: "${selectedShippingId === "kurier" ? "flat_rate:3" : "easypack_parcel_machines:2"}",
                paymentMethod: "cod" 
              }) {
                result
                redirect
                order {
                  orderNumber
                  total
                }
              }
            }
          `,
          variables: { billing: addressData, shipping: addressData, note: customerNote }
        })
      });

      const checkoutData = await checkoutRes.json();
      const checkoutPayload = checkoutData.data?.checkout;

      if (checkoutPayload?.result === "SUCCESS" || checkoutPayload?.order) {
        localStorage.removeItem("woo-session");
        clearCart();
        setIsCartOpen(false);

        const orderNo = checkoutPayload?.order?.orderNumber || "KOL-" + Math.floor(1000 + Math.random() * 9000);
        const rawOrderTotal = checkoutPayload?.order?.total;
        const orderTotal = rawOrderTotal
          ? rawOrderTotal.replace(/&nbsp;/g, " ").replace(/&#160;/g, " ").trim()
          : fmt(totalPrice);

        navigate(`/dziekujemy?order=${encodeURIComponent(orderNo)}&total=${encodeURIComponent(orderTotal)}`);
      } else if (checkoutPayload?.redirect) {
        localStorage.removeItem("woo-session");
        clearCart();
        setIsCartOpen(false);
        window.location.href = checkoutPayload.redirect;
      } else {
        console.error("Błąd kasy:", checkoutData.errors);
        alert("Wystąpił problem z realizacją zamówienia. Spróbuj ponownie.");
      }

    } catch (err) {
      console.error(err);
      alert("Błąd połączenia. Sprawdź konsolę.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <>
      {isPaczkomatOpen && (
        <PaczkomatOverlay
          onSelect={(point) => setPaczkomatPoint(point)}
          onClose={() => setIsPaczkomatOpen(false)}
        />
      )}

      {totalItems > 0 && !isCartOpen && (
        <div className={`floatingCartBar ${isBarAnimating ? "bounce" : ""}`}>
          <div className="cartBarInfo" onClick={() => setIsCartOpen(true)}>
            <div className="cartBarBadge">
              <ShoppingBag size={18} />
              <span className="cartBarCount">{totalItems}</span>
            </div>
            <div className="cartBarText">
              <span className="cartBarTitle">Koszyk ({totalItems})</span>
              <span className="cartBarPrice">{fmt(totalPrice)}</span>
            </div>
          </div>
          <button type="button" className="cartBarOpenBtn" onClick={() => setIsCartOpen(true)}>
            <span>Zobacz koszyk</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {isCartOpen && (
        <div className="cartModalBackdrop" onClick={() => setIsCartOpen(false)}>
          <div
            className="cartModalContainer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Koszyk zakupowy"
          >
            <div className="cartModalHeader">
              <div className="cartModalTitleWrap">
                <ShoppingBag size={22} className="cartModalHeaderIcon" />
                <h3>Twój Koszyk ({totalItems})</h3>
              </div>
              <button type="button" className="cartModalCloseBtn" onClick={() => setIsCartOpen(false)} aria-label="Zamknij koszyk">
                <X size={20} />
              </button>
            </div>

            <div className="cartModalBody">
              {cart.length === 0 ? (
                <div className="emptyCartState">
                  <ShoppingBag size={48} className="emptyCartIcon" />
                  <h4>Twój koszyk jest pusty</h4>
                  <p>Wybierz wyśmienitą grecką oliwę extra virgin z naszego katalogu.</p>
                  <button type="button" className="emptyCartBtn" onClick={() => setIsCartOpen(false)}>
                    Przeglądaj produkty
                  </button>
                </div>
              ) : (
                <>
                  <div className="cartItemsList">
                    {cart.map(({ id, product, quantity }) => {
                      const rawPrice = typeof product.price === "number"
                        ? product.price : parseFloat(product.price) || 0;
                      return (
                        <div key={id} className="cartItemRow">
                          <div className="cartItemImageWrap">
                            <img src={product.image} alt={product.name} className="cartItemImg" />
                          </div>
                          <div className="cartItemDetails">
                            <span className="cartItemVariety">{product.variety}</span>
                            <h4 className="cartItemName">{product.name}</h4>
                            <span className="cartItemUnitPrice">{product.priceFormatted || fmt(rawPrice)}</span>
                          </div>
                          <div className="cartItemActions">
                            <div className="cartItemQtyPicker">
                              <button type="button" className="cartQtyBtn" onClick={() => handleCartQtyChange(id, quantity - 1)} aria-label="Zmniejsz ilość">
                                <Minus size={12} />
                              </button>
                              <span className="cartQtyNum">{quantity}</span>
                              <button type="button" className="cartQtyBtn" onClick={() => handleCartQtyChange(id, quantity + 1)} aria-label="Zwiększ ilość">
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="cartItemSubtotal">{fmt(rawPrice * quantity)}</span>
                            <button type="button" className="cartItemRemoveBtn" onClick={() => removeFromCart(id)} aria-label="Usuń z koszyka">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {cartStockMessage && (
                    <div className="cartStockAlertBanner" role="alert">
                      <span>{cartStockMessage}</span>
                    </div>
                  )}

                  <div className="shippingSection">
                    <div className="shippingHeaderRow">
                      <span className="shippingSectionTitle">Dostawa</span>
                      {isLargeOrder && (
                        <span className="shippingBatchBadge">Zamówienie 4+ butelek</span>
                      )}
                    </div>
                    <div className="shippingOptions">
                      {shippingOptions.map((option) => {
                        const Icon = SHIPPING_ICONS[option.id];
                        const isSelected = selectedShippingId === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            className={`shippingOption ${isSelected ? "shippingOptionSelected" : ""}`}
                            onClick={() => setSelectedShippingId(option.id)}
                            aria-pressed={isSelected}
                          >
                            <div className="shippingOptionLeft">
                              <div className="shippingOptionRadio">
                                {isSelected && <div className="shippingOptionRadioDot" />}
                              </div>
                              <Icon size={18} className="shippingOptionIcon" />
                              <div className="shippingOptionInfo">
                                <span className="shippingOptionLabel">{option.label}</span>
                                <span className="shippingOptionDesc">{option.description}</span>
                              </div>
                            </div>
                            <span className="shippingOptionPrice">{fmt(option.price)}</span>
                          </button>
                        );
                      })}
                    </div>

                    {selectedShippingId === "paczkomat" && (
                      <div className="deliveryDetailBlock">
                        {paczkomatPoint ? (
                          <div className="selectedPaczkomatRow">
                            <div className="selectedPaczkomatInfo">
                              <MapPin size={15} className="selectedPaczkomatIcon" />
                              <div>
                                <span className="selectedPaczkomatCode">{paczkomatPoint.code}</span>
                                {paczkomatPoint.address && (
                                  <span className="selectedPaczkomatAddress">
                                    {paczkomatPoint.address}{paczkomatPoint.city ? `, ${paczkomatPoint.city}` : ""}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button type="button" className="changePaczkomatBtn" onClick={() => setIsPaczkomatOpen(true)}>
                              Zmień <ChevronRight size={14} />
                            </button>
                          </div>
                        ) : (
                          <button type="button" className="selectPaczkomatBtn" onClick={() => setIsPaczkomatOpen(true)}>
                            <MapPin size={16} />
                            <span>Wybierz paczkomat na mapie</span>
                            <ChevronRight size={16} className="selectPaczkomatArrow" />
                          </button>
                        )}

                        <div className="recipientForm">
                          <span className="deliveryFormLabel">Dane odbiorcy · potrzebne do powiadomień InPost</span>
                          <div className="courierForm">
                            <input
                              type="text"
                              className="courierInput courierInputFull"
                              placeholder="Imię i nazwisko odbiorcy"
                              value={paczkomatRecipient.fullName}
                              onChange={handleRecipientChange("fullName")}
                              autoComplete="name"
                            />
                            <input
                              type="email"
                              className="courierInput courierInputFull"
                              placeholder="Adres e-mail (powiadomienie o paczce)"
                              value={paczkomatRecipient.email}
                              onChange={handleRecipientChange("email")}
                              autoComplete="email"
                            />
                            <input
                              type="tel"
                              className="courierInput courierInputFull"
                              placeholder="Numer telefonu (SMS z kodem odbioru)"
                              value={paczkomatRecipient.phone}
                              onChange={handleRecipientChange("phone")}
                              autoComplete="tel"
                              maxLength={12}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedShippingId === "kurier" && (
                      <div className="deliveryDetailBlock">
                        <span className="deliveryFormLabel">Adres dostawy</span>
                        <div className="courierForm">
                          <input
                            type="text"
                            className="courierInput courierInputFull"
                            placeholder="Imię i nazwisko"
                            value={courierAddress.fullName}
                            onChange={handleAddressChange("fullName")}
                            autoComplete="name"
                          />
                          <input
                            type="email"
                            className="courierInput courierInputFull"
                            placeholder="Adres e-mail"
                            value={courierAddress.email}
                            onChange={handleAddressChange("email")}
                            autoComplete="email"
                          />
                          <div className="courierRow">
                            <input
                              type="text"
                              className="courierInput courierInputGrow"
                              placeholder="Ulica"
                              value={courierAddress.street}
                              onChange={handleAddressChange("street")}
                              autoComplete="address-line1"
                            />
                            <input
                              type="text"
                              className="courierInput courierInputShort"
                              placeholder="Nr domu"
                              value={courierAddress.buildingNo}
                              onChange={handleAddressChange("buildingNo")}
                            />
                            <input
                              type="text"
                              className="courierInput courierInputShort"
                              placeholder="Nr lok."
                              value={courierAddress.apartmentNo}
                              onChange={handleAddressChange("apartmentNo")}
                            />
                          </div>
                          <div className="courierRow">
                            <input
                              type="text"
                              className="courierInput courierInputShort"
                              placeholder="Kod pocztowy"
                              value={courierAddress.postalCode}
                              onChange={handleAddressChange("postalCode")}
                              pattern="\d{2}-\d{3}"
                              maxLength={6}
                              autoComplete="postal-code"
                            />
                            <input
                              type="text"
                              className="courierInput courierInputGrow"
                              placeholder="Miejscowość"
                              value={courierAddress.city}
                              onChange={handleAddressChange("city")}
                              autoComplete="address-level2"
                            />
                          </div>
                          <input
                            type="tel"
                            className="courierInput courierInputFull"
                            placeholder="Numer telefonu"
                            value={courierAddress.phone}
                            onChange={handleAddressChange("phone")}
                            autoComplete="tel"
                            maxLength={12}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cartModalFooter">
                <div className="cartSummaryRows">
                  <div className="summaryRow">
                    <span>Wartość produktów:</span>
                    <span>{fmt(productsTotal)}</span>
                  </div>
                  <div className="summaryRow">
                    <span>Dostawa:</span>
                    <span>{fmt(shippingCost)}</span>
                  </div>
                  <div className="summaryRow totalRow">
                    <span>Razem brutto:</span>
                    <span className="totalPriceVal">{fmt(totalPrice)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="checkoutBtn"
                  onClick={handleCheckout}
                  disabled={isCheckoutLoading}
                >
                  <span>{isCheckoutLoading ? "Przetwarzanie..." : "Przejdź do realizacji zamówienia"}</span>
                  {!isCheckoutLoading && <ArrowRight size={18} />}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartBarAndModal;
