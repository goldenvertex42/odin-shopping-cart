import styles from "./QuantityInput.module.css"

export default function QuantityInput({ quantity, setQuantity }) {
  function handleSubtractClick() {
    const newValue = quantity - 1;
    setQuantity(newValue);
  }

  function handleAddClick() {
    const newValue = quantity + 1;
    setQuantity(newValue);
  }

  function validateNumber(e) {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setQuantity(Number(inputValue));
    } else {
      alert('Please enter a valid number');
      e.target.value = 1;
    }
  }
  
  return(
    <div className={styles.quantityInputContainer}>
      <button className={styles.subtractBtn} onClick={handleSubtractClick} type="button">-</button>
      <input className={styles.quantityInput} type="text" value={quantity} name="product-quantity" onChange={validateNumber}/>
      <button className={styles.addBtn} onClick={handleAddClick} type="button">+</button>
    </div>
    );
}