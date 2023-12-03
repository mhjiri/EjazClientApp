import React, { useEffect } from 'react'
import PublisherDetails from './cards/PublisherDetails'
import PublisherProperties from '../Common/PublisherProperties'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Publisher } from '../../../../models/publisher';
import LoadingComponent from '../../../../layout/Common/LoadingComponent';



export default observer(function ViewPublisher() {
  const { publisherStore } = useStore();
  const { selectedPublisher: publisher, loadPublisher, loadingInitial, clearSelectedPublisher } = publisherStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadPublisher(id);
      return () => clearSelectedPublisher();
  }, [id, loadPublisher, clearSelectedPublisher]);

  if (loadingInitial || !publisher) return (<LoadingComponent />)
  
  
  return (
    <>
      <PublisherDetails  id={id} />
    </>
  )
})
