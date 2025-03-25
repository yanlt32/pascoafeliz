import React, { useContext, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CartProvider, CartContext } from './context/CartContext';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import AllProducts from './pages/AllProducts';
import './styles/App.css';

// Importe as imagens corretamente
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
  { id: 1, name: 'Ovo de Páscoa Tortuguita 120g', price: 20.00, image: ovoTortuguita },
  { id: 2, name: 'Ovo de Páscoa Galak 155g', price: 20.00, image: ovoGalak },
  { id: 3, name: 'Ovo de Páscoa Diamante Negro 170g', price: 20.00, image: ovoDiamanteNegro },
  { id: 4, name: 'Caixa de Bombons Nestlé Especialidades 251g', price: 20.00, image: caixaNestleEspecialidades },
  { id: 5, name: 'Caixa de Bombons Lacta 250g', price: 20.00, image: caixaLacta },
  { id: 6, name: 'Caixa Ferrero Rocher 100g', price: 20.00, image: caixaFerreroRocher },
  { id: 7, name: 'Caixa Tortuguita Vibes Mix 134.5g', price: 20.00, image: caixaTortuguitaVibes },
  { id: 8, name: 'Ovo de Páscoa Talento Avelã 150g', price: 20.00, image: ovoTalentoAvela },
  { id: 9, name: 'Ovo de Páscoa Baton 130g', price: 20.00, image: ovoBaton },
  { id: 10, name: 'Ovo de Páscoa Laka 140g', price: 20.00, image: ovoLaka },
  { id: 11, name: 'Ovo de Páscoa Alpino 160g', price: 20.00, image: ovoAlpino },
  { id: 12, name: 'Ovo de Páscoa Kopenhagen Língua de Gato 170g', price: 20.00, image: ovoKopenhagenLinguaDeGato },
  { id: 13, name: 'Caixa de Bombons Garoto Sortidos 150g', price: 20.00, image: caixaGarotoSortidos },
  { id: 14, name: 'Caixa de Bombons Kopenhagen Clássicos 200g', price: 20.00, image: caixaKopenhagenClassicos },
  { id: 15, name: 'Caixa de Bombons Ouro Branco 120g', price: 20.00, image: caixaOuroBranco },
  { id: 16, name: 'Caixa de Bombons Bis 126g', price: 20.00, image: caixaBis }
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
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="logo">Páscoa Feliz</h1>
          <button onClick={() => setIsCartOpen(true)} className="cart-button">
            Carrinho ({cart.length})
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
            Veja Nossos Produtos
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="products-section">
        <h2>Produtos em Destaque</h2>
        <Carousel 
          showThumbs={false} 
          autoPlay 
          infiniteLoop 
          showStatus={false} 
          className="product-carousel"
        >
          {products.slice(0, 3).map(product => (
            <div key={product.id} className="carousel-item">
              <img src={product.image} alt={product.name} />
              <div className="carousel-legend">
                <p>{product.name}</p>
                <p>R$ {product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="product-grid">
          {products.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
        <div className="see-all-button-container">
          <Link to="/all-products" className="see-all-button">Ver Todos os Produtos</Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <h2>Por que Escolher Nossos Chocolates?</h2>
        <div className="why-choose-grid">
          <div className="why-choose-item">
            <h3>Ingredientes Premium</h3>
            <p>Usamos apenas cacau de origem sustentável e ingredientes naturais.</p>
          </div>
          <div className="why-choose-item">
            <h3>Feito com Carinho</h3>
            <p>Cada ovo e bombom é produzido com amor e cuidado artesanal.</p>
          </div>
          <div className="why-choose-item">
            <h3>Perfeito para Presentear</h3>
            <p>Embalagens elegantes para tornar sua Páscoa ainda mais especial.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Faça Sua Páscoa Mais Doce!</h2>
        <p>Compre agora e aproveite nossas promoções exclusivas.</p>
        <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
          Comprar Agora
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Páscoa Feliz. Todos os direitos reservados.</p>
      </footer>

      {/* Modal de Carrinho */}
      {isCartOpen && (
        <CartModal 
          cart={cart}
          removeFromCart={removeFromCart}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => setIsCheckoutOpen(true)}
        />
      )}

      {/* Modal de Checkout */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts products={products} addToCart={() => {}} />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}
