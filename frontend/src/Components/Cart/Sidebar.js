import React from 'react'
import './cart.scss'

const Sidebar = (props) => {
    const {Totalamt,length,DiscountAmt} = props
  return (
    <div className='sidebar p-3'>
     
        <h6 className=' quantitydesign'>PRICE DETAILS</h6>
        <hr/>
        <div className='sidebardata'>
          <div className=''>
            <div>Price({length} items)<span className='amountdetail'>₹ {Totalamt.toLocaleString()}
            </span></div>
          <div className='mt-3'>
            <div>Delivery Charges<span className='amountdetail highlight'>FREE</span></div>
            </div>
          <div className='mt-3'>
            <div>Discount<span className='amountdetail highlight'>- {DiscountAmt}</span></div>
            </div>
          </div>
          </div>
            <hr/>
            <h5>
            <div>Total Amount<span className='amountdetail'>₹ {(Totalamt-DiscountAmt).toLocaleString()}</span></div>
          </h5>
      
          
    </div>
  )
}

export default Sidebar
