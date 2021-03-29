import React from 'react'
import {Link} from 'react-router-dom'
import './order.scss'
import img from '../images/Empty-Cart.svg'

const OrderDisplay = (props) => {
  const {orderlist} = props

  const orederList=()=>{
    return orderlist.map((item,idx)=>{
      return<div div key={idx}> 
      <div className='row mt-2 pl-3 orderlistline'>
      
       <div className='col-md-2 mt-2 imgdiv'>
          <center> <img src={item.img} alt='' className='cartimg' /></center>  
           </div>
           <div className='col-md-5 orderdetails'>
             <div><Link style={{color:'black',textDecoration:"none"}} to={`/details/${item.productId}`}>{item.name.slice(0, 50)}...</Link></div>
             <div className='features'>{item.color}</div>
             {item.size !== '0' &&
             <div  className='features'>Size:<span className='pl-1'>{item.size}</span></div>}
             <div  className='features pb-2 mt-2'>Seller:<span className='pl-1'>{item.sellerCompany}</span></div>
             <div className='date colorlight'> Ordered on {item.orderedDate.split('T')[0]}</div>
             </div>
             <div className='col-md-2'>
             { item.discount?
             <h6 >₹{((item.price - item.discount)*(item.quantity)).toLocaleString()}</h6> 
            :
             <h6 >₹{(item.price *(item.quantity)).toLocaleString()}</h6> }
          
           </div>
           <div className='col-md-3'>
           {item.orderConformStatus === 'Pending'?
           <div  className='date '>Status {item.orderConformStatus}...</div>:
           <div className='date '> {item.orderConformStatus} on {item.deliveredDate.split('T')[0]}</div>}
         </div>
         
        
         </div>
         <hr/>
         </div>
         })
         
  }
  return (
    <div className='orderlist pt-2 detaildata'>
      {orderlist && orderlist.length > 0?
     <>
        <h5 className='mt-2 ml-4'>My Orders ({orderlist.length})</h5> 
        <hr/>
        {orederList()}
        </>
     :
        <div className='cartEmpty p-3'>
        <div style={{height:'15vh'}}>MY ORDERS </div>
        <center><img src={img} alt='' className='cartemptyimg'></img>
        <h4 className='mt-4'>Your order is empty!</h4>
        <p>Buy items now.</p>
        <button className='btn btn-primary mb-5'><Link style={{textDecoration:'none',color:'white'}}
         to={'/list?category=Electronics'}>SHOP NOW</Link></button></center>
    </div>
    }
    </div>
  
  )
}

export default OrderDisplay
