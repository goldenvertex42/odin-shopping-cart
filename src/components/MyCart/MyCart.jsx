import { useOutletContext } from "react-router";
import CartCard from "./CartCard/CartCard";
import styles from "./MyCart.module.css"

export default function MyCart() {
  const [cartItems, setCartItems] = useOutletContext();
  
  const removeFromCart = (cartItemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== cartItemId);
    setCartItems(updatedItems);
  }

  const onQuantityChange = (cartItemId, newQuantity) => {
    const updatedItems = [...cartItems];
    const itemIndex = updatedItems.findIndex((item) => item.id === cartItemId);
    updatedItems[itemIndex].quantity = newQuantity;
    setCartItems(updatedItems);
  }
  
  function PriceDisplay() {
    const cartSubTotal = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem.price * currentItem.quantity);
    }, 0);
    
    const cartTaxes = cartSubTotal * 0.08;

    const cartTotal = cartSubTotal + cartTaxes;

    const cartTotalQuantity = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.quantity;
    }, 0);

    return(
      <div className={styles.priceBox}>
        <div className={styles.priceLabels}>
          <p>Subtotal ({Number(cartTotalQuantity)} {cartTotalQuantity === 1 ? 'item' : 'items'}):</p>
          <p>Estimated Tax (8%):</p>
          <p><span className={styles.bold}>Total:</span></p>
        </div>
        <div className={styles.priceNumbers}>
          <p>${Number(cartSubTotal).toFixed(2)}</p>
          <p>${Number(cartTaxes).toFixed(2)}</p>
          <p>${Number(cartTotal).toFixed(2)}</p>
        </div>
      </div>
    );
  }
  
  if (cartItems.length === 0) return <h2>There's nothing in your cart yet! Add some items from the shop!</h2>
  
  return (
    <main>
      <div>
        <ul className={styles.myCart}>
          {cartItems.map((cartItem) => (
            <CartCard key={cartItem.id}
                      cartItem={cartItem} 
                      handleRemoveFromCart={removeFromCart} 
                      onQuantityChange={(newQuantity) => onQuantityChange(cartItem.id, newQuantity)} />
          ))}
        </ul>
        <hr />
        <PriceDisplay />
      </div>
    </main>
  );
}