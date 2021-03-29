import React, {useState } from 'react'
import {Link} from 'react-router-dom'
import Offers from './offers'

const Productdisplay = (props) => {
    const {cartItems,quantity,deleteItem,TotalAmt,allProDetail,discountAmt} = props
    const [stocklimit,setStocklimit]=useState('')
    const [pertiId,setPertiId]=useState('')

  const reduceQuantity=(q,id,pid)=>{
    if(q > 1){
      var qty = q-1 
        setStocklimit('') 
        quantity(id,qty,pid)  
    }
  }

  const increaseQuantity=(q,id,pid,color)=>{
    setPertiId(id)
    var qty = parseInt(q) + 1
   
    for(var i=0;i< allProDetail.length;i++){
      if(allProDetail[i]._id === pid){
        for(var j=0;j< allProDetail[i].availableColours.length;j++){
          if(allProDetail[i].availableColours[j].colour === color){
            var stock =allProDetail[i].availableColours[j].stock
            if(qty > stock){
              setStocklimit(`Available only ${stock} items`)
            }else{
              quantity(id,qty) 
              setStocklimit('') 
            }
          }
        }  
      }
    }
  }



  const removeRender=(id)=>{
    deleteItem(id)
  }

  var Totalamt=0
 
  const totalamount=(p)=>{
    Totalamt += parseInt(p)
    TotalAmt(Totalamt)
  }

  var discount = 0

  const discountamount=(d)=>{
    discount +=  parseInt(d)
    discountAmt(discount)
  }

  const functionrender=(item,num)=>{
    return(
      <>
    <div className='row'  key={item._id}>
             
          <div className='col-md-2 pt-3'>
         <center> <img src={item.img} alt='' className='cartimg' /></center>
          
          </div>
          <div className='col-md-7 pl-4 cartdetails'>
            <div><Link style={{color:'black',textDecoration:"none"}} to={`/details/${item.productId}`}>{item.name.slice(0, 50)}...</Link></div>
            <div className='features'>{item.color}</div>
            {item.size !== '0' &&
            <div  className='features'>Size:<span className='pl-1'>{item.size}</span></div>}
            <div  className='features pb-2 mt-2'>Seller:<span className='pl-1'>{item.sellerCompany}</span></div>
            { item.discount ==='50'?
            <div className='d-flex'>
            <h5 >₹{(item.price - item.discount).toLocaleString()}</h5> <span className='strikedata ml-3 mt-1'>{(item.price-0).toLocaleString()}</span>
            </div>:
            <h5 >₹{(item.price-0).toLocaleString()}</h5> }
        
          </div>
          {num === 1 &&
          <div className='deliverydet col-sm-6 col-md-3'>{item.delivered}</div>}
        </div>
        <div className='row pt-2'>
          {num === 1 &&
          <div className='col-lg-2 col-md-5 col-sm-6 col-xs-6 mt-2'>
          <div className='quantitydesign'>
          <span className='carticons ml-1'  onClick={()=>reduceQuantity(item.quantity,item._id,item.productId,item.color)}>
            <svg className='svgimg bi bi-dash-circle' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
</svg>
</span>
        <span className='quantity mr-1 '>{item.quantity}</span>
        <span className='carticons'  onClick={()=>increaseQuantity(item.quantity,item._id,item.productId,item.color)}>
          <svg className='svgimg bi bi-plus-circle' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg> </span> </div> 
         
          </div>}
         
          <div className='col-md-7 col-sm-6 col-xs-6 d-flex removebtnincart'> 
          {sessionStorage.getItem('page') === 'cart' &&
          <div><div className='removebtn mt-2 pl-2' onClick={()=>removeRender(item._id)}>REMOVE</div>
           </div>}
           
       
        <Offers id={item._id} coupon={item.coupon}  discount={item.discount}/>
        {pertiId === item._id &&
            <span className='ml-3 mt-2' style={{color:'red'}} >{stocklimit}</span>}
      
      </div>
         
  </div>
  
  </>
    )
  }



  return (
    <div>
      {cartItems && cartItems.data.cart.map((item,idx)=>{
        return(
         
          <div className='detaildata' key={idx}>
            {allProDetail.map(data=>{
            if(data._id===item.productId){
              return data.availableColours.map((color,idx)=>{
                    if(color.colour === item.color) {
                     if(color.stock >= item.quantity){
                       return( 
                        <div key={idx}>
                         {functionrender(item,1)}
                         </div>
                       
                        ) 
                     }else{
                       return(
                         <div className='pb-5 outofStock' key={idx}>
                     
                      {functionrender(item,0)}
                      <center> <div className='sectionstock mt-2 pl-2'>
                         <h4>OUT OF STOCK</h4>
                      </div></center>
                      </div>
                      )
                     }
                    } 
               })
              
             }
            })}
           

            {item.discount &&
            discountamount(item.discount*item.quantity)}
            {totalamount(item.price*item.quantity)}

           <hr/>
          </div>
        )
      })}
    </div>
  )
}

export default Productdisplay
