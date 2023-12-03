import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddAuthor} from './components/AddAuthors/AddAuthor'
import {AuthorsHeader} from './AuthorsHeader'
import EditAuthor from './components/EditAuthors/EditAuthor'
import ViewAuthor from './components/ViewAuthor/ViewAuthor'
import ListAuthors from './components/ListAuthors/ListAuthors';

const authorBreadCrumbs: Array<PageLink> = [
  {
    title: 'Authors',
    path: '/authors',
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

export default observer(function AuthorPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <AuthorsHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={authorBreadCrumbs}>List Authors</PageTitle>
              <ListAuthors />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={authorBreadCrumbs}>Add Author</PageTitle>
              <AddAuthor />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={authorBreadCrumbs}>Edit Author</PageTitle>
              <EditAuthor />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={authorBreadCrumbs}>View Author</PageTitle>
              <ViewAuthor />
            </>
          }
        />
        <Route index element={<Navigate to='/authors/list' />} />
      </Route>
      
    </Routes>
  )
})
