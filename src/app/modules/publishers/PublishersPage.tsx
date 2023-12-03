import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddPublisher} from './components/AddPublishers/AddPublisher'
import {PublishersHeader} from './PublishersHeader'
import EditPublisher from './components/EditPublishers/EditPublisher'
import ViewPublisher from './components/ViewPublisher/ViewPublisher'
import ListPublishers from './components/ListPublishers/ListPublishers';

const publisherBreadCrumbs: Array<PageLink> = [
  {
    title: 'Publishers',
    path: '/publishers',
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

export default observer(function PublisherPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <PublishersHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={publisherBreadCrumbs}>List Publishers</PageTitle>
              <ListPublishers />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={publisherBreadCrumbs}>Add Publisher</PageTitle>
              <AddPublisher />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={publisherBreadCrumbs}>Edit Publisher</PageTitle>
              <EditPublisher />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={publisherBreadCrumbs}>View Publisher</PageTitle>
              <ViewPublisher />
            </>
          }
        />
        <Route index element={<Navigate to='/publishers/list' />} />
      </Route>
      
    </Routes>
  )
})
