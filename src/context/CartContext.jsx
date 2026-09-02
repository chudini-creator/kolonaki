import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "kolonaki_cart_v1";

export const SHIPPING_OPTIONS = [
  {
    id: "paczkomat",
    label: "Paczkomat InPost",
    description: "Odbiór w wybranym paczkomacie · 1-2 dni robocze",
    price: 13.99,
  },
  {
    id: "kurier",
    label: "Kurier do domu",
    description: "DPD / InPost · dostawa pod drzwi · 1-2 dni robocze",
    price: 16.99,
  },
];

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
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevCart, { id: product.id, product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const productsTotal = cart.reduce((sum, item) => {
    const rawPrice = typeof item.product.price === "number"
      ? item.product.price
      : parseFloat(item.product.price) || 0;
    return sum + rawPrice * item.quantity;
  }, 0);

  const selectedShipping = SHIPPING_OPTIONS.find((o) => o.id === selectedShippingId) || SHIPPING_OPTIONS[0];
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
