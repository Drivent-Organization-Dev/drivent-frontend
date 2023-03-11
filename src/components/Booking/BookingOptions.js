import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getTickets } from '../../services/ticketApi';
import { getHotels, getRooms } from '../../services/hotelsApi';
import { sendBooking, listBookedRooms } from '../../services/bookingApi';
import useToken from '../../hooks/useToken';
import HotelCard from './HotelCard';
import RoomCard from './RoomCard';

export default function BookingOptions() {
  const navigate = useNavigate();
  const token = useToken();
  const [hotels, setHotels] = useState();
  const [rooms, setRooms] = useState();
  const [selectRomm, setSelectRoom] = useState();
  const [ticket, setTicket] = useState();
  const [selectHotelButton, setSelectHotelButton] = useState();
  const [selectRoomButton, setSelectRoomButton] = useState();
  const [bookedRooms, setBookedRooms] = useState();

  useEffect(() => {
    getTickets(token)
      .then(ans => setTicket(ans))
      .catch(ans => console.log(ans));
  }, []);

  useEffect(() => {
    getHotels(token)
      .then(ans => setHotels(ans))
      .catch(ans => console.log(ans));
  }, []);

  if (!ticket || !hotels) {
    return (<Title>Carregando...</Title>);
  }

  if (ticket?.TicketType.isRemote) {
    return (<>Sua modalidade de ingresso não inclui hospedagem.
      Prossiga para a escolha de atividades</>);
  }

  if (ticket?.status !== 'PAID') {
    return (<>Você precisa confirmar o pagamento antes
      de fazer a escolha de hospedagem</>);
  }

  function bookRoom(token, roomId) {
    sendBooking(token, { roomId: roomId })
      .then(ans => toast('Quarto reservado com sucesso'))
      .catch(ans => toast('Não foi possível fazer a reserva!'));
  }

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <Subtitle>Primeiro escolha seu hotel!</Subtitle>
      <HotelOptions>
        {hotels.map((hotel, i, arr) => (
          <HotelCard 
            key={hotel.id}
            hotelId={hotel.id}
            token={token}
            setSelectRoom={setSelectRoom}
            setSelectRoomButton={setSelectRoomButton}
            selectHotelButton={selectHotelButton}
            setSelectHotelButton={setSelectHotelButton}
            setBookedRooms={setBookedRooms}
            setRooms={setRooms}
            bookedRooms={bookedRooms}
            hotelImg={hotel.image}
            hotelName={hotel.name}>
          </HotelCard>)
        )}
      </HotelOptions>
      {(rooms) && (
        <>
          <Subtitle>Agora escolha seu quarto!</Subtitle>
          <RoomOptions>
            {(rooms) && (
              rooms.map(room => (
                <RoomCard
                  key={room.id}
                  roomId={room.id} 
                  roomName={room.name}
                  roomCapacity={room.capacity}
                  bookedRooms={bookedRooms}
                  selectRoomButton={selectRoomButton} 
                  setSelectRoomButton={setSelectRoomButton}
                  setSelectRoom={setSelectRoom}
                  selectRomm={selectRomm}
                />
              ))
            )}
          </RoomOptions>
        </>
      )}
      {(selectRomm) && (<BookingButton onClick={() => bookRoom(token, selectRomm)}>RESERVAR QUARTO</BookingButton>)}
    </>
  );
};

const HotelOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const RoomOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const Title = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  margin-bottom: 37px;
  line-height: 40px;
  color: #000000;
`;

const Subtitle = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin-bottom: 10px;
`;

const BookingButton = styled.button`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  border: none;
  width: 182px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
`;
