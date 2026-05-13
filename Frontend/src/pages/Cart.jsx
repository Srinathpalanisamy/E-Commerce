import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import "./cart.css";

const SHIPPING_FEE = 49;

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const getItemQuantity = (item) => item.quantity ?? 1;

  const handleIncrease = (item) => {
    updateQuantity(item.id, 1);
  };

  const handleDecrease = (item) => {
    const currentQuantity = getItemQuantity(item);

    if (currentQuantity <= 1) {
      return;
    }

    updateQuantity(item.id, -1);
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * getItemQuantity(item),
    0
  );
  const shipping = cart.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;
  const totalItems = cart.reduce(
    (count, item) => count + getItemQuantity(item),
    0
  );

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-shell cart-empty-state">
          <div className="cart-empty-icon">
            <FiShoppingBag />
          </div>
          <h1>Your cart is empty</h1>
          <p>Add a few favorites and they will show up here.</p>
          <button
            type="button"
            className="cart-primary-button"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-shell">
        <div className="cart-header">
          <div>
            <p className="cart-eyebrow">Your bag</p>
            <h1>Shopping Cart</h1>
            <p className="cart-subtitle">
              Review your items, update quantities, and head to checkout.
            </p>
          </div>
          <div className="cart-badge">{totalItems} items</div>
        </div>

        <div className="cart-layout">
          <div className="cart-items-panel">
            {cart.map((item) => {
              const itemQuantity = getItemQuantity(item);
              const itemTotal = item.price * itemQuantity;
              const itemCategory = item.category || "Everyday Essentials";

              return (
                <article className="cart-card" key={item.id}>
                  <div className="cart-image-wrap">
                    <img src={item.image} alt={item.name} className="cart-image" />
                  </div>

                  <div className="cart-item-content">
                    <div className="cart-item-top">
                      <div>
                        <p className="cart-category">{itemCategory}</p>
                        <h2>{item.name}</h2>
                      </div>

                      <button
                        type="button"
                        className="cart-delete-button"
                        onClick={() => handleRemove(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-price-group">
                        <p className="cart-price-label">Price</p>
                        <strong>{formatCurrency(item.price)}</strong>
                      </div>

                      <div className="cart-quantity-wrap">
                        <p className="cart-price-label">Quantity</p>
                        <div className="cart-quantity-box">
                          <button
                            type="button"
                            className="cart-quantity-button"
                            onClick={() => handleDecrease(item)}
                            disabled={itemQuantity <= 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <FiMinus />
                          </button>

                          <span className="cart-quantity-value">{itemQuantity}</span>

                          <button
                            type="button"
                            className="cart-quantity-button"
                            onClick={() => handleIncrease(item)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>

                      <div className="cart-price-group cart-item-total">
                        <p className="cart-price-label">Total</p>
                        <strong>{formatCurrency(itemTotal)}</strong>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="cart-summary">
            <p className="cart-eyebrow">Checkout</p>
            <h2>Order Summary</h2>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>

            <div className="cart-summary-row">
              <span>Shipping</span>
              <strong>{formatCurrency(shipping)}</strong>
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>

            <button
              type="button"
              className="cart-primary-button cart-checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
              <FiArrowRight />
            </button>

            <p className="cart-summary-note">
              Taxes and discounts will be calculated at the next step.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;
