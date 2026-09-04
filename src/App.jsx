import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/Home/home';
import Shop from './pages/Shop/shop';
import Contact from './pages/Contact/contact';
import Products from './pages/Products/products';
import History from './pages/History/history';
import About from './pages/About/about';
import ThankYou from './pages/ThankYou/thankYou';
import { CartProvider } from './context/CartContext';
import CartBarAndModal from './components/cart/cartBarAndModal';


function App() {

  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/o-nas" element={<About />} />
                <Route path="/sklep" element={<Shop />} />
                <Route path="/produkty" element={<Products />} />
                <Route path="/historia" element={<History />} />
                <Route path="/kontakt" element={<Contact />} />
                <Route path="/dziekujemy" element={<ThankYou />} />
              </Routes>
            </main>
            <Footer />
            <CartBarAndModal />
          </div>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  )
}

export default App
