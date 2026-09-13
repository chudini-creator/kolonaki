import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Package, ShoppingCart, TrendingUp, AlertCircle, CheckCircle2,
  Clock, Edit2, Plus, LogOut, KeyRound, RefreshCw, Search,
  ExternalLink, Eye, ChevronRight, X
} from "lucide-react";
import {
  fetchWooOrders, updateWooOrderStatus,
  fetchWooProducts, updateWooProductPrice, createWooProduct
} from "../../services/wooAdminService";
import "./adminStyle.css";

const STATUS_LABELS = {
  pending: { label: "Oczekuje na płatność", color: "badgeWarning" },
  processing: { label: "W realizacji (Opłacone)", color: "badgeInfo" },
  on_hold: { label: "Wstrzymane", color: "badgeWarning" },
  completed: { label: "Zrealizowane / Wysłane", color: "badgeSuccess" },
  cancelled: { label: "Anulowane", color: "badgeDanger" },
  refunded: { label: "Zwrócone", color: "badgeDanger" },
};

function Admin() {
  const [keys, setKeys] = useState(() => {
    const saved = localStorage.getItem("kolonaki_admin_keys");
    return saved ? JSON.parse(saved) : null;
  });

  const [inputKey, setInputKey] = useState("");
  const [inputSecret, setInputSecret] = useState("");
  const [activeTab, setActiveTab] = useState("orders");

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    regular_price: "",
    description: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputKey.trim() || !inputSecret.trim()) return;
    const creds = { consumerKey: inputKey.trim(), consumerSecret: inputSecret.trim() };
    setKeys(creds);
    localStorage.setItem("kolonaki_admin_keys", JSON.stringify(creds));
  };

  const handleLogout = () => {
    setKeys(null);
    localStorage.removeItem("kolonaki_admin_keys");
    setOrders([]);
    setProducts([]);
  };

  const loadData = async () => {
    if (!keys) return;
    setLoading(true);
    try {
      const [ordersData, productsData] = await Promise.all([
        fetchWooOrders(keys),
        fetchWooProducts(keys),
      ]);
      setOrders(ordersData);
      setProducts(productsData);
    } catch (err) {
      console.error(err);
      alert("Błąd autoryzacji. Sprawdź poprawność kluczy API.");
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keys) {
      loadData();
    }
  }, [keys]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateWooOrderStatus(orderId, newStatus, keys);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch {
      alert("Nie udało się zaktualizować statusu.");
    }
  };

  const handleSavePrice = async (productId) => {
    if (!tempPrice) return;
    try {
      await updateWooProductPrice(productId, tempPrice, keys);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, price: tempPrice, regular_price: tempPrice }
            : p
        )
      );
      setEditingPriceId(null);
    } catch {
      alert("Nie udało się zaktualizować ceny.");
    }
  };

  const handleCreateProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await createWooProduct(newProduct, keys);
      setProducts((prev) => [created, ...prev]);
      setIsAddModalOpen(false);
      setNewProduct({ name: "", regular_price: "", description: "" });
    } catch {
      alert("Błąd podczas dodawania produktu.");
    }
  };

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
    .reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

  const pendingOrders = orders.filter(
    (o) => o.status === "processing" || o.status === "pending"
  );

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    const customer = `${o.billing?.first_name} ${o.billing?.last_name}`.toLowerCase();
    return o.id.toString().includes(q) || customer.includes(q) || o.billing?.phone?.includes(q);
  });

  if (!keys) {
    return (
      <div className="adminAuthPage">
        <Helmet>
          <title>Panel Zarządzania • Logowanie</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="adminAuthCard">
          <div className="authLogo">
            <KeyRound size={28} />
          </div>
          <h2>Panel Zarządzania Kolonaki</h2>
          <form onSubmit={handleLogin} className="authForm">
            <div className="authFormGroup">
              <label>Klucz klienta (Consumer Key):</label>
              <input
                type="text"
                required
                placeholder="ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
              />
            </div>
            <div className="authFormGroup">
              <label>Klucz tajny klienta (Consumer Secret):</label>
              <input
                type="password"
                required
                placeholder="cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={inputSecret}
                onChange={(e) => setInputSecret(e.target.value)}
              />
            </div>
            <button type="submit" className="btnAuthSubmit">
              Zaloguj do Panelu
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="adminDashboard">
      <Helmet>
        <title>Panel Zarządzania • Kolonaki</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="dashboardHeader">
        <div className="dashboardHeaderLeft">
          <h1>Centrum Zarządzania Sklepem</h1>
        </div>
        <div className="dashboardHeaderRight">
          <button onClick={loadData} className="btnHeaderAction" disabled={loading}>
            <RefreshCw size={16} className={loading ? "spin" : ""} />
            <span>Odśwież</span>
          </button>
          <button onClick={handleLogout} className="btnHeaderLogout">
            <LogOut size={16} />
            <span>Wyloguj</span>
          </button>
        </div>
      </header>

      <div className="bentoKpiGrid">
        <div className="bentoCard kpiCard">
          <div className="kpiIconWrap kpiWarning">
            <AlertCircle size={22} />
          </div>
          <div>
            <span className="kpiLabel">Do wysłania / Opłacone</span>
            <h3 className="kpiVal">{pendingOrders.length}</h3>
          </div>
        </div>

        <div className="bentoCard kpiCard">
          <div className="kpiIconWrap kpiSuccess">
            <TrendingUp size={22} />
          </div>
          <div>
            <span className="kpiLabel">Przychód łączny</span>
            <h3 className="kpiVal">{totalRevenue.toFixed(2).replace(".", ",")} zł</h3>
          </div>
        </div>

        <div className="bentoCard kpiCard">
          <div className="kpiIconWrap kpiInfo">
            <Package size={22} />
          </div>
          <div>
            <span className="kpiLabel">Wszystkie zamówienia</span>
            <h3 className="kpiVal">{orders.length}</h3>
          </div>
        </div>

        <div className="bentoCard kpiCard">
          <div className="kpiIconWrap kpiNeutral">
            <ShoppingCart size={22} />
          </div>
          <div>
            <span className="kpiLabel">Produkty w ofercie</span>
            <h3 className="kpiVal">{products.length}</h3>
          </div>
        </div>
      </div>

      <div className="bentoMainSection">
        <div className="bentoNavigation">
          <button
            className={`tabNavBtn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <Package size={18} />
            <span>Zamówienia ({orders.length})</span>
          </button>
          <button
            className={`tabNavBtn ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <ShoppingCart size={18} />
            <span>Produkty & Ceny ({products.length})</span>
          </button>
        </div>

        {activeTab === "orders" && (
          <div className="bentoCard tabContentCard">
            <div className="tableControls">
              <div className="searchBarWrap">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Szukaj po numerze zamówienia, kliencie lub telefonie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="tableResponsiveWrap">
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Nr</th>
                    <th>Klient & Kontakt</th>
                    <th>Dostawa / Paczkomat</th>
                    <th>Produkty</th>
                    <th>Wartość</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const statusConfig = STATUS_LABELS[order.status] || {
                      label: order.status,
                      color: "badgeNeutral",
                    };
                    const isPaczkomat = order.shipping_lines?.some((s) =>
                      s.method_title?.toLowerCase().includes("paczkomat") ||
                      s.method_id?.includes("easypack")
                    );

                    return (
                      <tr key={order.id}>
                        <td className="orderIdCell">
                          <strong>#{order.id}</strong>
                          <span className="orderDate">
                            {new Date(order.date_created).toLocaleDateString("pl-PL")}
                          </span>
                        </td>
                        <td>
                          <div className="customerCell">
                            <span className="customerName">
                              {order.billing?.first_name} {order.billing?.last_name}
                            </span>
                            <span className="customerDetail">{order.billing?.phone}</span>
                            <span className="customerDetail">{order.billing?.email}</span>
                          </div>
                        </td>
                        <td>
                          <div className="deliveryCell">
                            <span className="deliveryMethod">
                              {order.shipping_lines?.[0]?.method_title || "Dostawa"}
                            </span>
                            {order.customer_note && (
                              <span className="deliveryNote" title={order.customer_note}>
                                {order.customer_note}
                              </span>
                            )}
                            {order.shipping?.address_1 && !order.customer_note && (
                              <span className="deliveryAddress">
                                {order.shipping?.address_1}, {order.shipping?.city}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="itemsListCell">
                            {order.line_items?.map((item) => (
                              <span key={item.id} className="orderItemBadge">
                                {item.quantity}x {item.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="orderTotalCell">
                          <strong>{parseFloat(order.total).toFixed(2).replace(".", ",")} zł</strong>
                        </td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`statusSelect ${statusConfig.color}`}
                          >
                            <option value="pending">Oczekuje na płatność</option>
                            <option value="processing">W realizacji (Opłacone)</option>
                            <option value="completed">Zrealizowane / Wysłane</option>
                            <option value="cancelled">Anulowane</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="6" className="tableEmptyState">
                        Brak zamówień spełniających kryteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="bentoCard tabContentCard">
            <div className="tableControls">
              <h3>Zarządzanie Cennikiem & Asortymentem</h3>
              <button onClick={() => setIsAddModalOpen(true)} className="btnAddProduct">
                <Plus size={16} />
                <span>Dodaj nowy produkt</span>
              </button>
            </div>

            <div className="tableResponsiveWrap">
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th>Aktualna cena</th>
                    <th>Akcja</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const isEditing = editingPriceId === product.id;

                    return (
                      <tr key={product.id}>
                        <td className="productRowTitle">
                          <div className="productAdminInfo">
                            {product.images?.[0]?.src && (
                              <img
                                src={product.images[0].src}
                                alt={product.name}
                                className="productThumb"
                              />
                            )}
                            <div>
                              <strong>{product.name}</strong>
                              <span className="productSlug">Slug: {product.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          {isEditing ? (
                            <div className="priceEditRow">
                              <input
                                type="number"
                                step="0.01"
                                className="priceInput"
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                autoFocus
                              />
                              <span className="unitLabel">zł</span>
                            </div>
                          ) : (
                            <strong className="productDisplayPrice">
                              {parseFloat(product.price || 0).toFixed(2).replace(".", ",")} zł
                            </strong>
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <div className="actionButtons">
                              <button
                                onClick={() => handleSavePrice(product.id)}
                                className="btnSavePrice"
                              >
                                Zapisz
                              </button>
                              <button
                                onClick={() => setEditingPriceId(null)}
                                className="btnCancelPrice"
                              >
                                Anuluj
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingPriceId(product.id);
                                setTempPrice(product.price || product.regular_price || "");
                              }}
                              className="btnEditPrice"
                            >
                              <Edit2 size={14} />
                              <span>Zmień cenę</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="adminModalOverlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="adminModalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Dodaj nowy produkt do sklepu</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="modalCloseBtn">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateProductSubmit} className="modalForm">
              <div className="authFormGroup">
                <label>Nazwa produktu:</label>
                <input
                  type="text"
                  required
                  placeholder="np. Oliwa Kalamata Extra Virgin 500ml"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div className="authFormGroup">
                <label>Cena brutto (zł):</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="np. 89.00"
                  value={newProduct.regular_price}
                  onChange={(e) => setNewProduct({ ...newProduct, regular_price: e.target.value })}
                />
              </div>
              <div className="authFormGroup">
                <label>Krótki opis:</label>
                <textarea
                  rows={3}
                  placeholder="Krótki opis produktu i specyfikacja..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>
              <button type="submit" className="btnAuthSubmit">
                Utwórz produkt w WooCommerce
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
