import { getTickets } from '../../services/ticketApi';
import useToken from '../../hooks/useToken';
import { useEffect, useState } from 'react';
export function ActivitiesPage() {
  const token = useToken();
  const [ticket, setTicket] = useState();

  useEffect(() => {
    getTickets(token)
      .then(ans => setTicket(ans))
      .catch(ans => console.log(ans));
  }, []);
  console.log(ticket);

  if (ticket?.TicketType.isRemote) {
    return (
      <>
        <h1>Sua modalidade é a Online e não precisa selecionar as atividades</h1>
      </>
    );
  }
  if (ticket?.status !== 'PAID') {
    return (
      <>
        <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</h1>
      </>
    );
  } 

  return 'Atividades: Em breve!';
};

