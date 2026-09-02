import React, { useEffect, useRef, useState } from "react";
import { X, MapPin, Search } from "lucide-react";
import "./paczkomatOverlayStyle.css";

function PaczkomatOverlay({ onSelect, onClose }) {
  const [status, setStatus] = useState("loading");
  const [manualCode, setManualCode] = useState("");
  const containerId = React.useMemo(() => "inpost-geo-" + Math.random().toString(36).substring(2, 9), []);

  useEffect(() => {
    let isCancelled = false;

    const loadAndInit = async () => {
      try {
        if (!document.querySelector('link[href*="easypack.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://geowidget.easypack24.net/css/easypack.css";
          document.head.appendChild(link);
        }

        if (!window.jQuery) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        if (!document.querySelector('script[src*="sdk-for-javascript.js"]')) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://geowidget.easypack24.net/js/sdk-for-javascript.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        if (isCancelled) return;

        // InPost widget init requires a slight delay to ensure scripts are fully parsed
        setTimeout(() => {
          if (isCancelled) return;
          
          if (window.easyPack) {
            // Init globalny - robimy tylko raz
            if (!window.inpostMapInitialized) {
              window.easyPack.init({
                defaultLocale: "pl",
                mapType: "osm",
                searchType: "osm",
                points: { types: ["parcel_locker"] },
                map: {
                  defaultLocation: [52.2297, 21.0122],
                  initialZoom: 6,
                },
              });
              window.inpostMapInitialized = true;
            }

            // Podpięcie widgetu do nowego węzła DOM - robimy za KAZDYM otwarciem mapy
            window.easyPack.mapWidget(containerId, (point) => {
              onSelect({
                code: point.name,
                address: point.address.line1,
                city: point.address.line2
              });
              onClose();
            });
          }
          
          setStatus("ready");
        }, 100);

      } catch (err) {
        console.error("Geowidget load error:", err);
        if (!isCancelled) setStatus("error");
      }
    };

    loadAndInit();

    return () => {
      isCancelled = true;
    };
  }, [onSelect, onClose, containerId]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim().length < 3) return;
    onSelect({ code: manualCode.trim().toUpperCase(), address: "", city: "" });
    onClose();
  };

  return (
    <div className="paczkomatOverlay">
      <div className="paczkomatOverlayHeader">
        <div className="paczkomatOverlayTitle">
          <MapPin size={20} />
          <h3>Wybierz Paczkomat InPost</h3>
        </div>
        <button type="button" className="paczkomatOverlayClose" onClick={onClose} aria-label="Zamknij">
          <X size={22} />
        </button>
      </div>

      <div className="paczkomatOverlayBody">
        {status === "loading" && (
          <div className="paczkomatState">
            <div className="paczkomatSpinner" />
            <span>Ładowanie mapy paczkomatów…</span>
          </div>
        )}

        {status === "error" && (
          <div className="paczkomatFallback">
            <p className="paczkomatFallbackNote">
              Nie udało się załadować mapy. Wpisz kod paczkomatu ręcznie:
            </p>
            <form className="paczkomatManualForm" onSubmit={handleManualSubmit}>
              <div className="paczkomatManualInputWrap">
                <Search size={16} className="paczkomatManualIcon" />
                <input
                  type="text"
                  className="paczkomatManualInput"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="np. WAW01A, KRK123"
                  maxLength={10}
                />
              </div>
              <button type="submit" className="paczkomatManualSubmit">
                Potwierdź paczkomat
              </button>
            </form>
          </div>
        )}

        <div 
          id={containerId} 
          className="paczkomatWidgetContainer" 
          style={{ opacity: status === "ready" ? 1 : 0, pointerEvents: status === "ready" ? "auto" : "none" }}
        />
      </div>
    </div>
  );
}

export default PaczkomatOverlay;
