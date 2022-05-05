import React, { useState } from 'react';
import Modal from './Modal.jsx';
import styled from 'styled-components';

const SignIn = styled.div`
  padding: 20px;
  width: 100%
`
const Input = styled.input`
  width: 100%;
  height: 50px;
  margin: 10px;
  text-align: center;
`
const SigninButton = styled.button`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 10px;
  bottom: -200px;
  left: 50%;
  transform: translate(-50%, -50%)
`

const Login = ( {onClose} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Login =   <SignIn>
  {/* <div style={{}}><h1>Sign In</h1></div> */}
  <Input placeholder='Enter your Email Address'>
  </Input>
  <br />
  <Input type='password' placeholder='Password'>
  </Input>

  <SigninButton onClick={() => onClose(false)}>Sign in</SigninButton>
  </SignIn>
  return (
    <Modal title={'Sign In'} content={Login} onClose={() => onClose(false)}/>
)

}

export default Login;