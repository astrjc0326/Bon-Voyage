import React, { useState } from 'react';
import Modal from './Modal.jsx';
import styled from 'styled-components';

const SignIn = styled.div`
  padding: 20px;
  width: 1000px
`
const Input = styled.input`
  width: 50%;
  height: 50px;
  margin: 10px
`

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Login =   <SignIn>
  <div style={{}}><h1>Sign In</h1></div>
  <Input placeholder='Enter your Email Address'>
  </Input>
  <br />
  <Input type='password' placeholder='Password'>
  </Input>

  <button style={{width: '50%', height: '50px', margin: '10px'}}>Sign in</button>
</SignIn>
  return (
    <Modal content={Login}/>
)

}

export default Login;