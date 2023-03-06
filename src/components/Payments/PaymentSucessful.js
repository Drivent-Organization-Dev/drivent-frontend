import { AiFillCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';
export default function PaymentSucessful() {
  return(
    <StyledPaymentSucessful>
      <h5>Pagamento</h5>
      <div>
        <AiFillCheckCircle color="green" size={50}></AiFillCheckCircle>
        <div>
          <h6>Pagamento confirmado!</h6>
          <p>Prossiga para escolha de hospedagem e atividades</p>
        </div>
      </div>
    </StyledPaymentSucessful>
  );
}

const StyledPaymentSucessful = styled.div`
display:flex;
flex-direction:column;
>div{
    margin-top:16px;
    display:flex;
    justify-content:left;
    align-items:center;
    >div{
        margin-left:13px;
    }
}
h5{
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 23px;

color: #8E8E8E;
}
h6{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    color: #454545;  
}
p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;

    color: #454545;
}
`;
