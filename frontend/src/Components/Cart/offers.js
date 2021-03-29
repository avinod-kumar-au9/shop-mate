import React,{useState} from 'react'
import {connect} from 'react-redux'
import {discountAdd}  from '../../Actions/userActions'
import {withRouter} from "react-router-dom"

const Offers = (props) => {
    const {id,coupon,discount} = props
    const [couponcode,setCouponcode]=useState('')
    const [err,setErr]=useState('')
    const [idOfitem,setIdOfitem]=useState('')
    const [discountadd,setDiscountadd]=useState(false)

    const code=(e)=>{
        setCouponcode(e.target.value)
      }

      const selectperticularitem=(e)=>{ 
        setIdOfitem(e.target.value)
        setDiscountadd(true)
      }
      const closecoupon=(e)=>{ 
        setDiscountadd(false)
        setErr('')
      }
     
      const submitCouponCode=()=>{
        if(couponcode === 'SAVE 50'){
          setErr('')
            props.dispatch(discountAdd(idOfitem)) 
        }else{
          setErr('Coupon Code is not match')
        }    
      }
  
  return (
    <div className='offersection'>
        {discount === '50' &&
        <div className='ml-2 mt-2 offerhead'>Applied Rs.50 discount</div>}
         {discount=== '0' && coupon &&
        <>
      <option className='ml-2 mt-2 offerhead' value={id} onClick={selectperticularitem} >Got Coupon?
</option>
        
       {discountadd &&  id === idOfitem &&
          <div >
        <label ><input className='inputfield mt-2' placeholder='Enter Coupon' onChange={code}></input></label> 
        <p style={{color:'red'}}>{err}</p>
        <button className='btn btn-danger mr-2' onClick={closecoupon}>Close</button>
        <button className='btn btn-success' onClick={submitCouponCode}>Apply</button>
      
       </div>
      }
        
        </>
        }
    </div>
  )
}

function mapStateToProps(state){
    return{
   
    }   
}
export default withRouter(connect(mapStateToProps)(Offers))

