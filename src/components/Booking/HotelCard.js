import { useEffect, useState } from 'react';
import { listBookedRooms } from '../../services/bookingApi';
import { getRooms } from '../../services/hotelsApi';
import styled from 'styled-components';

export default function HotelCard({ token, hotelId, hotelName, hotelImg, setRooms, setSelectRoom, setBookedRooms, selectHotelButton, setSelectHotelButton, setSelectRoomButton }) {
  const [vacancies, setVacancies] = useState();
  let vacanciesSum = 0;
  const [totalBookedRooms, setTotalBookedRooms] = useState();
  
  useEffect(() => {
    listBookedRooms(token, hotelId)
      .then(ans => {
        setTotalBookedRooms((ans.length));
        setBookedRooms(ans);
      })
      .catch(ans => console.log(ans));
  }, []);

  useEffect(() => {
    getRooms(token, hotelId)
      .then(ans => {
        for(let i=0; i<ans.Rooms.length; i++) {
          vacanciesSum += ans.Rooms[i].capacity;
        }
        setVacancies(vacanciesSum);
      })
      .catch(ans => console.log(ans));
  }, []);

  function getBookedRooms(token, hotelId) {
    listBookedRooms(token, hotelId)
      .then(ans => {
        setTotalBookedRooms((ans.length));
        setBookedRooms(ans);
      })
      .catch(ans => console.log(ans));
  }

  function getRoomsByHotelId(token, hotelId) {
    getRooms(token, hotelId)
      .then(ans => setRooms(ans.Rooms))
      .catch(ans => console.log(ans));
  }

  return (
    <Hotel selectHotelButton={selectHotelButton} hotelId={hotelId} key={hotelId} onClick={() => {
      setSelectRoom();
      setSelectRoomButton();
      getRoomsByHotelId(token, hotelId);
      getBookedRooms(token, hotelId);
      setSelectHotelButton(hotelId);
    }}>
      <img src={hotelImg} />
      <p>{hotelName}</p>
      <span><strong>Tipos de acomodação: </strong><br/>Single, double e triple</span>
      <span><strong>vagas: </strong>{vacancies-totalBookedRooms}</span>
    </Hotel>
  );
}

export const Hotel = styled.div`
  font-family: 'Roboto';
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 264px;
  width: 196px;
  border-radius: 10px;
  background-color: ${props => (props.selectHotelButton === props.hotelId) ? '#FFEED2' : '#EBEBEB'};
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
    font-size: 14px;
    margin-top: 15px;
  }
  :hover {
    background-color: ${props => (props.selectHotelButton === props.hotelId) ? '#FFEED2' : '#CCCCCC'};
    cursor: pointer;
  }
`;
