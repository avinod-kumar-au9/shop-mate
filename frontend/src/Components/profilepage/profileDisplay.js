import React from 'react'

const profile = (props) => {
    const{fnameRender,lnameRender,fname,lname,mailRender,emailid,phoneNumRender,phonenum,editRender,disable,
        saveRender,ferr,emaerr,numerr,aerr,gender,changegenderMale,changegenderFemale,showpsw,errs,isGoing,
        handleInputChange,passwords,passwordRender,cpswRender,cpsw
    }=props
  return (
    <div className="rightsection">
        <h5 className='sechead'>Personal Information</h5>
      <div  className='d-flex'>
      <div className="form-group">
        <div className="inputBox control-label col-sm-2">
            <input  type="text" name="fname" disabled={disable} required onChange={(e)=>fnameRender(e)} value={fname}/>
            <label>FirstName</label>
          </div>                                        
      </div>
     
      <div className="form-group">
        <div className="inputBox control-label col-sm-2">
            <input type="char"  name="lname" required disabled={disable}  onChange={(e)=>lnameRender(e)} value={lname}/>
            <label>LastName</label>
          </div>
      </div>
    </div>
    <p className='errmsg'>{ferr}</p>
    <h5 className='sechead'>Your Gender</h5>
    
    <div  className='d-flex'>
      <div className="form-group ml-3">
      <label className="radio mr-3">
        <input type="radio" name="options" value='male' checked={gender === "male"}  disabled={disable} onChange={(e)=>changegenderMale(e)}/> Male
        </label>
        <label className="radio">
            <input type="radio" name="options" value='female' checked={gender === "female"}  disabled={disable} onChange={(e)=>changegenderFemale(e)}/> Female
        </label>                                       
      </div>
    </div>
    <h5 className='sechead'>Email Address</h5>
    <div className="form-group">
        <div className="inputBox control-label col-sm-2">
            <input type="email" name="email" disabled={disable}  required onChange={(e)=>mailRender(e)} value={emailid}/>
            <label>Email</label>
          </div>
      </div>
      <p className='errmsg2'>{emaerr}</p> 
      <h5 className='sechead'>Mobile Number</h5>
      <div className="form-group">
        <div className="inputBox control-label col-sm-2">
            <input type="number" name="number" disabled={disable}  required  onChange={(e)=>phoneNumRender(e)} value={phonenum}/>
            <label>Phone number</label>
          </div>    
      </div>
      <p className='errmsg2'>{numerr}</p>
      <h5 className='sechead'>Change Password</h5>
      <div className='d-flex '>
        <div className="form-group ">
        <div className="inputBox control-label col-sm-2">
            <input  type={showpsw} disabled={disable}  required  onChange={(e)=>passwordRender(e)} value={passwords}/>
            <label>Password</label>
          </div>
        
      </div>
      
        <div className="form-group d-inline">
        <div className="inputBox control-label col-sm-2">
            <input type={showpsw} name="csw" disabled={disable} required onChange={(e)=>cpswRender(e)} value={cpsw}/>
            <label>ConformPassword</label>
          </div>

      </div>

      </div>
      <span className='errmsg'>{errs}</span>
      <div>
        <input className='ml-3' type="checkbox" checked={isGoing} disabled={disable}  onChange={(e)=>handleInputChange(e)} value={passwords}/>
        <label className='checkbox'>Show Password</label>
      </div>
      <p className='errmsg2'>{aerr}</p>

      {disable &&
      <button className='btn btn-primary ml-3 ' onClick={editRender}>Change/Edit</button>}
      {!disable &&
      <button className='btn btn-primary ml-3 ' onClick={saveRender}>Save</button>}
      
    </div>
    
  )
}

export default profile
