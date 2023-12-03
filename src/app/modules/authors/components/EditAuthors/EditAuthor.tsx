import React, { useEffect } from 'react'
import AuthorDetails from './cards/AuthorDetails'
import AuthorProperties from '../Common/AuthorProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'

export default observer(function EditAuthor() {
  const { authorStore } = useStore();
  const { selectedAuthor: author, loadAuthor, loadingInitial, clearSelectedAuthor } = authorStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadAuthor(id);
      return () => clearSelectedAuthor();
  }, [id, loadAuthor, clearSelectedAuthor]);

  if (loadingInitial || !author) return (<LoadingComponent />)
  
  
  return (
    <>
      <AuthorDetails id={id}/>
    </>
  )
})
