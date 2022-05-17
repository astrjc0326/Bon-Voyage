import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

const ModalContainer = styled.div`
  background-color: rgba(255,255,255,0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  border-radius: 20px;
  backdrop-filter: blur(14px);
  transform: translate(-50%, -50%)

`
const ModalHeader = styled.div`
  display:flex ;
  justify-content: center;
`

const CloseSpan = styled.span`
  color: #222;
  float: right;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  right: 2%;
  margin-left: 600px;

  &:hover,
  &:focus {
    color: #1572A1;
    text-decoration: none;
    cursor: pointer;
  }
`;
const Modal = ({ title, content, onClose }) => ReactDom.createPortal(
  <ModalContainer onClick={onClose}>
    <div onClick={(e) => e.stopPropagation()}>
    <ModalHeader>
      <h1 style={{padding: '20px'}}>{title}</h1>
    <CloseSpan onClick={onClose}>
          &times;
    </CloseSpan>
    </ModalHeader>
    {content}
    </div>
  </ModalContainer>,
  document.querySelector('#modal'),
);

export default Modal;