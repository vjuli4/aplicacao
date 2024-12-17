import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { items, updateItemQuantity } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `US$ ${totalPrice.toFixed(2)}`;

  return (

    <div className="checkout">
      <h1>Checkout</h1>
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul className="checkout-items">
          {items.map((item) => {
            const formattedPrice = `US$ ${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <img src={item.thumbnail} alt={item.title} />
                  <span>{item.title}</span>
                  <span> {formattedPrice}</span>
                  <div className="cart-item-actions">
                    <button onClick={() => updateItemQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateItemQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
      <Link to="/" className="product-actions">
        <button>RETURN</button>
      </Link>
    </div>
  );
}