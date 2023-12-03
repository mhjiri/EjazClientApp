import React, { useEffect } from 'react'
import GenreDetails from './cards/GenreDetails'
import GenreProperties from '../Common/GenreProperties'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../../../../layout/Common/LoadingComponent'

export default observer(function EditGenre() {
  const { genreStore } = useStore();
  const { selectedGenre: genre, loadGenre, loadingInitial, clearSelectedGenre } = genreStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadGenre(id);
      return () => clearSelectedGenre();
  }, [id, loadGenre, clearSelectedGenre]);

  if (loadingInitial || !genre) return (<LoadingComponent />)
  
  
  return (
    <>
      <GenreDetails id={id}/>
    </>
  )
})
