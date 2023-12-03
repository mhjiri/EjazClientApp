import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddAvatar} from './components/AddAvatars/AddAvatar'
import {AvatarsHeader} from './AvatarsHeader'
import EditAvatar from './components/EditAvatars/EditAvatar'
import ViewAvatar from './components/ViewAvatar/ViewAvatar'
import ListAvatars from './components/ListAvatars/ListAvatars';

const avatarBreadCrumbs: Array<PageLink> = [
  {
    title: 'Avatars',
    path: '/avatars',
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

export default observer(function AvatarPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <AvatarsHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={avatarBreadCrumbs}>List Avatars</PageTitle>
              <ListAvatars />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={avatarBreadCrumbs}>Add Avatar</PageTitle>
              <AddAvatar />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={avatarBreadCrumbs}>Edit Avatar</PageTitle>
              <EditAvatar />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={avatarBreadCrumbs}>View Avatar</PageTitle>
              <ViewAvatar />
            </>
          }
        />
        <Route index element={<Navigate to='/avatars/list' />} />
      </Route>
      
    </Routes>
  )
})
