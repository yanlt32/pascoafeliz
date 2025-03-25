import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import CheckoutModal from '../components/CheckoutModal';
import '../styles/AllProducts.css'; // Importação do CSS do AllProducts

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
          <h1 className="logo">Páscoa Feliz</h1>
          <div className="header-buttons">
            <Link to="/" className="back-button">Voltar</Link>
            <button className="cart-button" onClick={() => setIsCartOpen(true)}>
              Carrinho ({cart.length})
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