import React, { useEffect } from 'react'
import PaymentDetails from './cards/PaymentDetails'
import PaymentProperties from '../Common/PaymentProperties'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Payment } from '../../../../models/payment';
import LoadingComponent from '../../../../layout/Common/LoadingComponent';



export default observer(function ViewPayment() {
  const { paymentStore } = useStore();
  const { selectedPayment: payment, loadPayment, loadingInitial, clearSelectedPayment } = paymentStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadPayment(id);
      return () => clearSelectedPayment();
  }, [id, loadPayment, clearSelectedPayment]);

  if (loadingInitial || !payment) return (<LoadingComponent />)
  
  
  return (
    <>
      <PaymentDetails  id={id} />
    </>
  )
})
