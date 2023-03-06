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

  console.log(cardInformations);

  return (
    <>
      <form>
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
            <NumberImput
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <p>E.g.: 49..., 51..., 36..., 37...</p>
            <NameInput
              type="tel"
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <DateAndCVC>
              <ExpiryInput
                type="tel"
                name="expiry"
                placeholder="Valid Thru"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <CVCInput
                type="tel"
                name="CVC"
                placeholder="CVC"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </DateAndCVC>
          </FormsCard>
        </PaymentContainer>
        <SubmitPayment>
          <button type="submit">FINALIZAR PAGAMENTO</button>
        </SubmitPayment>
      </form>
    </>
  );
}

const PaymentContainer = styled.div`
    display: flex;
    margin-top: 30px;
    margin-bottom: 40px;
    align-content: space-between;
`;

const CardContainer = styled.div`
  width: 300px;
  display: flex;
  left: 0;
`;

const FormsCard = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  p {
    margin-bottom: 18px;
    color: #8E8E8E;
  }
`;

const NumberImput = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const NameInput = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const DateAndCVC = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExpiryInput = styled.input`
  width: 150px;
  height: 40px;
  border-radius: 5px;
`;

const CVCInput = styled.input`
  width: 50px;
  height: 40px;
  border-radius: 5px;
`;

const SubmitPayment = styled.div`
  display: flex;
  justify-content: center;
  left: 0;
  button {
    width: 182px;
    height: 37px;
    background: #E0E0E0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: none;
  }
`;

