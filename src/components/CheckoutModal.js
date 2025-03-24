import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CheckoutModal.css';

const CheckoutModal = ({ onClose }) => {
  const { cart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    email: '',
    cpf: '',
    address: '',
    cep: '',
    paymentMethod: 'pix',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    const order = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
      ...formData,
    };
    alert('Compra finalizada com sucesso!\\n' + JSON.stringify(order, null, 2));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Finalizar Compra</h2>
        <form onSubmit={handleSubmit}>
          <label>
            E-mail:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Endereço:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            CEP:
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Forma de Pagamento:
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              <option value="pix">PIX</option>
              <option value="card">Cartão de Crédito</option>
            </select>
          </label>
          <button type="submit">Pagar Agora</button>
          <button type="button" onClick={onClose} className="close-button">Fechar</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;