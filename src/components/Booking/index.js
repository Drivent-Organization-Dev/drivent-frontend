import { getBooking } from '../../services/bookingApi';
import useToken from '../../hooks/useToken';
import { useEffect, useState } from 'react';
import { CurrentBooking } from './CurrentBooking';
import BookingOptions from './BookingOptions';
export function BookingPage() {
  const [booking, setBooking] = useState();
  const token = useToken();

  const [changeRoom, setChangeRoom] = useState(false);

  useEffect(() => {
    getBooking(token)
      .then((r) => setBooking(r))
      .catch((e) => console.log(e));
  }, []
  );

  if(booking && !changeRoom)return(
    <>
      <CurrentBooking booking={booking} setChangeRoom={setChangeRoom}></CurrentBooking>
    </>
  );
  return (
    <>
      <BookingOptions changeRoom={changeRoom} booking={booking}></BookingOptions>
    </>
  );
}
