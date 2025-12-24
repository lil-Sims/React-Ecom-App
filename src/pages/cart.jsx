import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectTotalCount,
  selectTotalPrice,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
} from '../store/cartSlice';
import { useState } from 'react';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalCount = useSelector(selectTotalCount);
  const totalPrice = useSelector(selectTotalPrice);
  const [message, setMessage] = useState('');

  const handleCheckout = () => {
    dispatch(clearCart());
    setMessage('Checkout successful! Your cart has been cleared.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <section>
      <h2>Your Cart</h2>
      {message && <div className="success">{message}</div>}
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image || 'https://via.placeholder.com/100x100?text=No+Image'} alt={item.title} onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/100x100?text=No+Image'} />
                <div className="info">
                  <h3>{item.title}</h3>
                  <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                  <p><strong>Count:</strong> {item.count}</p>
                  <div className="actions">
                    <button onClick={() => dispatch(decrementItem(item.id))}>-</button>
                    <button onClick={() => dispatch(incrementItem(item.id))}>+</button>
                    <button className="remove" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="totals">
            <p><strong>Total items:</strong> {totalCount}</p>
            <p><strong>Total price:</strong> ${totalPrice.toFixed(2)}</p>
          </div>

          <button className="checkout" onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </section>
  );
}
