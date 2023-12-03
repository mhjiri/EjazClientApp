import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddGenre} from './components/AddGenres/AddGenre'
import {GenresHeader} from './GenresHeader'
import EditGenre from './components/EditGenres/EditGenre'
import ViewGenre from './components/ViewGenre/ViewGenre'
import ListGenres from './components/ListGenres/ListGenres';

const genreBreadCrumbs: Array<PageLink> = [
  {
    title: 'Genres',
    path: '/genres',
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

export default observer(function GenresPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <GenresHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={genreBreadCrumbs}>List Genres</PageTitle>
              <ListGenres />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={genreBreadCrumbs}>Add Genre</PageTitle>
              <AddGenre />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={genreBreadCrumbs}>Edit Genre</PageTitle>
              <EditGenre />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={genreBreadCrumbs}>View Genre</PageTitle>
              <ViewGenre />
            </>
          }
        />
        <Route index element={<Navigate to='/genres/list' />} />
      </Route>
      
    </Routes>
  )
})

//export default GenrePage
