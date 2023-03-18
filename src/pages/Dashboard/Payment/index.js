import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import usePayment from '../../../hooks/api/usePayment';
import CardScreen from '../../../components/Payments/CardScreen';
import SelectTicket from '../../../components/Payments/SelectTicket';

export default function Payment() {
  const { paymentLoading, payment, enrollmentLoading, enrollment } = usePayment();

  while (enrollment === '' || enrollment === undefined || enrollment === null) {
    return (
      <>
        <PaymentTitle>Ingresso e pagamento</PaymentTitle>
        <TextSubscription>Você precisa completar sua inscrição antes<br></br>de prosseguir pra escolha de ingresso</TextSubscription>
      </>
    );
  }

  if (paymentLoading || enrollmentLoading) {
    return (
      <>
        <span>{<LoaderStyle color="#000000" height={26} width={26} type="Oval" />} Carregando</span>
      </>
    );
  }

  if (payment === undefined || payment === null || payment === '') {
    return (
      <>
        <SelectTicket />
      </>
    );
  }
  else if (payment.status) {
    return (
      <CardScreen status={payment.status} price={payment.TicketType.price}
        isRemote={payment.TicketType.isRemote} hotel={payment.TicketType.includesHotel}
        ticketId={payment.id} />
    );
  }
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

const TextSubscription = styled.p`
  margin-top: 243px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
`;

const LoaderStyle = styled(Loader)`
  position: relative;
  top: -4.5px;
`;
