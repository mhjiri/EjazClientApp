import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { AdminUser } from '../../../../models/adminUser';
import LoadingComponent from '../../../../layout/Common/LoadingComponent';
import ProfileDetails from './cards/ProfileDetails';



export default observer(function ViewAdminUser() {
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
