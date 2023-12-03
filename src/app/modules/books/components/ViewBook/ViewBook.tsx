import React, { useEffect } from 'react'
import BookDetails from './cards/BookDetails'
import BookProperties from '../Common/BookProperties'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Book } from '../../../../models/book';
import LoadingComponent from '../../../../layout/Common/LoadingComponent';



export default observer(function ViewBook() {
  const { bookStore } = useStore();
  const { selectedBook: book, loadBook, loadingInitial, clearSelectedBook } = bookStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadBook(id);
      return () => clearSelectedBook();
  }, [id, loadBook, clearSelectedBook]);

  if (loadingInitial || !book) return (<LoadingComponent />)
  
  
  return (
    <>
      <BookDetails  id={id} />
    </>
  )
})
