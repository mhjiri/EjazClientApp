import React, { useEffect } from 'react'
import AdminUserDetails from './cards/AdminUserDetails'
import AdminUserProperties from '../Common/AdminUserProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'

export default observer(function EditAdminUser() {
  const { adminUserStore } = useStore();
  const { selectedAdminUser: adminUser, loadAdminUser, loadingInitial, clearSelectedAdminUser } = adminUserStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadAdminUser(id);
      return () => clearSelectedAdminUser();
  }, [id, loadAdminUser, clearSelectedAdminUser]);

  if (loadingInitial || !adminUser) return (<LoadingComponent />)
  
  
  return (
    <>
      <AdminUserDetails id={id}/>
    </>
  )
})
