import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddGroup} from './components/AddGroups/AddGroup'
import {GroupsHeader} from './GroupsHeader'
import EditGroup from './components/EditGroups/EditGroup'
import ViewGroup from './components/ViewGroup/ViewGroup'
import ListGroups from './components/ListGroups/ListGroups';

const groupBreadCrumbs: Array<PageLink> = [
  {
    title: 'Groups',
    path: '/groups',
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

export default observer(function GroupPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <GroupsHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={groupBreadCrumbs}>List Groups</PageTitle>
              <ListGroups />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={groupBreadCrumbs}>Add Group</PageTitle>
              <AddGroup />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={groupBreadCrumbs}>Edit Group</PageTitle>
              <EditGroup />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={groupBreadCrumbs}>View Group</PageTitle>
              <ViewGroup />
            </>
          }
        />
        <Route index element={<Navigate to='/groups/list' />} />
      </Route>
      
    </Routes>
  )
})
