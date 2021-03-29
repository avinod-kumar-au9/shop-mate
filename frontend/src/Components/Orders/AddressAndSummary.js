import React, { useEffect, useState } from 'react'
import './order.scss'
import ProductDisplay from '../Cart/productdisplay'
import Sidebar from '../Cart/Sidebar'
import Payment from './Payment'
import Loader from "../images/Loader.txt"

const Summary = (props) => {
  const {addAdress,detaildata,quantity,orders,allProDetail,Props}=props
  const [details,setDetails] = useState('')
  const [phonenum,setPhonenum] = useState('')
  const [pincode,setPincode] = useState('')
  const [adress,setAdress] = useState('')
  const [err,setErr] = useState('')
  const [adressbtn,setAdressbtn] = useState(false)
  const [addresConform,setAddresConform] = useState('')
  const [amt,setAmt] = useState('')
  const [disamt,setDisAmt] = useState('')

  const [loader,setLoader] = useState(false)

  // const [payment,setPayment] = useState(false)
  useEffect(()=>{
    setLoader(false)
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  },[])

  useEffect(()=>{
    setDetails(detaildata)
  },[detaildata])

  const phoneNumRender=(e)=>{
    setPhonenum(e.target.value)
  }
  const pincodeRender=(e)=>{
    setPincode(e.target.value)
  }
  const adressRender=(e)=>{
    setAdress(e.target.value)
  }

  const addAdressRender=()=>{
    if(adressbtn){
      setAdressbtn(false)
    }else{
      setAdressbtn(true)
    }
    
  }

  const Totalamount=(t)=>{
    setAmt(t)
  }
  const discountamt=(t)=>{
    setDisAmt(t)
  }

  const deliveryAdressRender=()=>{
    if(phonenum.length < 10 || pincode.length <6 || adress.length < 5){
      setErr('Please give valid details')
    }
    else{
      addAdress(phonenum,pincode,adress)
      setAdressbtn(false)
    } 
  }

  const adrdresselected=(e)=>{
    setAddresConform(e.target.value)
  }

  const loaderRender=()=>{
    setLoader(true)
  }

  const detailadressRender=()=>{
    
    return details.data.deliveryAdress.map((item,idx)=>{
      return(
        <div className='orderadress sectionaddress' key={idx}>
        <div className='d-block pt-3'>
       
        <label htmlFor={item._id} className='ml-3 d-flex'>
        <input className='mt-1 mr-3' type="radio" name="address" value={item._id} id={item._id} onChange={adrdresselected}></input>
        <h6>{details.data.givenName} <span className='stamp ml-3'>HOME</span> <span className='ml-3'>{item.phoneNumber}</span></h6>
        </label>
        <div className='ml-4 mb-3'>{item.adress} - {item.pincode}</div>
       
        
       </div>
       
       </div>
      )
    })
  }

  const conformPayment=()=>{
        orders(addresConform)
        Props.history.push('/orders')
  }

  return (
    <>
    {details &&
    <>
    <div className='order row '>
      <div className='col-md-8 col-sm-6 mt-4 ordersection'>
     
        <div>
          
          {details.data.deliveryAdress.length > 0 &&
          <>
          <div className='adresshead bg-primary'>DELIVERY ADDRESS</div> 
          <div>
          {detailadressRender()}
          </div>
         </>
         
          } 
        </div>
      <h5 className='mt-2 p-2 orderadress text-primary' onClick={addAdressRender}><i className="fas fa-plus mr-3"></i>Add new adress</h5>

        {adressbtn &&
        <div className='adressip pt-3 pb-3'>
      <div className="form-group mt-2">
        <div className="inputBox control-label col-sm-2">
            <input type="number" name="number"  required  onChange={(e)=>phoneNumRender(e)} value={phonenum}/>
            <label>Phonenumber</label>
          </div>    
      </div>
      <div className="form-group mt-4">
        <div className="inputBox control-label col-sm-2">
            <input type="number" name="number" required  onChange={(e)=>pincodeRender(e)} value={pincode}/>
            <label>Pincode</label>
          </div>    
      </div>
        <h5 className='sechead'>AddAdress</h5>
      <div className="form-group">
        <div className=" control-label col-sm-2">
            <textarea type="text" rows="4" cols="29" placeholder='Add adress' required onChange={(e)=>adressRender(e)} value={adress}/>
          </div>    
      </div>
      <span style={{color:'red'}}>{err}</span>
      <button className='btn btn-danger ml-3' onClick={deliveryAdressRender}>SAVE</button>
      </div>
        }
        {addresConform &&
        <>
      <div className='mt-3'>
      <div className='adresshead bg-primary'>ORDER SUMMARY</div> 
      
      <div className='bg-white p-2'>
      <ProductDisplay cartItems={details} quantity={quantity}
       TotalAmt={(t)=>Totalamount(t)} 
      discountAmt={(t)=>discountamt(t)} allProDetail={allProDetail}/>
      </div>  
      </div>

      </>
      }
      </div>
   
     
       
      <div className='col-md-3 col-sm-6 mt-4 mb-3 rightcol'>
        <Sidebar length={details.data.cart.length} Totalamt={amt} DiscountAmt={disamt}/>
        </div>
      
      
    </div>
    
    {addresConform &&
      <div className='col-md-8 col-sm-6 p-2 mb-5'>
      <Payment Totalamt={(amt-disamt)} loaderRender={loaderRender} paymentConform={()=>conformPayment()}/>
      </div>}
   
    
    </>
    }
    {loader &&
    <div className='loaderinorder'>
    <img loader className="loaderorder" alt='' src={Loader} />
    </div>}
</>
  )
}

export default Summary
