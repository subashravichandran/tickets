// import React from React

import { useDebugValue, useEffect, useState } from "react"
import axios from "axios";

interface FromProps {
  isLoggedIn: boolean;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const setLocalStorage = (data: any) => {
  localStorage.setItem('login-id', data.id)
  localStorage.setItem('login-hash', data.jti)
}

const clearLocalStorage = () => {
  localStorage.removeItem('login-id')
  localStorage.removeItem('login-hash')
}

const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/login', { user: { email, password }});
    console.log(response.data); // Log successful response data
    setLocalStorage(response.data.data)
    return response.data; // Return the response data
  } catch (error: any) {
    console.error("Error occurred:", error.response?.data); // Log detailed error information
    throw error; // Re-throw the error to propagate it
  }
};

function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (localStorage.getItem('login-hash')) {
      setIsLoggedIn(true)
    }
  })

  const handleLoginClick = () => {
    const userData = loginUser(email, password);
    console.log(userData)
    setIsLoggedIn(true)
  }

  const handleLogoutClick = () => {
    clearLocalStorage()
    setIsLoggedIn(false)
  }

  return (
    <>
      <Form
        isLoggedIn = {isLoggedIn}
        email = {email}
        password = {password}
        setEmail = {setEmail}
        setPassword = {setPassword} />
      { isLoggedIn ? <button onClick={handleLogoutClick}>LOGOUT</button> : <button onClick={handleLoginClick}>LOGIN</button> }
    </>
  )
}

function Form({isLoggedIn, email, password, setEmail, setPassword}: FromProps){

  return (
    <>
      <h1>{ isLoggedIn ? 'Welcome' : 'Login'}</h1>
      { isLoggedIn ? null : 
                     <> 
                       <input value = {email} placeholder ="example@examplemail.com" onChange = {(e) => setEmail(e.target.value)} />
                       <input value = {password} onChange = {(e) => setPassword(e.target.value)} />
                     </>
      }
    </>
  )
}

export default LoginForm