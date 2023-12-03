import React, { useEffect } from 'react'
import BannerDetails from './cards/BannerDetails'
import BannerProperties from '../Common/BannerProperties'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Banner } from '../../../../models/banner';
import LoadingComponent from '../../../../layout/Common/LoadingComponent';



export default observer(function ViewBanner() {
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
      <BannerDetails  id={id} />
    </>
  )
})
