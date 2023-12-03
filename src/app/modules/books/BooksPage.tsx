import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddBook} from './components/AddBooks/AddBook'
import {BooksHeader} from './BooksHeader'
import EditBook from './components/EditBooks/EditBook'
import ViewBook from './components/ViewBook/ViewBook'
import ListBooks from './components/ListBooks/ListBooks';

const bookBreadCrumbs: Array<PageLink> = [
  {
    title: 'Books',
    path: '/books',
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

export default observer(function BooksPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <BooksHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={bookBreadCrumbs}>List Books</PageTitle>
              <ListBooks />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={bookBreadCrumbs}>Add Book</PageTitle>
              <AddBook />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={bookBreadCrumbs}>Edit Book</PageTitle>
              <EditBook />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={bookBreadCrumbs}>View Book</PageTitle>
              <ViewBook />
            </>
          }
        />
        <Route index element={<Navigate to='/books/list' />} />
      </Route>
      
    </Routes>
  )
})
