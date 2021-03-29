import React, { useEffect, useState } from 'react'
import './cart.scss'
import Sidebar from './Sidebar'
import img from '../images/Empty-Cart.svg'
import ProductDisplay from './productdisplay'
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'

const CartDisplay = (props) => {
  const {cartitem,quantity,deleteItem,allProDetail} = props
  const [cartItems,setCartitems]=useState('')
  const [amt,setAmt] = useState('')
  const [disamt,setDisAmt] = useState('')

  const history = useHistory();

  useEffect(()=>{
    setCartitems(cartitem)
  },[cartitem])


  const Totalamount=(t)=>{
    setAmt(t)
  }
  const discountamt=(t)=>{
    setDisAmt(t)
  }

  const orederClickRender=()=>{
   history.push('./orderpreview')
   sessionStorage.setItem('orderClick','cart')
  }

  return (
    <div className='cartdis'>
    {cartItems && cartItems.data.cart.length > 0?
    <>
   <div className='row '>
      <div className='col-md-8 mt-4 cartdisplay mb-4 pt-2'>
       <h5> My Cart({cartItems.data.cart.length})</h5>
      <hr/>
       <ProductDisplay cartItems={cartItems} quantity={quantity}  deleteItem={deleteItem}
        allProDetail={allProDetail}
        TotalAmt={(t)=>Totalamount(t)}  discountAmt={(t)=>discountamt(t)}
        />
     
      </div>
      <div className='col-md-3 mb-5 mt-4 '>
        <Sidebar length={cartItems.data.cart.length} Totalamt={amt} DiscountAmt={disamt}/>
      
        </div>
      </div>
      <div className='col-md-8 '>
          <button className='btn btn-danger orederbtn ' onClick={orederClickRender}>PLACE ORDER</button>
      </div>
      </>:
      <div className='cartEmpty'>
        <div style={{height:'15vh'}}>MY CART </div>
        <center><img src={img} alt='' className='cartemptyimg'></img>
        <h4 className='mt-4'>Your cart is empty!</h4>
        <p>Add items to it now.</p>
        <button className='btn btn-primary mb-5'><Link style={{textDecoration:'none',color:'white'}} to={'/list?category=Electronics'}>SHOP NOW</Link></button></center>
        </div> 
    }
    </div>
  )
}

export default CartDisplay
