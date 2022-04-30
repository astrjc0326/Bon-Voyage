import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
`

const Modal = ({ title, content, onClose }) => ReactDom.createPortal(
  <ModalContainer>{content}</ModalContainer>,
  document.querySelector('#modal'),
);

export default Modal;