import styles from "./QuantityInput.module.css"

let idCounter = 0;

export default function QuantityInput({ quantity, setQuantity }) {
  const inputId = `product-quantity-${idCounter++}`;
  
  function handleSubtractClick() {
    if (quantity === 1) {
      return;
    }
    const newValue = quantity - 1;
    setQuantity(newValue);
  }

  function handleAddClick() {
    const newValue = quantity + 1;
    setQuantity(newValue);
  }

  function validateNumber(e) {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue)) && Number(inputValue) !== 0) {
      setQuantity(Number(inputValue));
    } else if (Number(inputValue) === 0) {
      setQuantity(1);
    } else {
      alert('Please enter a valid number');
      e.target.value = 1;
    }
  }
  
  return(
    <div className={styles.quantityInputContainer}>
      <button className={styles.subtractBtn} onClick={handleSubtractClick} type="button">-</button>
      <label htmlFor={inputId} className={styles.visuallyHidden}>Quantity:</label>
      <input className={styles.quantityInput} type="text" placeholder={quantity} name="product-quantity" id={inputId} onChange={validateNumber}/>
      <button className={styles.addBtn} onClick={handleAddClick} type="button">+</button>
    </div>
    );
}