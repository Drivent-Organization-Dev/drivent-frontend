import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { getTickets } from '../../../services/ticketApi';
import usePayment from '../../../hooks/api/usePayment';
import ChoiceBox from '../../../components/ChoiceBox';
import useTicketType from '../../../hooks/api/useTicketType';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';


export default function Hotel() {
  return 'Hotel: Em breve!';

  const navigate = useNavigate();
  const token = useToken();

  useEffect(() => {
    getTickets(token)
  }, [])
}
