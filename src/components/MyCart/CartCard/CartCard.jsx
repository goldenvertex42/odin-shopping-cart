import { useState } from "react";
import QuantityInput from "../../QuantityInput/QuantityInput";
import Button from "../../Button/Button";
import styles from "./CartCard.module.css"

export default function CartCard({ cartItem, handleRemoveFromCart }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const price = cartItem.price * quantity;

  return(
    <li className={styles.cartCard}>
      <img className={styles.cartItemImage} src={cartItem.image} alt={cartItem.title} />
      <p className={styles.cartItemTitle}>{cartItem.title}</p>
      <div className={styles.cartItemInfo}>
        <QuantityInput quantity={quantity} setQuantity={setQuantity} />
        <p>${Number(price).toFixed(2)}</p>
        <Button className={styles.removeBtn} onClick={() => handleRemoveFromCart(cartItem.id)}>Remove</Button>
      </div>
    </li>
  );
}