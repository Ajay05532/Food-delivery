import React from 'react'
import emptyCart from "../../assets/empty_cart.png";

const Cart = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center gap-2">
        <img 
            src={emptyCart} alt="Empty Cart" 
            className='w-64 h-64 object-contain'
        />
        <div className='flex flex-col gap-3 items-center'>
            <p className=''>Your cart is empty</p>
            <span className='font-light'>You can go to home page to view more restaurants</span>
            <button className='bg-orange-500 text-white px-4 py-2 rounded w-[190px]'>Go to Home</button>
        </div>
        
    </div>
  )
}

export default Cart
