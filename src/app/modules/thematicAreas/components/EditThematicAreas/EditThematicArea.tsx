import React, { useEffect } from 'react'
import ThematicAreaDetails from './cards/ThematicAreaDetails'
import ThematicAreaProperties from '../Common/ThematicAreaProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'

export default observer(function EditThematicArea() {
  const { thematicAreaStore } = useStore();
  const { selectedThematicArea: thematicArea, loadThematicArea, loadingInitial, clearSelectedThematicArea } = thematicAreaStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadThematicArea(id);
      return () => clearSelectedThematicArea();
  }, [id, loadThematicArea, clearSelectedThematicArea]);

  if (loadingInitial || !thematicArea) return (<LoadingComponent />)
  
  
  return (
    <>
      <ThematicAreaDetails id={id}/>
    </>
  )
})
