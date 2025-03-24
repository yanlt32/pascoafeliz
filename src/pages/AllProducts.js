import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import CheckoutModal from '../components/CheckoutModal';
import PromocaoCoelho from '../components/PromocaoCoelho';
import '../styles/AllProducts.css';
import '../styles/App.css';

const AllProducts = ({ products }) => {
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
          <Link to="/" className="logo-link">
            <h1 className="logo">Páscoa Feliz</h1>
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="cart-button">
            Carrinho ({cart.length})
          </button>
        </div>
      </header>

      {/* Botão de Voltar */}
      <div className="container">
        <Link to="/" className="back-button"> Voltar para a Página Inicial</Link>
      </div>

      {/* Conteúdo da página */}
      <div className="all-products">
        <h2>Todos os Produtos</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>2025 Páscoa Feliz - Todos os direitos reservados</p>
      </footer>

      {/* Coelho da Promoção */}
      <PromocaoCoelho />

      {/* Modals */}
      {isCartOpen && (
        <CartModal
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      )}
      {isCheckoutOpen && <CheckoutModal onClose={() => setIsCheckoutOpen(false)} cart={cart} />}
    </div>
  );
};

export default AllProducts;