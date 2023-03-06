import styled from 'styled-components';
import Card from './Card';
import PaymentSucessful from './PaymentSucessful';

export default function CardScreen({ status, price, isRemote, hotel }) {
  return (
    <>
      <PaymentTitle>Ingresso e Pagamento</PaymentTitle>
      <PaymentSubtitle>Ingresso Escolhido</PaymentSubtitle>
      <InformationContainer>
        <TicketInformations>{isRemote? 'Remoto' : 'Presencial'} + {hotel? 'Com Hotel' : 'Sem Hotel'}</TicketInformations>
        <Price>R$ {price}</Price>
      </InformationContainer>
      <PaymentSubtitle>Pagamento</PaymentSubtitle>
      {status === 'RESERVED'? <Card /> : <PaymentSucessful />}  
    </>);
}

const PaymentTitle = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  margin-bottom: 37px;
  line-height: 40px;
  color: #000000;
`;

const PaymentSubtitle = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin-bottom: 7px;
`;

const InformationContainer = styled.div`
  width: 290px;
  height: 108px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #FFEED2; 
  border-radius: 20px;
`;

const TicketInformations = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
    margin-bottom: 10px;
`;

const Price = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
`;

