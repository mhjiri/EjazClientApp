import React, { useEffect } from 'react'
import BookCollectionDetails from './cards/BookCollectionDetails'
import BookCollectionProperties from '../Common/BookCollectionProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'

export default observer(function EditBookCollection() {
  const { bookCollectionStore } = useStore();
  const { selectedBookCollection: bookCollection, loadBookCollection, loadingInitial, clearSelectedBookCollection } = bookCollectionStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadBookCollection(id);
      return () => clearSelectedBookCollection();
  }, [id, loadBookCollection, clearSelectedBookCollection]);

  if (loadingInitial || !bookCollection) return (<LoadingComponent />)
  
  
  return (
    <>
      <BookCollectionDetails id={id}/>
    </>
  )
})
