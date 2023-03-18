import Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import ChoiceBox from '../ChoiceBox';
import useTicketType from '../../hooks/api/useTicketType';
import useTicket from '../../hooks/api/useTicket';
import useToken from '../../hooks/useToken';

export default function SelectTicket() {
  const navigate = useNavigate();
  const token = useToken();

  const [ticket, setTicket] = useState({ isRemote: false, includesHotel: false, price: 0, });
  const { postTicket } = useTicket();
  const { ticketType } = useTicketType(); 
  const [isRemoteTicket, setIsRemoteTicket] = useState('');
  const [hotelSelector, setHotelSelector] = useState('');
  const [ticketPrice, setTicketPrice] = useState(0);
  const [hotelPrice, setHotelPrice] = useState(1);
  const ticketType1 = { price: 60000, includesHotel: true, isRemote: false };
  const ticketType2 = { price: 25000, includesHotel: false, isRemote: false };
  const ticketType3 = { price: 10000, includesHotel: false, isRemote: true };

  useEffect(() => {
    setTicket({
      isRemote: !isRemoteTicket,
      includesHotel: hotelSelector === '' || isRemoteTicket === false ? true : !hotelSelector,
      price: !isRemoteTicket ? Number(ticketPrice) : Number(ticketPrice) + Number(hotelPrice),
    });
  }, [isRemoteTicket, hotelSelector, ticketPrice, hotelPrice]);

  async function submitTicket() {
    try {
      const ticketID = ticket.price === ticketType1.price ? 1 : ticket.price === ticketType2.price ? 2 : 3;
      await postTicket({ ticketTypeId: ticketID }, token);
      navigate(0);
    } catch (error) {
      toast('Não foi possivel reservar seu ingresso!');
    }
  }

  while(ticketType === '' || ticketType === undefined || ticketType === null) {
    return (
      <>
        <span>{<LoaderStyle color="#000000" height={26} width={26} type="Oval" />} Carregando</span>
      </>
    );
  };

  return (
    <>
      <PaymentTitle>Ingresso e pagamento</PaymentTitle>
      <PaymentSubtitle>Primeiro, escolha sua modalidade de ingresso</PaymentSubtitle>
      <ContainerOptions>
        <ChoiceBox
          description={'Presencial'}
          price={ticketType2.price}
          selectState={isRemoteTicket === '' ? false : isRemoteTicket}
          selector={setIsRemoteTicket}
          setPrice={setTicketPrice}
          disable={false}
        />
        <ChoiceBox
          description={'Online'}
          price={ticketType3.price}
          selectState={isRemoteTicket === '' ? false : !isRemoteTicket}
          selector={setIsRemoteTicket}
          setPrice={setTicketPrice}
          disable={false}
        />
      </ContainerOptions>
      {
        ticketPrice !== 0 && (
          <>
            <PaymentSubtitle>Ótimo! Agora escolha sua modalidade de hospedagem</PaymentSubtitle>
            <ContainerOptions>
              <ChoiceBox
                description={'Sem Hotel'}
                price={0}
                selectState={hotelSelector === '' ? false : hotelSelector}
                selector={setHotelSelector}
                setPrice={setHotelPrice}
                disable={!isRemoteTicket}
              />
              <ChoiceBox
                description={'Com Hotel'}
                price={( ticketType1.price - ticketType2.price )}
                selectState={hotelSelector === '' ? false : !hotelSelector}
                selector={setHotelSelector}
                setPrice={setHotelPrice}            
                disable={!isRemoteTicket}
              />        
            </ContainerOptions>
            {
              hotelPrice !== 1 || (hotelPrice === 1 && !isRemoteTicket) ? (
                <>
                  <PaymentSubtitle>Fechado! O total ficou em R$ {ticket.price}. Agora é só confirmar:</PaymentSubtitle>
                  <BookingButton onClick={() => submitTicket(ticket)}>RESERVAR INGRESSO</BookingButton>
                </>
              ) : null
            }
          </>
        )
      }
    </>
  );
}

const ContainerOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

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

const BookingButton = styled.button`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  border: none;
  width: 162px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
`;

const LoaderStyle = styled(Loader)`
  position: relative;
  top: -4.5px;
`;
