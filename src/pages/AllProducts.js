import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import CheckoutModal from '../components/CheckoutModal';
import '../styles/AllProducts.css';

function AllProducts({ products }) {
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
    <div className="all-products-page">
      <header className="header">
        <div className="container">
          <div className="header-left">
            <Link to="/" className="icon-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a2c2a" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>
          </div>
          <h1 className="logo">Páscoa Feliz</h1>
          <div className="header-right">
            <button
              className="icon-button cart-button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Abrir carrinho com ${cart.length} itens`}
            >
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

      <section className="all-products-section">
        <h2>Todos os Produtos</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
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

export default AllProducts;