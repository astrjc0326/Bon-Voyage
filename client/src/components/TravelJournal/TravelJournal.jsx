import React, { useState, useEffect } from 'react';
import NewJournay from './NewJournay.jsx';
import NewJournay1 from './NewJournay1.jsx';
import styled from 'styled-components';

const Button = styled.button`
  width : 60px;
  height: 30px;
  margin-left: 280px
`

const TravelJournal = () => {
  const [isClick, setOnClick] = useState(0);
  const [country, setCountry] = useState();
  let journey;
  if (isClick % 2 === 0) {
    journey =  <NewJournay />
  } else if (isClick % 2 === 1) {
    journey = <NewJournay1 />
  }
  return (
    <div>
      <Button onClick={() => {setOnClick(prev=>prev+1)}}>NEXT</Button>
      {journey}
    </div>
  );
};

export default TravelJournal;
