import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal.jsx';

const SignIn = styled.div`
  padding: 20px;
  width: 100%
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  margin: 10px;
  text-align: center;
`;
const SigninButton = styled.button`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 10px;
  bottom: -200px;
  left: 50%;
  transform: translate(-50%, -50%)
`;

const Login = ({ onClose, setisSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Login = (
    <SignIn>
      {/* <div style={{}}><h1>Sign In</h1></div> */}
      <Input placeholder="Username" />
      <br />
      <Input type="Password" placeholder="Password" />

      <SigninButton onClick={() => { onClose(false); setisSignIn(true); }}>Sign in</SigninButton>
    </SignIn>
  );
  return (
    <Modal title="Sign In" content={Login} onClose={() => onClose(false)} />
  );
};

export default Login;
