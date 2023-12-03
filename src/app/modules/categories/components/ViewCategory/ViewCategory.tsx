import React, { useEffect } from 'react'
import CategoryDetails from './cards/CategoryDetails'
import CategoryProperties from '../Common/CategoryProperties'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Category } from '../../../../models/category';
import LoadingComponent from '../../../../layout/Common/LoadingComponent';



export default observer(function ViewCategory() {
  const { categoryStore } = useStore();
  const { selectedCategory: category, loadCategory, loadingInitial, clearSelectedCategory } = categoryStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadCategory(id);
      return () => clearSelectedCategory();
  }, [id, loadCategory, clearSelectedCategory]);

  if (loadingInitial || !category) return (<LoadingComponent />)
  
  
  return (
    <>
      <CategoryDetails  id={id} />
    </>
  )
})
