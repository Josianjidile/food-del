import React, { useContext } from 'react'
import  './PlaceOrder.css'
import { StoreContext } from '../../../context/storeContext';

const PlaceOrder = () => {

  const {  getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>delivery information</p>
        <div className="multiple-fields">
          <input type="text" placeholder='first name'/>
          <input type="text" placeholder='last name'/>
        </div>
        <input type="email" placeholder='email address' />
        <input type="text" placeholder='street' />
        <div className="multiple-fields">
        <input type="text" placeholder=' city' />
        <input type="text" placeholder='state' />
        </div>
        <div className="multiple-fields">
        <input type="text" placeholder='zip code' />
        <input type="text" placeholder='country' />
        </div>
        <input type="text" placeholder='phone' />
        <div className="cart-total">
          <h2>cart total</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>delivery fee</p>
              <p>{getTotalCartAmount()===0?0:2}</p>
            </div>
            <div className="cart-total-details">
            <b>total</b>
            <b>{getTotalCartAmount()+2}</b>
            </div>
            <button >PROCEED PAYMENT</button>
          </div>
          <div className="cart-promocode">
            <div>
             
 
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder