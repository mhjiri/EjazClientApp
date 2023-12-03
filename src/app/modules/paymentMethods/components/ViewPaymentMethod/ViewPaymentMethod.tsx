import React, { useEffect } from 'react'
import PaymentMethodDetails from './cards/PaymentMethodDetails'
import PaymentMethodProperties from '../Common/PaymentMethodProperties'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { PaymentMethod } from '../../../../models/paymentMethod';
import LoadingComponent from '../../../../layout/Common/LoadingComponent';



export default observer(function ViewPaymentMethod() {
  const { paymentMethodStore } = useStore();
  const { selectedPaymentMethod: paymentMethod, loadPaymentMethod, loadingInitial, clearSelectedPaymentMethod } = paymentMethodStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadPaymentMethod(id);
      return () => clearSelectedPaymentMethod();
  }, [id, loadPaymentMethod, clearSelectedPaymentMethod]);

  if (loadingInitial || !paymentMethod) return (<LoadingComponent />)
  
  
  return (
    <>
      <PaymentMethodDetails  id={id} />
    </>
  )
})
