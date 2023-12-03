import React, { useEffect } from 'react'
import TagDetails from './cards/TagDetails'
import TagProperties from '../Common/TagProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'

export default observer(function EditTag() {
  const { tagStore } = useStore();
  const { selectedTag: tag, loadTag, loadingInitial, clearSelectedTag } = tagStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadTag(id);
      return () => clearSelectedTag();
  }, [id, loadTag, clearSelectedTag]);

  if (loadingInitial || !tag) return (<LoadingComponent />)
  
  
  return (
    <>
      <TagDetails id={id}/>
    </>
  )
})
