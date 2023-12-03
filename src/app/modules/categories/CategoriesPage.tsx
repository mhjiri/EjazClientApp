import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddCategory} from './components/AddCategories/AddCategory'
import {CategoriesHeader} from './CategoriesHeader'
import EditCategory from './components/EditCategories/EditCategory'
import ViewCategory from './components/ViewCategory/ViewCategory'
import ListCategories from './components/ListCategories/ListCategories';

const categoryBreadCrumbs: Array<PageLink> = [
  {
    title: 'Categories',
    path: '/categories',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

export default observer(function CategoriesPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <CategoriesHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={categoryBreadCrumbs}>List Categories</PageTitle>
              <ListCategories />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={categoryBreadCrumbs}>Add Category</PageTitle>
              <AddCategory />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={categoryBreadCrumbs}>Edit Category</PageTitle>
              <EditCategory />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={categoryBreadCrumbs}>View Category</PageTitle>
              <ViewCategory />
            </>
          }
        />
        <Route index element={<Navigate to='/categories/list' />} />
      </Route>
      
    </Routes>
  )
})
