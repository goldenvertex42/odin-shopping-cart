import { Link } from "react-router";
import styles from "./Header.module.css"

export default function Header({itemsInCart}) {
  return(
    <header className={styles.siteHeader}>
      <div className="storeName">
        <Link to="/">
        <h1>Brigid's General Store</h1>
        </Link>
      </div>
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/mycart">My Cart {itemsInCart === 0 ? null : `(${itemsInCart})`}</Link>
      </nav>
    </header>
  );
}