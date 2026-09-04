import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, PackageCheck, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import "./thankYouStyle.css";

function ThankYou() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order") || "KOL-1029";
  const total = searchParams.get("total");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="thankYouPage">
      <Helmet>
        <title>Dziękujemy za zamówienie • Kolonaki</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="thankYouContainer">
        <div className="thankYouHeader">
          <div className="badgeSuccess">
            <CheckCircle2 size={22} className="badgeSuccessIcon" />
            <span>Pomyślnie złożono zamówienie</span>
          </div>

          <h1 className="thankYouTitle">Dziękujemy za zaufanie.</h1>
          <p className="thankYouSubtitle">
            Twoja rzemieślnicza grecka oliwa właśnie wyrusza w podróż z gajów Peloponezu prosto do Twojego domu.
          </p>
        </div>

        <div className="orderSummaryReceipt">
          <div className="receiptHeader">
            <div>
              <span className="receiptLabel">Numer zamówienia</span>
              <h2 className="receiptOrderNumber">#{orderNumber}</h2>
            </div>
            {total && (
              <div className="receiptTotalWrap">
                <span className="receiptLabel">Wartość zamówienia</span>
                <span className="receiptTotalVal">{total}</span>
              </div>
            )}
          </div>

          <div className="receiptSteps">
            <div className="stepCard">
              <div className="stepIconWrap">
                <Mail size={20} />
              </div>
              <div className="stepContent">
                <h4>Potwierdzenie e-mail</h4>
                <p>Szczegóły zamówienia oraz potwierdzenie wysłaliśmy na podany adres e-mail.</p>
              </div>
            </div>

            <div className="stepCard">
              <div className="stepIconWrap">
                <PackageCheck size={20} />
              </div>
              <div className="stepContent">
                <h4>Przygotowanie do wysyłki</h4>
                <p>Bezpiecznie zabezpieczamy butelki w certyfikowane rękawy amortyzujące.</p>
              </div>
            </div>

            <div className="stepCard">
              <div className="stepIconWrap">
                <ShieldCheck size={20} />
              </div>
              <div className="stepContent">
                <h4>Śledzenie przesyłki</h4>
                <p>Gdy kurier odbierze paczkę, otrzymasz powiadomienie SMS oraz link do śledzenia.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="thankYouActions">
          <Link to="/sklep" className="btnBackShop">
            <span>Kontynuuj zakupy</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/" className="btnGoHome">
            Strona główna
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
