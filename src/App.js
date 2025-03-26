import React, { useContext, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { CartProvider, CartContext } from './context/CartContext';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import AllProducts from './pages/AllProducts';
import './styles/App.css';

// Importe as imagens
import ovoTortuguita from './assets/images/ovo-tortuguita-120g.jpg';
import ovoGalak from './assets/images/ovo-galak-155g.png';
import ovoDiamanteNegro from './assets/images/ovo-diamante-negro-170g.png';
import caixaNestleEspecialidades from './assets/images/caixa-nestle-especialidades-251g.png';
import caixaLacta from './assets/images/caixa-lacta-250g.png';
import caixaFerreroRocher from './assets/images/caixa-ferrero-rocher-100g.png';
import caixaTortuguitaVibes from './assets/images/caixa-tortuguita-vibes-mix-134-5g.jpg';
import ovoTalentoAvela from './assets/images/ovo-talento-avelã-150g.png';
import ovoBaton from './assets/images/ovo-baton-130g.png';
import ovoLaka from './assets/images/ovo-laka-140g.png';
import ovoAlpino from './assets/images/ovo-alpino-160g.png';
import ovoKopenhagenLinguaDeGato from './assets/images/ovo-kopenhagen-lingua-de-gato-170g.jpg';
import caixaGarotoSortidos from './assets/images/caixa-garoto-sortidos-150g.png';
import caixaKopenhagenClassicos from './assets/images/caixa-kopenhagen-classicos-200g.jpg';
import caixaOuroBranco from './assets/images/caixa-ouro-branco-120g.png';
import caixaBis from './assets/images/caixa-bis-126g.png';

const products = [
  { id: 1, name: 'Ovo de Páscoa Tortuguita 120g', price: 29.99, image: ovoTortuguita },
  { id: 2, name: 'Ovo de Páscoa Galak 155g', price: 59.99, image: ovoGalak },
  { id: 3, name: 'Ovo de Páscoa Diamante Negro 170g', price: 59.99, image: ovoDiamanteNegro },
  { id: 4, name: 'Caixa de Bombons Nestlé Especialidades 251g', price: 9.00, image: caixaNestleEspecialidades },
  { id: 5, name: 'Caixa de Bombons Lacta 250g', price: 9.00, image: caixaLacta },
  { id: 6, name: 'Caixa Ferrero Rocher 100g', price: 12.00, image: caixaFerreroRocher },
  { id: 7, name: 'Caixa Tortuguita Vibes Mix 134.5g', price: 12.00, image: caixaTortuguitaVibes },
  { id: 8, name: 'Ovo de Páscoa Talento Avelã 150g', price: 60.00, image: ovoTalentoAvela },
  { id: 9, name: 'Ovo de Páscoa Baton 130g', price: 49.99, image: ovoBaton },
  { id: 10, name: 'Ovo de Páscoa Laka 140g', price: 59.99, image: ovoLaka },
  { id: 11, name: 'Ovo de Páscoa Alpino 160g', price: 20.00, image: ovoAlpino },
  { id: 12, name: 'Ovo de Páscoa Kopenhagen Língua de Gato 170g', price: 30.00, image: ovoKopenhagenLinguaDeGato },
  { id: 13, name: 'Caixa de Bombons Garoto Sortidos 150g', price: 9.00, image: caixaGarotoSortidos },
  { id: 14, name: 'Caixa de Bombons Kopenhagen Clássicos 200g', price: 30.00, image: caixaKopenhagenClassicos },
  { id: 15, name: 'Caixa de Bombons Ouro Branco 120g', price: 10.00, image: caixaOuroBranco },
  { id: 16, name: 'Caixa de Bombons Bis 126g', price: 6.00, image: caixaBis },
];

function Home() {
  const { cart, setCart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-left">
          </div>
          <h1 className="logo">Páscoa Feliz</h1>
          <div className="header-right">
            <Link to="/all-products" className="icon-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a2c2a" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>
            <button className="icon-button cart-button" onClick={() => setIsCartOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a2c2a" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
        </div>
      </section>

      <section className="products-section">
        <h2>Produtos em Destaque</h2>
        <div className="home-product-grid">
          {products.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
        <div className="see-all-button-container">
          <Link to="/all-products" className="see-all-button">Ver Todos os Produtos</Link>
        </div>
      </section>

      <section className="why-choose-section">
        <h2>Por que Comprar Conosco?</h2>
        <div className="why-choose-grid">
          <div className="why-choose-item">
            <h3>Preços Imbatíveis</h3>
            <p>Oferecemos os melhores preços em ovos de Páscoa e bombons das marcas mais amadas.</p>
          </div>
          <div className="why-choose-item">
            <h3>Entrega Grátis</h3>
            <p>Entregamos seus chocolates em qualquer lugar, sem custo adicional.</p>
          </div>
          <div className="why-choose-item">
            <h3>Variedade para Todos</h3>
            <p>Uma ampla seleção de ovos e bombons para tornar sua Páscoa inesquecível.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>O que Nossos Clientes Dizem</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>{"\"Os melhores ovos de Páscoa que já provei! Super recomendo!\""}</p>
            <h4>- Ana S.</h4>
          </div>
          <div className="testimonial">
            <p>{"\"A caixa de bombons é perfeita para presentear. Todos amaram!\""}</p>
            <h4>- João P.</h4>
          </div>
          <div className="testimonial">
            <p>{"\"Adorei a qualidade e o sabor. Vou comprar novamente!\""}</p>
            <h4>- Maria L.</h4>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Faça Sua Páscoa Mais Doce!</h2>
        <p>Compre agora e aproveite nossas promoções exclusivas.</p>
        <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
          Comprar Agora
        </button>
      </section>

      <footer className="footer">
        <p>© 2025 Páscoa Feliz. Todos os direitos reservados.</p>
      </footer>

      {isCartOpen && (
        <CartModal 
          cart={cart}
          removeFromCart={removeFromCart}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => setIsCheckoutOpen(true)}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts products={products} />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}