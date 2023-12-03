import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
// import AddAdminUser from './components/AddAdminUsers/AddAdminUser'
import {AdminUsersHeader} from './AdminUsersHeader'
import EditAdminUser from './components/EditAdminUsers/EditAdminUser'
import ViewAdminUser from './components/ViewAdminUsers/ViewAdminUser'
import ListAdminUsers from './components/ListAdminUsers/ListAdminUsers';
import { AddAdminUser } from './components/AddAdminUsers/AddAdminUser';
import ViewProfile from './components/ViewProfile/ViewProfile';
import EditProfile from './components/EditProfile/EditProfile';

const adminUserBreadCrumbs: Array<PageLink> = [
  {
    title: 'Admin Users',
    path: '/adminUsers',
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

export default observer(function AdminUserPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <AdminUsersHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={adminUserBreadCrumbs}>List Admin Users</PageTitle>
              <ListAdminUsers />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={adminUserBreadCrumbs}>Add Admin User</PageTitle>
              <AddAdminUser />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={adminUserBreadCrumbs}>Edit Admin User</PageTitle>
              <EditAdminUser />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={adminUserBreadCrumbs}>View Admin User</PageTitle>
              <ViewAdminUser />
            </>
          }
        />
        <Route
          path='view'
          element={
            <>
              <PageTitle breadcrumbs={adminUserBreadCrumbs}>View Profile</PageTitle>
              <ViewProfile />
            </>
          }
        />
        <Route
          path='update'
          element={
            <>
              <PageTitle breadcrumbs={adminUserBreadCrumbs}>Update Profile</PageTitle>
              <EditProfile />
            </>
          }
        />
        <Route index element={<Navigate to='/adminUsers/list' />} />
      </Route>
      
    </Routes>
  )
})
