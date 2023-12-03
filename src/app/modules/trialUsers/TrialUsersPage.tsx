import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
// import AddTrialUser from './components/AddTrialUsers/AddTrialUser'
import {TrialUsersHeader} from './TrialUsersHeader'
import EditTrialUser from './components/EditTrialUsers/EditTrialUser'
import ViewTrialUser from './components/ViewTrialUsers/ViewTrialUser'
import ListTrialUsers from './components/ListTrialUsers/ListTrialUsers';
import { AddTrialUser } from './components/AddTrialUsers/AddTrialUser';

const trialUserBreadCrumbs: Array<PageLink> = [
  {
    title: 'Trial Based Users',
    path: '/trialUsers',
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

export default observer(function TrialUserPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <TrialUsersHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={trialUserBreadCrumbs}>List Trial Users</PageTitle>
              <ListTrialUsers />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={trialUserBreadCrumbs}>Add Trial User</PageTitle>
              <AddTrialUser />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={trialUserBreadCrumbs}>Edit Trial User</PageTitle>
              <EditTrialUser />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={trialUserBreadCrumbs}>View Trial User</PageTitle>
              <ViewTrialUser />
            </>
          }
        />
        <Route index element={<Navigate to='/trialusers/list' />} />
      </Route>
      
    </Routes>
  )
})
