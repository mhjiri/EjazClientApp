import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddBookCollection} from './components/AddBookCollections/AddBookCollection'
import {BookCollectionsHeader} from './BookCollectionsHeader'
import EditBookCollection from './components/EditBookCollections/EditBookCollection'
import ViewBookCollection from './components/ViewBookCollection/ViewBookCollection'
import ListBookCollections from './components/ListBookCollections/ListBookCollections';

const bookCollectionBreadCrumbs: Array<PageLink> = [
  {
    title: 'BookCollections',
    path: '/bookCollections',
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

export default observer(function BookCollectionPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <BookCollectionsHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={bookCollectionBreadCrumbs}>List BookCollections</PageTitle>
              <ListBookCollections />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={bookCollectionBreadCrumbs}>Add BookCollection</PageTitle>
              <AddBookCollection />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={bookCollectionBreadCrumbs}>Edit BookCollection</PageTitle>
              <EditBookCollection />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={bookCollectionBreadCrumbs}>View BookCollection</PageTitle>
              <ViewBookCollection />
            </>
          }
        />
        <Route index element={<Navigate to='/bookCollections/list' />} />
      </Route>
      
    </Routes>
  )
})
