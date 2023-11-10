import { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);  // Kiểm tra user ấn order chưa
  const [isSubmitted, setIsSubmitted] = useState(false);  // Kiểm tra request order lên server chưa
  const [isSuccess, setIsSuccess] = useState(true); // Kiểm tra trạng thái request

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async userData => {
    try {
      const res = await fetch(
        'https://my-test-696e5-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!res.ok) {
        throw new Error('Request failed');
      }
      // Reset cart nếu đã order thành công
      cartCtx.resetCart();
    } catch (error) {
      setIsSuccess(false);
      console.error(error.message)
    }

    setIsSubmitted(true);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const CartContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );
  const SubmittedContent = (
    <>
      {isSuccess ? (
        <p>Ordered successfully 😊😊😊</p>
      ) : (
        <p>Something went wrong ...</p>
      )}
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {isSubmitted ? SubmittedContent : CartContent}
    </Modal>
  );
};

export default Cart;
