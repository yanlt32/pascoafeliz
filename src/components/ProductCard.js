import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>R$ {product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)} className="add-to-cart-button">
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductCard;