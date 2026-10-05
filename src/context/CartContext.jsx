import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "kolonaki_cart_v1";

export const SHIPPING_RATES = {
  paczkomat: {
    base: 18.99,
    large: 36.99,
    label: "Paczkomat InPost",
    description: "Odbiór w wybranym paczkomacie · 1-2 dni robocze",
  },
  kurier: {
    base: 24.99,
    large: 49.99,
    label: "Kurier do domu",
    description: "DPD / InPost · dostawa pod drzwi · 1-2 dni robocze",
  },
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedShippingId, setSelectedShippingId] = useState("paczkomat");
  const [paczkomatPoint, setPaczkomatPoint] = useState(null);
  const [paczkomatRecipient, setPaczkomatRecipient] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [courierAddress, setCourierAddress] = useState({
    fullName: "",
    email: "",
    street: "",
    buildingNo: "",
    apartmentNo: "",
    postalCode: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const isManaged = product.manageStock || product.manage_stock;
    const availableStock = product.stockQuantity ?? product.stock_quantity;
    const isOutOfStock = product.stockStatus === "OUT_OF_STOCK" || product.stock_status === "outofstock" || (isManaged && availableStock <= 0);

    if (isOutOfStock) {
      return { success: false, reason: "out_of_stock", message: "Ten produkt jest obecnie niedostępny." };
    }

    let errorReason = null;
    let errorMessage = null;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      const currentQtyInCart = existingIndex > -1 ? prevCart[existingIndex].quantity : 0;
      const targetQty = currentQtyInCart + quantity;

      if (isManaged && availableStock !== null && targetQty > availableStock) {
        errorReason = "exceeds_stock";
        errorMessage = `Dostępna maksymalna ilość: ${availableStock} szt.`;
        return prevCart;
      }

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: targetQty,
          product: { ...updated[existingIndex].product, ...product }
        };
        return updated;
      }
      return [...prevCart, { id: product.id, product, quantity }];
    });

    if (errorReason) {
      return { success: false, reason: errorReason, message: errorMessage };
    }
    return { success: true };
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return { success: true };
    }

    let errorReason = null;
    let errorMessage = null;

    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId);
      if (!item) return prevCart;

      const isManaged = item.product.manageStock || item.product.manage_stock;
      const availableStock = item.product.stockQuantity ?? item.product.stock_quantity;

      if (isManaged && availableStock !== null && newQuantity > availableStock) {
        errorReason = "exceeds_stock";
        errorMessage = `Dostępna maksymalna ilość: ${availableStock} szt.`;
        return prevCart;
      }

      return prevCart.map((it) =>
        it.id === productId ? { ...it, quantity: newQuantity } : it
      );
    });

    if (errorReason) {
      return { success: false, reason: errorReason, message: errorMessage };
    }
    return { success: true };
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const productsTotal = cart.reduce((sum, item) => {
    const rawPrice = typeof item.product.price === "number"
      ? item.product.price
      : parseFloat(item.product.price) || 0;
    return sum + rawPrice * item.quantity;
  }, 0);

  const isLargeOrder = totalItems >= 4;

  const shippingOptions = Object.entries(SHIPPING_RATES).map(([id, rate]) => ({
    id,
    label: rate.label,
    description: rate.description,
    price: isLargeOrder ? rate.large : rate.base,
  }));

  const selectedShipping = shippingOptions.find((o) => o.id === selectedShippingId) || shippingOptions[0];
  const shippingCost = selectedShipping.price;
  const totalPrice = productsTotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        productsTotal,
        shippingCost,
        totalPrice,
        shippingOptions,
        isLargeOrder,
        selectedShippingId,
        setSelectedShippingId,
        selectedShipping,
        paczkomatPoint,
        setPaczkomatPoint,
        paczkomatRecipient,
        setPaczkomatRecipient,
        courierAddress,
        setCourierAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
