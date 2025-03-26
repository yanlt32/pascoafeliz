import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CheckoutModal.css';

const CheckoutModal = ({ onClose }) => {
  const { cart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    address: '',
    cep: '',
    residenceType: 'casa',
    paymentMethod: 'pix',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para buscar endereço via API do ViaCEP
  const handleCepBlur = async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData({ ...formData, address: `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}` });
        } else {
          alert('CEP não encontrado! Verifique e tente novamente.');
        }
      } catch (error) {
        alert('Erro ao buscar o CEP. Tente novamente.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert(' Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.');
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderDetails = cart.map(item => `📌 ${item.name} - R$${item.price.toFixed(2)}`).join('\n');

    const message = `🚀 *Novo Pedido Realizado!*\n\n` +
                    `👤 *Nome:* ${formData.name}\n` +
                    `📧 *E-mail:* ${formData.email}\n` +
                    `🆔 *CPF:* ${formData.cpf}\n` +
                    `🏠 *Endereço:* ${formData.address}\n` +
                    `🏡 *Tipo de residência:* ${formData.residenceType}\n` +
                    `📌 *CEP:* ${formData.cep}\n\n` +
                    `🛍️ *Itens do pedido:*\n${orderDetails}\n\n` +
                    `💰 *Total a pagar:* R$${total.toFixed(2)}\n` +
                    `💳 *Forma de pagamento:* PIX\n\n` +
                    `✅ *Aguardo os detalhes do pagamento!*`;

    const encodedMessage = encodeURIComponent(message);

    alert('✅ Compra finalizada! Você será redirecionado ao WhatsApp para concluir o pagamento.');
    window.location.href = `https://wa.me/5511962094589?text=${encodedMessage}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2> Finalizar Compra</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome Completo:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
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
            CEP:
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              onBlur={handleCepBlur}
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
            Tipo de residência:
            <select name="residenceType" value={formData.residenceType} onChange={handleChange}>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
            </select>
          </label>
          <label>
            Forma de Pagamento:
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              <option value="pix">PIX</option>
            </select>
          </label>
          <button type="submit"> Pagar Agora</button>
          <button type="button" onClick={onClose} className="close-button"> Fechar</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
