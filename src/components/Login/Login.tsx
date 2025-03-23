import React, { FC, useEffect, useRef, useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

interface LoginProps { }
const Login: FC<LoginProps> = () => {
  const inputRef = useRef<any>(null)
  const [validPass,setValidPass]=useState<boolean|any>(true)
  const nav=useNavigate()
  const takePassword = (event:any) => {
    event.preventDefault();
    if(inputRef.current.value==="נחמי שפירו"){
    nav('/navBar')
    }
    else
    setValidPass(false)
  }
  return <div className="Login">
    <div className='title'>
      <h1>ספרנית יקרה ברוכה הבאה</h1>
      <span>כדי להיכנס למערכת אנא הקישי את סיסמת הספרניות</span>
    </div>
    <div className="group">
      <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
      </svg>
      <input ref={inputRef} className="input" type="password" placeholder="password" />
    </div>
    {!validPass?<small className='errors text-danger'>הסיסמא שגויה, אנא נסו שנית</small>:''}
    <br />
   <button onClick={(e)=>{takePassword(e)}} className='btn btn-primary mt-3'>login</button>
  </div>

}
export default Login;
