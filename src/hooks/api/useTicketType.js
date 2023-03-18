import useAsync from '../useAsync';
import * as ticketApi from '../../services/ticketApi';
import useToken from '../useToken';

export default function useTicketType() {
  const token = useToken();
  const { data: ticketType, loading: ticketTypeLoading, error: ticketTypeError, } = useAsync(() => ticketApi.getTicketTypes(token));
  return { ticketType, ticketTypeLoading, ticketTypeError, };
}
