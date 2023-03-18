import { Title, Subtitle, BookingButton } from './BookingOptions';
import { getRooms }  from '../../services/hotelsApi';
import { useEffect, useState } from 'react';
import useToken from '../../hooks/useToken';
import { Hotel } from './HotelCard';

export function CurrentBooking( { booking, setChangeRoom } ) {
  const token = useToken();
  const [hotel, setHotel] = useState();
  useEffect(() => {
    getRooms(token, booking.Room.hotelId)
      .then(r => setHotel(r))
      .catch(e => console.log(e));
  }, []
  );

  return(
    <>
      <Title>Escolha de hotel e quarto</Title>
      <Subtitle>Você já escolheu seu quarto:</Subtitle>
      <Hotel>
        <img src={hotel?.image} />
        <p>{hotel?.name}</p>
        <span><strong>Quarto reservado</strong></span>
        <span>{booking?.Room.name}</span>
        <span><strong>Pessoas no seu quarto</strong></span>
        <span>{'Você e mais ' + (booking?.Room.capacity - 1)}</span>
      </Hotel>
      <BookingButton onClick={() => setChangeRoom(true)}>TROCAR DE QUARTO</BookingButton>
    </>
  );
}
