import styles from "./ProductCard.module.css"
import Button from "../../Button/Button";
import QuantityInput from "../../QuantityInput/QuantityInput";
import { useState } from "react";

export default function ProductCard({ product, handleAddToCart }) {
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  
  return(
    <li className={styles.productCard}>
      <h2 className={styles.productTitle}>{product.title}</h2>
      <img className={styles.productImage} src={product.image} alt={product.title} />
      <div className={styles.productInfo}>
        <p>${Number(product.price).toFixed(2)}</p>
        <QuantityInput quantity={quantityToAdd} setQuantity={setQuantityToAdd} />
        <Button onClick={() => handleAddToCart(product, quantityToAdd)}>Add to Cart</Button>
      </div>
    </li>
  );
}