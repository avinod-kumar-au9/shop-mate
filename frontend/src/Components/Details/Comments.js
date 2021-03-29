import React,{ useState } from 'react'

const Comments = (props) => { 
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [rating,setRating]=useState('')
  const [err,setErr]=useState('')
  const [btn,setBtn]=useState(false)
  const [reviewbtn,setReviewbtn]=useState(true)



  const ratingSubmit=()=>{
    if(!title || !rating){
      setErr('Please provide title and rating')
    }else{
      setBtn(false)
      props.commentpostdetails(title,description,rating)
      setTitle('')
      setDescription('')
      setRating('')
      setErr('')
      setReviewbtn(true)
    }
  }


  const commentsList=()=>{
     return props.comments.map(item=>{
        return(
          <div key={item._id}>
          <div> <span className='listrating'>{item.rating} 
            <span className="material-icons listrating">star_border</span></span><span className='pl-2'>{item.title}</span></div>
          <div>{item.description}</div>
          <div className='sidehead username' ><span>{item.name}</span><span className='ml-5'>{item.date.toString().split('T')[0]}</span></div>
          <div className='sidehead randonicon'><i className="fas fa-check-circle"></i>Certified Buyer</div>
          <hr/>
          </div>
          )
      })
  }


  const setField=()=>{
    if (!props.pdata || (props.pdata && !props.pdata.data)) {
      setBtn(false)
      props.login() 
    }else{
      setBtn(true)
      setReviewbtn(false)
    }
    
  }


  return (
    <div>
      {props.comments.length > 0?
      <>
        <h4 className='mb-4'>Ratings & Reviews</h4>
        {commentsList()}
        </>
      :
      <>
      <h3>No Ratings Yet</h3>
      <hr/>
      </>}
      {reviewbtn &&
    <button className='btn btn-primary mb-3' onClick={setField}>Add Review</button>
      }
    {btn &&
    <> 
    <h4>Add a review</h4>
      <div className='row '>
        
        <div className='col-md-2 col-sm-2'>
        <label  >Title </label>
        </div>
        <div className='col-md-9  col-sm-6'>
        <input onChange={(e)=>setTitle(e.target.value)}></input>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-2 col-sm-2'>
        <label >Description</label>
        </div>
        <div className='col-md-9 col-sm-6'>
        <textarea onChange={(e)=>setDescription(e.target.value)} rows="4" cols="30"></textarea>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-2 col-sm-2'>
        <label >Ratings</label>
        </div>
        <div className='col-md-9 col-sm-2'>
        <select name="ratings" onChange={(e)=>setRating(e.target.value)} >
        <option className='pr-3' defaultValue value='None'>None</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
        </div>
      </div>
      <div style={{color:'red'}}>{err}</div>
     <button className='btn btn-primary mt-4' onClick={ratingSubmit}>Submit</button>
     </>
    }

    </div>
  )
}

export default Comments
