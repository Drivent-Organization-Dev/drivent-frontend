import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';
import * as enrollmentApi from '../../services/enrollmentApi';

export default function usePayment() {
  const token = useToken();
  const { data: payment, loading: paymentLoading, error: paymentError, } = useAsync(() => ticketApi.getTickets(token));
  const { data: enrollment, loading: enrollmentLoading, error: enrollmentError, act: getEnrollment } = useAsync(() => enrollmentApi.getPersonalInformations(token));
  return { enrollment, enrollmentLoading, enrollmentError, payment, paymentLoading, paymentError, getEnrollment, };
};
