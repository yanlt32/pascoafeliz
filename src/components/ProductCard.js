import React from 'react';
import '../styles/ProductCard.css';

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <p>R$ {product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
    </div>
  );
}

export default ProductCard;