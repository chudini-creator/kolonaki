import React, { useEffect, useState } from "react";
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, CheckCircle, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./cartStyle.css";

const FREE_SHIPPING_THRESHOLD = 200;

function CartBarAndModal() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  const [isBarAnimating, setIsBarAnimating] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsBarAnimating(true);
      const timer = setTimeout(() => setIsBarAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems, totalPrice]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const freeShippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  const formatPrice = (amount) => {
    return amount.toFixed(2).replace(".", ",") + " zł";
  };

  return (
    <>
      {totalItems > 0 && !isCartOpen && (
        <div className={`floatingCartBar ${isBarAnimating ? "bounce" : ""}`}>
          <div className="cartBarInfo" onClick={() => setIsCartOpen(true)}>
            <div className="cartBarBadge">
              <ShoppingBag size={18} />
              <span className="cartBarCount">{totalItems}</span>
            </div>
            <div className="cartBarText">
              <span className="cartBarTitle">Koszyk ({totalItems})</span>
              <span className="cartBarPrice">{formatPrice(totalPrice)}</span>
            </div>
          </div>
          <button
            type="button"
            className="cartBarOpenBtn"
            onClick={() => setIsCartOpen(true)}
          >
            <span>Zobacz koszyk</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {isCartOpen && (
        <div
          className="cartModalBackdrop"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        >
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
              <button
                type="button"
                className="cartModalCloseBtn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Zamknij koszyk"
              >
                <X size={20} />
              </button>
            </div>

            <div className="cartModalBody">
              {cart.length === 0 ? (
                <div className="emptyCartState">
                  <ShoppingBag size={48} className="emptyCartIcon" />
                  <h4>Twój koszyk jest pusty</h4>
                  <p>Wybierz wyśmienitą grecką oliwę extra virgin z naszego katalogu.</p>
                  <button
                    type="button"
                    className="emptyCartBtn"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Przeglądaj produkty
                  </button>
                </div>
              ) : (
                <div className="cartItemsList">
                  {cart.map(({ id, product, quantity }) => {
                    const itemTotal = (typeof product.price === "number" ? product.price : parseFloat(product.price) || 0) * quantity;
                    return (
                      <div key={id} className="cartItemRow">
                        <div className="cartItemImageWrap">
                          <img src={product.image} alt={product.name} className="cartItemImg" />
                        </div>
                        <div className="cartItemDetails">
                          <span className="cartItemVariety">{product.variety}</span>
                          <h4 className="cartItemName">{product.name}</h4>
                          <span className="cartItemUnitPrice">
                            {product.priceFormatted || formatPrice(product.price)}
                          </span>
                        </div>
                        <div className="cartItemActions">
                          <div className="cartItemQtyPicker">
                            <button
                              type="button"
                              className="cartQtyBtn"
                              onClick={() => updateQuantity(id, quantity - 1)}
                              aria-label="Zmniejsz ilość"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="cartQtyNum">{quantity}</span>
                            <button
                              type="button"
                              className="cartQtyBtn"
                              onClick={() => updateQuantity(id, quantity + 1)}
                              aria-label="Zwiększ ilość"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="cartItemSubtotal">{formatPrice(itemTotal)}</span>
                          <button
                            type="button"
                            className="cartItemRemoveBtn"
                            onClick={() => removeFromCart(id)}
                            aria-label="Usuń z koszyka"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cartModalFooter">
                <div className="cartSummaryRows">
                  <div className="summaryRow">
                    <span>Wartość produktów:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="summaryRow">
                    <span>Dostawa:</span>
                    <span>
                      {missingForFreeShipping === 0 ? "Darmowa" : "Od 14,99 zł"}
                    </span>
                  </div>
                  <div className="summaryRow totalRow">
                    <span>Razem brutto:</span>
                    <span className="totalPriceVal">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="checkoutBtn"
                  onClick={() => {
                    alert("Integracja WooCommerce / Checkout w przygotowaniu. Zamówienie zapisane w koszyku!");
                  }}
                >
                  <span>Przejdź do realizacji zamówienia</span>
                  <ArrowRight size={18} />
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
