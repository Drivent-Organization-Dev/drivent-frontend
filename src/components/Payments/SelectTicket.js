import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

//MODULES FOR TICKET TYPE
import ChoiceBox from '../ChoiceBox';
import useTicketType from '../../hooks/api/useTicketType';
import useTicket from '../../hooks/api/useTicket';
import useToken from '../../hooks/useToken';

export default function SelectTicket() {
  const navigate = useNavigate();
  const token = useToken();
  //POST TICKET AND TICKET TYPE
  const [ticket, setTicket] = useState({ isRemote: false, includesHotel: false, price: 0, });
  const { postTicketType } = useTicketType();
  const { postTicket } = useTicket();

  // STATES FOR TICKET TYPE AND PRICE
  const [isRemoteTicket, setIsRemoteTicket] = useState(''); // TRUE IF REMOTE TICKET IS SELECTED
  const [hotelSelector, setHotelSelector] = useState(''); // TRUE IF TICKET WITH HOTEL IS SELECTED
  const [ticketPrice, setTicketPrice] = useState(0); // PRICE OF TICKET (REMOTE OR PRESENTIAL)
  const [hotelPrice, setHotelPrice] = useState(1); // PRICE OF HOTEL TICKET (WITH OR WITHOUT HOTEL)

  //UPDATE STATES WHEN API DATA CHANGES
  useEffect(() => {
    setTicket({
      isRemote: !isRemoteTicket,
      includesHotel: hotelSelector === '' || isRemoteTicket === false ? true : !hotelSelector, // IF REMOTE TICKET IS SELECTED, ITS NOT POSSIBLE TO SELECT HOTEL TICKET
      price: !isRemoteTicket ? Number(ticketPrice) : Number(ticketPrice) + Number(hotelPrice), // IF REMOTE TICKET IS SELECTED, HOTEL PRICE IS NOT ADDED
    });
  }, [isRemoteTicket, hotelSelector, ticketPrice, hotelPrice]);

  //SUBMIT TICKET WHEN CLICK ON BUTTON
  async function submitTicket(ticket) {
    try {
      const postedTicketType = await postTicketType(ticket, token);
      await postTicket({ ticketTypeId: postedTicketType.id }, token);
      navigate(0);
    } catch (error) {
      toast('Não foi possivel reservar seu ingresso!');
    }
  }

  return (
    <>
      <PaymentTitle>Ingresso e pagamento</PaymentTitle>
      <PaymentSubtitle>Primeiro, escolha sua modalidade de ingresso</PaymentSubtitle>
      <ContainerOptions>
        <ChoiceBox
          description={'Presencial'}
          price={250}
          selectState={isRemoteTicket === '' ? false : isRemoteTicket}
          selector={setIsRemoteTicket}
          setPrice={setTicketPrice}
          disable={false}
        />
        <ChoiceBox
          description={'Online'}
          price={100}
          selectState={isRemoteTicket === '' ? false : !isRemoteTicket}
          selector={setIsRemoteTicket}
          setPrice={setTicketPrice}
          disable={false}
        />
      </ContainerOptions>
      {/* IF TICKETPRICE IS DIFFERENT FROM ZERO, WILL APPEAR THE NEXT OPTIONS */}
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
                price={350}
                selectState={hotelSelector === '' ? false : !hotelSelector}
                selector={setHotelSelector}
                setPrice={setHotelPrice}            
                disable={!isRemoteTicket}
              />        
            </ContainerOptions>
            {/* IF HOTELPRICE IS DIFFERENT FROM ZERO, WILL APPEAR RESERVATION BUTTOM */}
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

