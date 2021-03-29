import React,{useState,useEffect} from 'react'
import ProfileDisplay from './profileDisplay'
import { toast } from 'react-toastify';
import axios from 'axios'
// import {ProfileUpdate} from '../../Actions/LoginRegisterProfileAction'

const ProfileDetail = (props) => {
  const [fname,setFname]=useState('')
  const [lname,setLname]=useState('')
  const [email,setEmail]= useState("")
  const [ferr,setFerr] = useState('')
  const [phonenum,setPhonenum] = useState('')
  const [numerr,setNumerr] = useState('')
  const [emaerr,setEmaerr] = useState('')
  const [aerr,setErrall] = useState('')
  const [isGoing,setIsGoing]=useState(false)
  const [disable,setDisable] = useState(true)
  const [gender,setGender] = useState('')
  const [passwords,setPassword] = useState('')
  const [errs,setErr] = useState('')
  const [cpsw,setCpsw] = useState('')
  const [showpsw,setShowpsw] = useState("password")

useEffect(()=>{
    setFname(props.ldata.data.givenName)
    setLname(props.ldata.data.familyName)
    setEmail(props.ldata.data.email)
    setPhonenum(props.ldata.data.phoneNumber)
    setGender(props.ldata.data.gender)
    setEmaerr('')
},[])

useEffect(()=>{
    if(props.ldata.message === 'Update Successfully'){
      toast(props.ldata.message,{
        autoClose: 2000
      })
      setDisable(true)
    }else if(props.ldata.message !== 'Login Successfully'){
      setEmaerr(props.ldata.message)
    }
},[props.ldata])

  const fnameRender=(e)=>{
    if(e.target.value.length < 3){
      setFerr('Name should be atleast 3 characters')
    }else{setFerr('')}
    setFname(e.target.value)
  }
  
  const lnameRender=(e)=>{
   setLname(e.target.value)
  }
  const phoneNumRender=(e)=>{
    if(phonenum.toString().length > 0 && phonenum.toString().length < 9){
      setNumerr('Give a valid phone number.')}
    else{
      setNumerr('')
    }
    setPhonenum(e.target.value)
  }

  const mailRender=(e)=>{
    if ((/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(e.target.value)) {
      setEmaerr('')
    }else{
      setEmaerr('Please enter valid email') 
    }
    setEmail(e.target.value)
   }

   const changegenderMale=(e)=>{
    setGender("male")
  }
  const changegenderFemale=(e)=>{
    setGender("female")
  }

  const editRender=(e)=>{
    setDisable(false) 
  }

  const passwordRender=(e)=>{
    if(e.target.value.length < 6){
      setErr('Password should be atleast 6 characters')
    }else{setErr('')}
    setPassword(e.target.value)  
   }
   
   const cpswRender=(e)=>{
    setCpsw(e.target.value)
   }
   
   const handleInputChange=()=>{
      setIsGoing(!isGoing)
      if(showpsw === "password"){
        setShowpsw("text")
      }
      else{
        setShowpsw("password")
      }
   }

  const saveRender=(e)=>{
    if(ferr || emaerr ){
      setErrall("Fill valid adress")
    } 
    else if(passwords !== cpsw){
      setErrall('')
      setErr('Passwords didn’t match')
    }else{
      axios
      .get(
        `https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_NNjRtJeDX5g5bGgllgC7u8y6bgh9x&emailAddress=${email}`
      )
      .then((resp) => {
        if (resp.data.smtpCheck) {
          if (resp.data.smtpCheck === "false") {
            setErrall("Given mail is not found in google mail server");
            
          } else {
            setErrall('')
            setErr('')
            setNumerr('')
            props.update(fname,lname,gender,email,phonenum,passwords)
          }
        }
      else{
        setErrall("Something went wrong, comeback later");
      }
    })
    }
}


  


  return (
    <>
      <ProfileDisplay fnameRender={fnameRender}
      lnameRender={lnameRender} fname={fname} lname={lname} showpsw={showpsw}
      mailRender={mailRender} emailid={email} phonenum={phonenum} 
      phoneNumRender={phoneNumRender} editRender={editRender} disable={disable}
      saveRender={saveRender} emaerr={emaerr} aerr={aerr} numerr={numerr}
      changegenderMale={changegenderMale} changegenderFemale={changegenderFemale} gender={gender}
      passwordRender={passwordRender} cpswRender={cpswRender} handleInputChange={handleInputChange}
      passwords={passwords} errs={errs} cpsw={cpsw} ferr={ferr} 
      />
    </>
  )
}


export default ProfileDetail

