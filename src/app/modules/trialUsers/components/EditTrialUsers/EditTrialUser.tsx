import React, { useEffect } from 'react'
import TrialUserDetails from './cards/TrialUserDetails'
import TrialUserProperties from '../Common/TrialUserProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'

export default observer(function EditTrialUser() {
  const { trialUserStore } = useStore();
  const { selectedTrialUser: trialUser, loadTrialUser, loadingInitial, clearSelectedTrialUser } = trialUserStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadTrialUser(id);
      return () => clearSelectedTrialUser();
  }, [id, loadTrialUser, clearSelectedTrialUser]);

  if (loadingInitial || !trialUser) return (<LoadingComponent />)
  
  
  return (
    <>
      <TrialUserDetails id={id}/>
    </>
  )
})
