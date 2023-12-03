import React, { useEffect } from 'react'
import BannerDetails from './cards/BannerDetails'
import BannerProperties from '../Common/BannerProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'

export default observer(function EditBanner() {
  const { bannerStore } = useStore();
  const { selectedBanner: banner, loadBanner, loadingInitial, clearSelectedBanner } = bannerStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadBanner(id);
      return () => clearSelectedBanner();
  }, [id, loadBanner, clearSelectedBanner]);

  if (loadingInitial || !banner) return (<LoadingComponent />)
  
  
  return (
    <>
      <BannerDetails id={id}/>
    </>
  )
})
