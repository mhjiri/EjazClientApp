import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddTag} from './components/AddTags/AddTag'
import {TagsHeader} from './TagsHeader'
import EditTag from './components/EditTags/EditTag'
import ViewTag from './components/ViewTag/ViewTag'
import ListTags from './components/ListTags/ListTags';

const tagBreadCrumbs: Array<PageLink> = [
  {
    title: 'Tags',
    path: '/tags',
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

export default observer(function TagsPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <TagsHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={tagBreadCrumbs}>List Tags</PageTitle>
              <ListTags />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={tagBreadCrumbs}>Add Tag</PageTitle>
              <AddTag />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={tagBreadCrumbs}>Edit Tag</PageTitle>
              <EditTag />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={tagBreadCrumbs}>View Tag</PageTitle>
              <ViewTag />
            </>
          }
        />
        <Route index element={<Navigate to='/tags/list' />} />
      </Route>
      
    </Routes>
  )
})

//export default TagPage
