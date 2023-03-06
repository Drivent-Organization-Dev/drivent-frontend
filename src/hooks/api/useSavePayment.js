import useAsync from '../useAsync';

import * as paymentApi from '../../services/paymentApi';

export default function useSavePayment() {
  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: savePayment
  } = useAsync( paymentApi.sendPayment, false);
  return {
    payment,
    paymentLoading,
    paymentError,
    savePayment
  };
}
