import React, { useEffect } from 'react'
import BannerLocationDetails from './cards/BannerLocationDetails'
import BannerLocationProperties from '../Common/BannerLocationProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'

export default observer(function EditBannerLocation() {
  const { bannerLocationStore } = useStore();
  const { selectedBannerLocation: bannerLocation, loadBannerLocation, loadingInitial, clearSelectedBannerLocation } = bannerLocationStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadBannerLocation(id);
      return () => clearSelectedBannerLocation();
  }, [id, loadBannerLocation, clearSelectedBannerLocation]);

  if (loadingInitial || !bannerLocation) return (<LoadingComponent />)
  
  
  return (
    <>
      <BannerLocationDetails id={id}/>
    </>
  )
})
