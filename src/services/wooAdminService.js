const WP_API_BASE = "https://admin.kolonaki.pl/wp-json/wc/v3";

export const getAuthHeaders = (consumerKey, consumerSecret) => {
  const token = btoa(`${consumerKey}:${consumerSecret}`);
  return {
    "Content-Type": "application/json",
    "Authorization": `Basic ${token}`,
  };
};

export async function fetchWooOrders(keys) {
  const res = await fetch(`${WP_API_BASE}/orders?per_page=50`, {
    headers: getAuthHeaders(keys.consumerKey, keys.consumerSecret),
  });
  if (!res.ok) throw new Error("Błąd pobierania zamówień z WooCommerce");
  return res.json();
}

export async function updateWooOrderStatus(orderId, status, keys) {
  const res = await fetch(`${WP_API_BASE}/orders/${orderId}`, {
    method: "PUT",
    headers: getAuthHeaders(keys.consumerKey, keys.consumerSecret),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Nie udało się zaktualizować statusu zamówienia");
  return res.json();
}

export async function fetchWooProducts(keys) {
  const res = await fetch(`${WP_API_BASE}/products?per_page=50`, {
    headers: getAuthHeaders(keys.consumerKey, keys.consumerSecret),
  });
  if (!res.ok) throw new Error("Błąd pobierania produktów");
  return res.json();
}

export async function updateWooProductPrice(productId, regularPrice, keys) {
  const res = await fetch(`${WP_API_BASE}/products/${productId}`, {
    method: "PUT",
    headers: getAuthHeaders(keys.consumerKey, keys.consumerSecret),
    body: JSON.stringify({ regular_price: String(regularPrice) }),
  });
  if (!res.ok) throw new Error("Błąd aktualizacji ceny produktu");
  return res.json();
}

export async function createWooProduct(productData, keys) {
  const res = await fetch(`${WP_API_BASE}/products`, {
    method: "POST",
    headers: getAuthHeaders(keys.consumerKey, keys.consumerSecret),
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Błąd tworzenia produktu");
  return res.json();
}
