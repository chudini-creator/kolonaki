import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/Home/home';
import Shop from './pages/Shop/shop';
import Contact from './pages/Contact/contact';
import Products from './pages/Products/products';


function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sklep" element={<Shop />} />
              <Route path="/produkty" element={<Products />} />
              <Route path="/kontakt" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
