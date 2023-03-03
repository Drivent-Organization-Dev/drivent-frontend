import { useState } from 'react';
import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default function Card() {
  const [cardInformations, setCardInformations] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  function handleInputFocus(e) {
    setCardInformations({ ...cardInformations, focus: e.target.name });
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCardInformations({ ...cardInformations, [name]: value });
  };

  return (
    <CardContainer>
      <Cards
        cvc={cardInformations.cvc}
        expiry={cardInformations.expiry}
        focused={cardInformations.focus}
        name={cardInformations.name}
        number={cardInformations.number}
      />
      <FormsCard>
        <input
          type="tel"
          name="number"
          placeholder="Card Number"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </FormsCard>
    </CardContainer>
  );
}

const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: greenyellow;
    margin-top: 30px;
`;

