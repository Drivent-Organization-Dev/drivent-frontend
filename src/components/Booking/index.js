import { getBooking } from '../../services/bookingApi';
import useToken from '../../hooks/useToken';
import { useEffect, useState } from 'react';
import { CurrentBooking } from './CurrentBooking';
import BookingOptions from './BookingOptions';
export function BookingPage() {
  const [booking, setBooking] = useState();
  const token = useToken();
  console.log(booking);

  useEffect(() =>
  {
    getBooking(token)
      .then((r) => setBooking(r))
      .catch((e) => console.log(e));
  }, []
  );
  if(booking)return(
    <>
      <CurrentBooking booking={booking}></CurrentBooking>
    </>
  );
  return(
    <>
      <BookingOptions></BookingOptions>
    </>
  );
}
