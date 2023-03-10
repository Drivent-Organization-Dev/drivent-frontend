import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getTickets } from '../../services/ticketApi';
import { getHotels, getRooms } from '../../services/hotelsApi';
import { sendBooking } from '../../services/bookingApi';
import useToken from '../../hooks/useToken';

export default function BookingOptions() {
  const navigate = useNavigate();
  const token = useToken();
  const [hotels, setHotels] = useState();
  const [rooms, setRooms] = useState();
  const [selectRomm, setSelectRoom] = useState();
  const [ticket, setTicket] = useState();
  const [selectHotelButton, setSelectHotelButton] = useState();
  const [selectRoomButton, setSelectRoomButton] = useState();

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

  function getRoomsByHotelId(token, hotelId) {
    getRooms(token, hotelId)
      .then(ans => setRooms(ans.Rooms))
      .catch(ans => console.log(ans));
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
        {hotels.map((hotel) => (
          <HotelCard selectHotelButton={selectHotelButton} hotel={hotel.id} key={hotel.id} onClick={() => {
            setSelectRoom();
            setSelectRoomButton();
            getRoomsByHotelId(token, hotel.id);
            setSelectHotelButton(hotel.id);
          }}>
            <img src={hotel.image} />
            <p>{hotel.name}</p>
            <span><strong>Tipos de acomodação:</strong></span>
            <span>vagas </span>
          </HotelCard>)
        )}
      </HotelOptions>
      {(rooms) && (
        <>
          <Subtitle>Agora escolha seu quarto!</Subtitle>
          <RoomOptions>
            {(rooms) && (
              rooms.map(room => (
                <RoomCard selectRoomButton={selectRoomButton} room={room.id} key={room.id} onClick={() => {
                  setSelectRoomButton(room.id);
                  setSelectRoom(room.id);
                }}>
                  <div>{room.name}</div>
                  {(room.capacity === 1) && (<ion-icon name="person-outline"></ion-icon>)}
                  {(room.capacity === 2) && <span>
                    <ion-icon name="person-outline"></ion-icon>
                    <ion-icon name="person-outline"></ion-icon>
                  </span>
                  }
                  {(room.capacity === 3) && <span>
                    <ion-icon name="person-outline"></ion-icon>
                    <ion-icon name="person-outline"></ion-icon>
                    <ion-icon name="person-outline"></ion-icon>
                  </span>}

                </RoomCard>
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

export const Title = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  margin-bottom: 37px;
  line-height: 40px;
  color: #000000;
`;

export const Subtitle = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin-bottom: 10px;
`;

const RoomCard = styled.div`
  font-family: 'Roboto';
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 190px;
  height: 45px;
  border: solid 1px #CECECE;
  border-radius: 10px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 15px;
  font-size: 20px;
  background-color: ${props => (props.selectRoomButton === props.room) ? '#FFEED2' : 'none'};
  :hover {
    cursor: pointer;
  }
`;

export const HotelCard = styled.div`
  font-family: 'Roboto';
  display: flex;
  flex-direction: column;
  height: 264px;
  width: 196px;
  border-radius: 10px;
  background-color: ${props => (props.selectHotelButton === props.hotel) ? '#FFEED2' : '#EBEBEB'};
  padding: 16px;
  margin-right: 15px;
  margin-bottom: 15px;
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
  p {
    margin-top: 10px;
    font-family: 'Roboto';
    font-size: 20px;
  }
  span {
    font-size: 12px;
    margin-top: 10px;
  }
  :hover {
    background-color: ${props => (props.selectHotelButton === props.hotel) ? '#FFEED2' : '#CCCCCC'};
    cursor: pointer;
  }
`;

export const BookingButton = styled.button`
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
