import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ProductCard from "./ProductCard/ProductCard";
import styles from "./Shop.module.css"

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useOutletContext();

  const addToCart = (product, quantity) => {
    const itemInCart = cartItems.some((item) => item.id === product.id);
    
    if (itemInCart) {
      setCartItems(cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, price: item.price * (item.quantity + quantity), quantity: item.quantity + quantity };
        }
        return item;
      }));
    } else {
        const updatedItems = [...cartItems, {id: product.id, title: product.title, image: product.image, price: product.price, quantity: quantity}];
        setCartItems(updatedItems);
      }
    }
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
  <main>
    <div>
      <ul className={styles.shop}>
        {products.map((product) => (
          <ProductCard key={product.id}
                       product={product} 
                       handleAddToCart={addToCart} />
        ))}
      </ul>
    </div>
  </main>
);
}