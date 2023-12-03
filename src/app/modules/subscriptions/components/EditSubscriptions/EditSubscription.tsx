import React, { useEffect } from 'react'
import SubscriptionDetails from './cards/SubscriptionDetails'
import SubscriptionProperties from '../Common/SubscriptionProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'

export default observer(function EditSubscription() {
  const { subscriptionStore } = useStore();
  const { selectedSubscription: subscription, loadSubscription, loadingInitial, clearSelectedSubscription } = subscriptionStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadSubscription(id);
      return () => clearSelectedSubscription();
  }, [id, loadSubscription, clearSelectedSubscription]);

  if (loadingInitial || !subscription) return (<LoadingComponent />)
  
  
  return (
    <>
      <SubscriptionDetails id={id}/>
    </>
  )
})
