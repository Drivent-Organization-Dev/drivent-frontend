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
    <PaymentContainer>
      <CardContainer>
        <Cards
          cvc={cardInformations.cvc}
          expiry={cardInformations.expiry}
          focused={cardInformations.focus}
          name={cardInformations.name}
          number={cardInformations.number}
        />
      </CardContainer>
      <FormsCard>
        <input
          type="tel"
          name="number"
          placeholder="Card Number"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="tel"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="tel"
          name="expiry"
          placeholder="Valid Thru"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </FormsCard>
    </PaymentContainer>
  );
}

const PaymentContainer = styled.div`
    display: flex;
    margin-top: 30px;
`;

const CardContainer = styled.div`
  width: 300px;
  display: flex;
  left: 0;
`;

const FormsCard = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
`;

