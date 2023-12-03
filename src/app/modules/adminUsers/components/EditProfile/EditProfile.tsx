import React, { useEffect } from 'react'
import AdminUserDetails from './cards/ProfileDetails'
import AdminUserProperties from '../Common/AdminUserProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'
import ProfileDetails from './cards/ProfileDetails'

export default observer(function EditAdminUser() {
  const { adminUserStore } = useStore();
  const { selectedAdminUser: adminUser, loadProfile, loadingInitial, clearSelectedAdminUser } = adminUserStore;
  const { id } = useParams();

  useEffect(() => {
      loadProfile();
      return () => clearSelectedAdminUser();
  }, [loadProfile, clearSelectedAdminUser]);

  if (loadingInitial || !adminUser) return (<LoadingComponent />)
  
  
  return (
    <>
      <ProfileDetails />
    </>
  )
})
