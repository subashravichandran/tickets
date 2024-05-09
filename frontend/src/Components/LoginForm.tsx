// import React from React

import { useDebugValue, useState } from "react"
import axios from "axios";

interface FromProps {
  isLoggedIn: boolean;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/login', { email, password });
    console.log(response.data); // Log successful response data
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

  const handleLoginClick = () => {
    const userData = loginUser(email, password);
    console.log(userData)
    setIsLoggedIn(true)
  }

  return (
    <>
      <Form
        isLoggedIn = {isLoggedIn}
        email = {email}
        password = {password}
        setEmail = {setEmail}
        setPassword = {setPassword} />
      { isLoggedIn ? null : <button onClick={handleLoginClick}>LOGIN</button> }
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