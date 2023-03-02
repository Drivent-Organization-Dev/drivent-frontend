import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';
export default function Payment() {
  const { enrollment } = useEnrollment();
  console.log(enrollment);
  while (enrollment == null) {
    return (
      <>
        <PaymentTitle>Ingresso e pagamento</PaymentTitle>
        <TextSubscription>Você precisa completar sua inscrição antes<br></br>de prosseguir pra escolha de ingresso</TextSubscription>
      </>
    );
  }
  return (
    'Pagamento: Em trabalho!');
}
const PaymentTitle = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;


  color: #000000;
`;
const TextSubscription = styled.p`
  margin-top:243px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
`;
