import React, { useEffect } from 'react'
import CustomerDetails from './cards/CustomerDetails'
import CustomerProperties from '../Common/CustomerProperties'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Customer } from '../../../../models/customer';
import LoadingComponent from '../../../../layout/Common/LoadingComponent';



export default observer(function ViewCustomer() {
  const { customerStore } = useStore();
  const { selectedCustomer: customer, loadCustomer, loadingInitial, clearSelectedCustomer } = customerStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadCustomer(id);
      return () => clearSelectedCustomer();
  }, [id, loadCustomer, clearSelectedCustomer]);

  if (loadingInitial || !customer) return (<LoadingComponent />)
  
  
  return (
    <>
      <CustomerDetails  id={id} />
    </>
  )
})
