import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";
import { useState } from 'react';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  
  const itemsInCart = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);
  
  return(
    <div className="mainContainer">
      <Header itemsInCart={itemsInCart} />
      <Outlet context={[cartItems, setCartItems]} />
      <Footer />
    </div>
  );
}
