import { useOutletContext } from "react-router";
import CartCard from "./CartCard/CartCard";
import styles from "./MyCart.module.css"

export default function MyCart() {
  const [cartItems, setCartItems] = useOutletContext();
  
  const removeFromCart = (cartItemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== cartItemId);
    setCartItems(updatedItems);
  }

  if (cartItems.length === 0) return <h2>There's nothing in your cart yet! Add some items from the shop!</h2>
  
  return (
    <main>
      <div>
        <ul className={styles.myCart}>
          {cartItems.map((cartItem) => (
            <CartCard key={cartItem.id}
                      cartItem={cartItem} 
                      handleRemoveFromCart={removeFromCart} />
          ))}
        </ul>
      </div>
    </main>
  );
}