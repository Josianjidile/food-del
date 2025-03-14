import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../../context/storeContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
   const navigate =useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>items</p>
          <p>title</p>
          <p>price</p>
          <p>quantity</p>
          <p>total</p>
          <p>remove</p>
        </div>
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="cart-items-titles cart-items-item">
               <img src={item.image} alt="" />
               <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p>x</p>
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>cart total</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>delivery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <div className="cart-total-details">
            <b>total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            <button onClick={()=>navigate('/placeorder')}>PROCEED CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>if you have promocode, enter it here</p>
                 <div className="cart-promocode-input">
                  <input type="text" placeholder="promo code" />
                  <button>submit</button>
                 </div>
 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
