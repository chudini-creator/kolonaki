import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from './components/header/header';
import Home from './pages/Home/home';
import Shop from './pages/Shop/shop';


function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
