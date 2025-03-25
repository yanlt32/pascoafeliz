import React from 'react';
import '../styles/CartModal.css';

const CartModal = ({ onClose, onCheckout, removeFromCart, cart }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Seu Carrinho</h2>
        {cart.length === 0 ? (
          <div>
            <p>Seu carrinho está vazio.</p>
            <button onClick={onClose} className="back-button">Voltar</button>
          </div>
        ) : (
          <div>
            <ul className="cart-items">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <p>{item.name}</p>
                    <p>R$ {item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="remove-button">
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <p>Total: R$ {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
            </div>
            <div className="modal-buttons">
              <button onClick={onClose} className="close-button">Fechar</button>
              <button onClick={onCheckout} className="checkout-button">Finalizar Compra</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;